using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestAngular.Models;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using MimeKit;

namespace TestAngular.Services
{
    public class EmailOperations
    {
        private readonly ILogger<EmailOperations> _logger;
        string smtpServer, login, password, emailFrom, senderName, emailSubject, emailTo; 
        int? port;
        bool? useSSL;

        public EmailOperations(ILogger<EmailOperations> logger)
        {
             _logger = logger;
        }

        private string EmailInitializing(){
            var builder = new ConfigurationBuilder().AddJsonFile("appsettings.json");
            IConfiguration appConfiguration = builder.Build();
            IConfigurationSection emailOptions = appConfiguration.GetSection("EmailOptions");
            if(emailOptions!=null){
                try{
                    smtpServer = emailOptions.GetSection("smtp-server").Value;
                    port = Convert.ToInt32(emailOptions.GetSection("port").Value);
                    useSSL =Convert.ToBoolean(emailOptions.GetSection("useSSL").Value);
                    login = emailOptions.GetSection("login").Value;
                    password = emailOptions.GetSection("password").Value;
                    emailFrom = emailOptions.GetSection("emailFrom").Value;
                    senderName = emailOptions.GetSection("senderName").Value;
                    emailSubject = emailOptions.GetSection("emailSubject").Value;
                    emailTo = emailOptions.GetSection("emailTo").Value;
                    if(smtpServer==null||port==null||useSSL==null||login==null
                    ||password==null||emailFrom==null||senderName==null||emailSubject==null||emailTo==null){
                        return "Fail initialize email subsection in appsettings.json";
                    }
                }
                catch(Exception ex){
                    _logger.LogError(ex, "Fail initialize email section in appsettings.json");
                    return "Fail initialize email section in appsettings.json";
                }
            }
            return null;
        }
        private async Task<string> EmailSendAsync(UsrEmail usrEmail)
        {
            try
            {
                MimeMessage message = new MimeMessage();
                message.From.Add(new MailboxAddress(senderName, emailFrom));
                message.To.Add(new MailboxAddress(emailTo));
                message.Subject = emailSubject; 
                message.Body = new BodyBuilder() { 
                    HtmlBody = $"<div><p>Новое сообщение от {usrEmail.Name}</p><p>{usrEmail.TextMessage}</p><p>адрес для ответа: {usrEmail.EMail}</p></div>" 
                    }.ToMessageBody(); 
                MailKit.Net.Smtp.SmtpClient client = new MailKit.Net.Smtp.SmtpClient();
                client.Connect(smtpServer, (int)port, (bool)useSSL); 
                client.Authenticate(login, password); 
                await client.SendAsync(message);
                client.Disconnect(true);
                return null;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Fail send email");
                return "Fail send email";
            }
        }
        public async Task<UsrDataShell> SendEmailAsync(UsrEmail usrEmail){
            UsrDataShell result = new UsrDataShell();
            string error = EmailInitializing();
            if(error!=null){
                result.Error=error;
                return result;
            }
            error = await EmailSendAsync(usrEmail);
             if(error!=null){
                result.Error=error;
            }
            return result;
        }
    }
}