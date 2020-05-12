using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Text;
using TestAngular.Models;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace TestAngular.Services
{
    public class UserAuthentication
    {
        private readonly DbOperations _dbOperations;
        private readonly ILogger<UserAuthentication> _logger;
        public UserAuthentication(DbOperations dbOperations, ILogger<UserAuthentication> logger)
        {
            _dbOperations = dbOperations;
            _logger = logger;
        }
        public string GetHashString(string password)
        {
            MD5 md5Hash = MD5.Create();
            byte[] salt = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(KeyDerivation.Pbkdf2(password, salt, KeyDerivationPrf.HMACSHA1, 1000, 256 / 8));
        }
        private double GetTokenLifetime()
        {
            double lifetime = 1;
            try {
                var builder = new ConfigurationBuilder().AddJsonFile("appsettings.json");
                IConfiguration AppConfiguration = builder.Build();
                IConfigurationSection tokenLifetimeOptions = AppConfiguration.GetSection("TokenLifetime");
                if (tokenLifetimeOptions!=null) {
                    string tokenLifetime = tokenLifetimeOptions.GetSection("hours").Value;
                    if(tokenLifetime != null){
                        lifetime = Convert.ToDouble(tokenLifetime);
                    }
                    else {
                       _logger.LogWarning("Fail initialize token lifetime subsection in appsettings.json. Set default value");
                    }
                }
                else {
                    _logger.LogWarning("Fail initialize token lifetime section in appsettings.json. Set default value");
                }
            }
            catch(Exception ex){
                _logger.LogWarning(ex, "Fail initialize token lifetime hours. Set default value");
            }      
            return lifetime;
        }
        private class Token{
            private Dictionary<string, string> header;
            private string headerBase64;
            private Dictionary<string, string> payload;
            private string payloadBase64;
            private string signature;
            public Token(string login, string tokenDateOfDeath, string preSalt)
            {
                header = new Dictionary<string, string>();
                payload = new Dictionary<string, string>();
                header.Add("alg", "Pbkdf2");
                payload.Add("userId", login);
                payload.Add("exp", tokenDateOfDeath);
                signature = CreateSignature(preSalt);
            }
            private string CreateSignature(string preSalt){
                MD5 md5Hash = MD5.Create();
                byte[] salt = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(preSalt));
                headerBase64 = Convert.ToBase64String(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(header, Formatting.Indented)));
                payloadBase64 = Convert.ToBase64String(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(payload, Formatting.Indented)));              
                return Convert.ToBase64String(KeyDerivation.Pbkdf2(headerBase64 + payloadBase64, salt, KeyDerivationPrf.HMACSHA1, 1000, 256 / 8));          
            }
            public string GetToken(){
                 return headerBase64 + "." + payloadBase64 + "." + signature;
            }
        }
        public async Task<UsrDataShell> AuthenticationAsync(UsrAdmin user)
        {
            UsrDataShell result = new UsrDataShell();
            var hashPassword = await _dbOperations.GetUserHashPasswordAsync(user.Login);
            if (hashPassword == null) {
                result.Error = "User not found";
                return result;
            }
            if (hashPassword == "FAIL!"){
                result.Error = "Fail get data of DB";
                return result;
            }
            if(GetHashString(user.Password) != hashPassword){
                result.Error = "Password incorrect";
                return result;
            }
            DateTime tokenDateOfDeath = DateTime.Now.AddHours(GetTokenLifetime());

            bool saveToken = await _dbOperations.SetTokenDateOfDeathAsync(user.Login, tokenDateOfDeath);
            if(!saveToken){
                result.Error = "Fail set data of DB";
                return result;
            }
            Token token = new Token(user.Login, tokenDateOfDeath.ToString(), user.Login + hashPassword);
            result.UsrData_ = new UsrAdmin(){TokenDateOfDeath = tokenDateOfDeath, Token = token.GetToken()};
            return result;
        }
        public async Task<string> ChangeLoginAsync(UsrChangeUser logins)
        {
            if(logins.newValue == null || logins.newValue.Length<=1){
                return "Incorrect new login";
            }
            return await _dbOperations.ChangeLoginAsync(logins);
        }
        public async Task<string> ChangePasswordAsync(UsrChangeUser passwords)
        {
            if(passwords.newValue == null || passwords.newValue.Length<=1){
                return "Incorrect new password";
            }
            passwords.oldValue = GetHashString(passwords.oldValue);
            passwords.newValue = GetHashString(passwords.newValue);
            return await _dbOperations.ChangePasswordAsync(passwords);
        }
        public async Task<string> CheckTokenAsync(string token){
            UsrAdmin user = await _dbOperations.GetAdminUserAsync();
            if(user.Login==null){
                return "Admin isn't be";
            }
            Token trueToken = new Token(user.Login, user.TokenDateOfDeath.ToString(), user.Login +user.Password);
            if(token != trueToken.GetToken()){
                return "Token invalid";
            }
            if(user.TokenDateOfDeath<DateTime.Now){
                return "Token is old";
            }
            return null;
        }
    }
}
