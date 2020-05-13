using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using TestAngular.Models;
using TestAngular.Services;
using Microsoft.Extensions.Logging;

namespace TestAngular.Controllers
{
    [Route("api")]
    [ApiController]
    public class ResumeController : ControllerBase
    {
        private readonly ResumeContext _resumeContext;
        private readonly UserAuthentication _userAuthentication;
        private readonly DbOperations _dbOperations;
        private readonly FileOperations _fileOperations;
        private readonly ILogger<ResumeController> _logger;
        private readonly string pathRoot;
        private readonly EmailOperations _emailOperations;
        public ResumeController(ResumeContext resumeContext,
            DbOperations dbOperations,
            FileOperations fileOperations,
            UserAuthentication userAuthentication,
            IWebHostEnvironment appEnvironment,
            ILogger<ResumeController> logger,
            EmailOperations emailOperations
             )
        {
            _resumeContext = resumeContext;
            _dbOperations = dbOperations;
            _userAuthentication = userAuthentication;
            _logger = logger;
            _fileOperations = fileOperations;
            _emailOperations = emailOperations;
            pathRoot = appEnvironment.WebRootPath;
        }
        private void SetErrorHeaders(UsrDataShell usrDatas)
        {
            if (usrDatas.Error != null)
            {
                Response.Headers.Add("error", usrDatas.Error);
            }
        }
        private UsrDataShell PrepareMultipartRequest()
        {
            UsrDataShell result = new UsrDataShell();
            string queryType = Request.QueryString.Value;
            if (queryType.StartsWith("?_put=")|| queryType.StartsWith("?_post="))
            {
                string data = Request.Form.Where(x => x.Key == "JSON").Select(x => x.Value.ToString()).FirstOrDefault();
                if(data != null){
                    switch(queryType.Replace("?_put=", "").Replace("?_post=",""))
                    {
                        case("skill"):{ 
                            try {
                                result.UsrData_ = JsonConvert.DeserializeObject<UsrSkill>(data);
                                result.EntityType="skill";
                            }
                            catch(Exception ex)
                            {
                                _logger.LogError(ex, "Fail deserialize Skill");
                                result.Error = "Fail deserialize Skill";
                            }
                            break;}
                        case("main"):{ 
                            try {
                                result.UsrData_ = JsonConvert.DeserializeObject<UsrMain>(data);
                                result.EntityType="main";
                            }
                            catch(Exception ex)
                            {
                                _logger.LogError(ex, "Fail deserialize Main info");
                                result.Error = "Fail deserialize Main info";
                            }
                            break;}
                        default: { 
                            result.Error="Not found entity! Check query param";
                            break; }
                    }
                }
                if (Request.Form.Files.Count>0){
                    result.File = Request.Form.Files[0];}
            }
            else
            {
                result.Error="Wrong put/post query params";
            }
            return result;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            UsrDataShell result = await _dbOperations.GetAsync(Request.QueryString.Value);
            if(result.Error==null){
                return Ok(result.UsrDatas);
            }
            SetErrorHeaders(result);
            return BadRequest(result);
        }
        //===================================
        [HttpPut("login")]
        public async Task<IActionResult> PutLogin(UsrChangeUser changeLogin)
        {
            var validateErrors = changeLogin.Validate();
            if(validateErrors == null){
                var result = await _userAuthentication.ChangeLoginAsync(changeLogin);
                if(result==null)
                {
                    Response.Headers.Add("auth", "logoff");
                    return Ok();
                }
                Response.Headers.Add("error", result);
            }
            else {
                Response.Headers.Add("error", validateErrors);
            }
            return BadRequest();
        }
        [HttpPut("password")]
        public async Task<IActionResult> PutPassword(UsrChangeUser changePassword)
        {
            var validateErrors = changePassword.Validate();
            if(validateErrors == null){
                var result = await _userAuthentication.ChangePasswordAsync(changePassword);
                if(result==null)
                {
                    Response.Headers.Add("auth", "logoff");
                    return Ok();
                }
                Response.Headers.Add("error", result);
            }
            else {
                Response.Headers.Add("error", validateErrors);
            }
            return BadRequest();
        }
        //===================================
        [HttpPost("logon")]
        public async Task<IActionResult> Auth(UsrAdmin user){
            UsrDataShell result = await _userAuthentication.AuthenticationAsync(user);
            if(result.Error==null){
                return Ok(result.UsrData_);
            }
            SetErrorHeaders(result);
            return BadRequest();
        }
        //===================================
        [HttpPost("emailMessage")]
         public async Task<IActionResult> EmailMessage(UsrEmail usrEmail){
            var validateErrors = usrEmail.Validate();
            if(validateErrors == null){
                UsrDataShell result = await _emailOperations.SendEmailAsync(usrEmail);
                if(result.Error==null){
                    return Ok();
                }
                SetErrorHeaders(result);
            }
            else
            {
                Response.Headers.Add("error", validateErrors);
            }
            return BadRequest();
         }
        //===================================
        [HttpPut("multipart")]
        public async Task<IActionResult> PutMultipart(){
            UsrDataShell preResult = PrepareMultipartRequest();
            UsrDataShell result = new UsrDataShell();
            if(preResult.Error==null){
                string pathForDB = await _fileOperations.SaveFile(preResult.File);
                if(pathForDB!="FAIL!"){
                    string validateErrors="";
                    preResult.UsrData_.SavePathToImg(pathForDB);
                    switch(preResult.EntityType){
                        case("skill"): {
                            UsrSkill updateUsrSkill = (preResult.UsrData_ as UsrSkill);
                            validateErrors = updateUsrSkill?.Validate();
                            if(validateErrors==null){
                                _fileOperations.DeleteOldFile<UsrSkill>(
                                            pathForDB, 
                                            await _dbOperations.SelectNoTrackingListAsync<UsrSkill>(),
                                            updateUsrSkill.GetKey());                                
                                result = await _dbOperations.DataChangeAsync<UsrSkill>(updateUsrSkill);
                            }
                            else{
                                result.Error = validateErrors;
                            }
                            break;
                        }
                        case("main"):{
                            UsrMain updateUsrMain = (preResult.UsrData_ as UsrMain);
                            validateErrors = updateUsrMain?.Validate();
                            if(validateErrors==null){
                                _fileOperations.DeleteOldFile<UsrMain>(
                                            pathForDB, 
                                            await _dbOperations.SelectNoTrackingListAsync<UsrMain>(),
                                            updateUsrMain.GetKey());   
                                result = await _dbOperations.DataChangeAsync<UsrMain>(updateUsrMain);
                            } 
                            else{
                                result.Error = validateErrors;
                            }
                            break;
                        }
                        default:{
                            result.Error = "Not found entity! Check query param";
                            break;
                        }
                    }
                    if(result.Error==null){
                        return Ok(preResult.UsrData_);
                    }
                    else
                    {
                        SetErrorHeaders(result);
                    }
                }
                else
                {
                    preResult.Error = pathForDB;
                }
            }
            SetErrorHeaders(preResult);
            return BadRequest();
        }
        [HttpPost("multipart")]
        public async Task<IActionResult> PostMultipart() 
        {
            UsrDataShell preResult = PrepareMultipartRequest();
            UsrDataShell result = new UsrDataShell();
            if(preResult.Error==null){
                string pathForDB = await _fileOperations.SaveFile(preResult.File);
                if(pathForDB!="FAIL!"){
                    string validateErrors="";
                    preResult.UsrData_.SavePathToImg(pathForDB);
                    switch(preResult.EntityType){
                        case("skill"): {
                            validateErrors = (preResult.UsrData_ as UsrSkill).Validate();
                            if(validateErrors==null){
                                result = await _dbOperations.DataChangeAsync<UsrSkill>(preResult.UsrData_ as UsrSkill, EntityState.Added);
                            }
                            else{
                                result.Error = validateErrors;
                            }
                            break;
                        }
                        case("main"):{
                            validateErrors = (preResult.UsrData_ as UsrMain).Validate();
                            if(validateErrors==null){
                                result = await _dbOperations.DataChangeAsync<UsrMain>(preResult.UsrData_ as UsrMain, EntityState.Added);
                            } 
                            else{
                                result.Error = validateErrors;
                            }
                            break;
                        }
                        default:{
                            result.Error = "Not found entity! Check query param";
                            break;
                        }
                    }
                    if(result.Error==null){
                        return Ok(preResult.UsrData_);
                    }
                    else
                    {
                        SetErrorHeaders(result);
                    }
                }
                else
                {
                    preResult.Error = pathForDB;
                }
            }
            SetErrorHeaders(preResult);
            return BadRequest();
        }
        //=========
        [HttpPut("mixSkill")]
        public async Task<IActionResult> PutMixSkill(List<UsrSkill> usrSkills)
        {
            var result = await _dbOperations.MixDataAsync<UsrSkill>(usrSkills);
            if(result==null){
                return Ok();
            }
            Response.Headers.Add("error", result);
            return BadRequest();
        }
        //===================================
        [HttpPut("contact")]
        public async Task<IActionResult> PutContact(UsrContact usrContact)
        {
            var validateErrors = usrContact.Validate();
            if(validateErrors == null){
                var result = await _dbOperations.DataChangeAsync<UsrContact>(usrContact);
                if(result.Error==null){
                    return Ok(usrContact);
                }
                SetErrorHeaders(result);
            } else {
                Response.Headers.Add("error", validateErrors);
            }
            return BadRequest();
        }
        [HttpPost("contact")]
        public async Task<IActionResult> PostContact(UsrContact usrContact)
        {
            var validateErrors = usrContact.Validate();
            if(validateErrors == null){
                var result = await _dbOperations.DataChangeAsync<UsrContact>(usrContact, EntityState.Added);
                if(result.Error==null){
                    return Ok(usrContact);
                }
                SetErrorHeaders(result);
            } else {
                Response.Headers.Add("error", validateErrors);
            }
            return BadRequest();
        }
        //===================================        
        [HttpPut("about")]
        public async Task<IActionResult> PutAbout(UsrAbout usrAbout)
        {
            var validateErrors = usrAbout.Validate();
            if(validateErrors == null){
                var result = await _dbOperations.DataChangeAsync<UsrAbout>(usrAbout);
                if(result.Error==null){
                    return Ok(usrAbout);
                }
                SetErrorHeaders(result);
            } else {
                Response.Headers.Add("error", validateErrors);
            }
            return BadRequest();
        }
        [HttpPost("about")]
        public async Task<IActionResult> PostAbout(UsrAbout usrAbout)
        {    
            var validateErrors = usrAbout.Validate();
            if(validateErrors == null){
                var result = await _dbOperations.DataChangeAsync<UsrAbout>(usrAbout, EntityState.Added);
                if(result.Error==null){
                    return Ok(usrAbout);
                }
                SetErrorHeaders(result);
            } else {
                Response.Headers.Add("error", validateErrors);
            }
            return BadRequest();
        }
        //===================================
        [HttpPut("mixEducations")]
        public async Task<IActionResult> PutMixEducations(List<UsrEducation> usrEducation)
        {
            var result = await _dbOperations.MixDataAsync<UsrEducation>(usrEducation);
            if(result==null){
                return Ok();
            }
            Response.Headers.Add("error", result);
            return BadRequest();
        }
        [HttpPut("educations")]
        public async Task<IActionResult> PutEducations(UsrEducation usrEducation)
        {
            var validateErrors = usrEducation.Validate();
            if(validateErrors == null){
                var result = await _dbOperations.DataChangeAsync<UsrEducation>(usrEducation);
                if(result.Error==null){
                    return Ok(usrEducation);
                }
                SetErrorHeaders(result);
            } else {
                Response.Headers.Add("error", validateErrors);
            }
            return BadRequest();
        }
        [HttpPost("educations")]
        public async Task<IActionResult> PostEducations(UsrEducation usrEducation)
        {
            var validateErrors = usrEducation.Validate();
            if(validateErrors == null){
                var result = await _dbOperations.DataChangeAsync<UsrEducation>(usrEducation, EntityState.Added);
                if(result.Error==null){
                    return Ok(usrEducation);
                }
                SetErrorHeaders(result);
            } else {
                Response.Headers.Add("error", validateErrors);
            }
            return BadRequest();
        }
        //=====================================================
        [HttpPut("mixExperiences")]
        public async Task<IActionResult> PutMixExperiences(List<UsrExperience> usrExperiences)
        {
            var result = await _dbOperations.MixDataAsync<UsrExperience>(usrExperiences);
            if(result==null){
                return Ok();
            }
            Response.Headers.Add("error", result);
            return BadRequest();
        }
        [HttpPut("experiences")]
        public async Task<IActionResult> PutExperiences(UsrExperience usrExperience)
        {
            var validateErrors = usrExperience.Validate();
            if(validateErrors == null){
                var result = await _dbOperations.DataChangeAsync<UsrExperience>(usrExperience);
                if(result.Error==null){
                    return Ok(usrExperience);
                }
                SetErrorHeaders(result);
            } else {
                Response.Headers.Add("error", validateErrors);
            }
            return BadRequest();
        }
        [HttpPost("experiences")]
        public async Task<IActionResult> PostExperiences(UsrExperience usrExperience)
        {
            var validateErrors = usrExperience.Validate();
            if(validateErrors == null){
                var result = await _dbOperations.DataChangeAsync<UsrExperience>(usrExperience, EntityState.Added);
                if(result.Error==null){
                    return Ok(usrExperience);
                }
                SetErrorHeaders(result);
            } else {
                Response.Headers.Add("error", validateErrors);
            }
            return BadRequest();
        }
        //===================================
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteData(int id)
        {
            var result = await _dbOperations.DelAsync(Request.QueryString.Value, id);
            if(result.Error==null){
                return Ok();
            }
            SetErrorHeaders(result);
            return BadRequest();
        }
    }
}