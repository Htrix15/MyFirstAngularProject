using TestAngular.Services;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace TestAngular
{
    public class CheckTokenMiddleware
    {
        private readonly RequestDelegate _next;
        public CheckTokenMiddleware(RequestDelegate next)
        {
            _next = next;
           
        }
        public async Task InvokeAsync(HttpContext context, UserAuthentication userAuthentication, ILogger<CheckTokenMiddleware> logger)
        {     
            try{
                string path = context.Request.Path.ToString();
                if(context.Request.Method!="GET"){
                    if(path.EndsWith("multipart")||
                    path.EndsWith("contact")||
                    path.EndsWith("about")||
                    path.EndsWith("educations")||
                    path.EndsWith("experiences")||
                    path.EndsWith("login")||
                    path.EndsWith("password")||
                    path.IndexOf("delete")>0||
                    path.IndexOf("mix")>0
                    )
                    {
                        string token =  context.Request.Headers["token"];
                        if(token!=""){
                            string errorAuth = await userAuthentication.CheckTokenAsync(token);
                            if(errorAuth==null){
                                await _next.Invoke(context);             
                                } 
                                else{
                                    context.Response.Headers.Add("tokenError", "yes");
                                    context.Response.Headers.Add("error", errorAuth);
                                    context.Response.StatusCode = 403;        
                                }
                        }
                        else {
                            context.Response.Headers.Add("tokenError", "yes");
                            context.Response.Headers.Add("error", "not token");
                            context.Response.StatusCode = 403;
                        }
                    }
                    else {
                        await _next.Invoke(context);
                    }
                }
                else {
                    await _next.Invoke(context);
                }
            }  
            catch(System.Exception ex)
            {
                logger.LogError(ex,"Fail check token or all errors");
                context.Response.Headers.Add("tokenError", "yes");
                context.Response.StatusCode = 403;
            }
        }
    }
}