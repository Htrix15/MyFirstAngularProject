using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestAngular.Models;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;

namespace TestAngular.Services
{
    public class DbInitializer
    {
        private readonly ResumeContext _resumeContext;
        private readonly ILogger<DbInitializer> _logger;
        private readonly UserAuthentication _authentication;
       public DbInitializer(ResumeContext resumeContext,
            ILogger<DbInitializer> logger,
            UserAuthentication authentication)
        {
            _resumeContext = resumeContext;
            _logger = logger;
            _authentication = authentication;
        }
        public bool CreateDb()
        {
            try
            {
                _resumeContext.Database.EnsureCreated();
                return InitializeAdmin();
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Create DB fail!");
                return false;
            }
        }
        private bool InitializeAdmin()
        {
            try
            {
                var builder = new ConfigurationBuilder().AddJsonFile("appsettings.json");
                IConfiguration AppConfiguration = builder.Build();
                IConfigurationSection adminOptions = AppConfiguration.GetSection("Admin");
                if (adminOptions!=null)
                {
                    string adminLogin = adminOptions.GetSection("login").Value;
                    string adminPassword = adminOptions.GetSection("password").Value;
                    if (adminLogin == null || adminPassword == null)
                    {
                        _logger.LogError("Fail initialize login or password subsection in appsettings.json");
                        return false;
                    }
                    if (_resumeContext.UsrAdmins.ToArray().Length==0)
                    {
                        var admin = new UsrAdmin() {Login = adminLogin, Password = _authentication.GetHashString(adminPassword) };
                        _resumeContext.Add(admin);
                        _resumeContext.SaveChanges();
                    }
                    return true;
                }
                else
                {
                    _logger.LogError("Fail initialize admin section in appsettings.json");
                    return false;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Fail initialize admin");
                return false;
            }
        }
    }
}
