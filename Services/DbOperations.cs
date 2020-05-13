using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestAngular.Models;

namespace TestAngular.Services
{
    public class DbOperations
    {
        private readonly ResumeContext _resumeContext;
        private readonly FileOperations _fileOperations;
        private readonly ILogger<DbOperations> _logger;

        public DbOperations(ResumeContext resumeContext,
        FileOperations fileOperations,
            ILogger<DbOperations> logger)
        {
            _resumeContext = resumeContext;
            _fileOperations = fileOperations;
            _logger = logger;
        }
        public async Task<UsrAdmin> GetAdminUserAsync()
        {
            UsrAdmin user = new UsrAdmin();
            try
            {
                user = await _resumeContext.UsrAdmins.FirstOrDefaultAsync();
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Fail get data of DB");
            }
            return user;
        }
        public async Task<string> GetUserHashPasswordAsync(string login)
        {
            try{
                string hashPassword = await _resumeContext.UsrAdmins.Where(users => users.Login == login).Select(users => users.Password).FirstOrDefaultAsync();
                return hashPassword;
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Fail get data of DB");
                return "FAIL!";
            } 
        }
        public async Task<string> ChangeLoginAsync(UsrChangeUser logins)
        {
            UsrAdmin user = new UsrAdmin();
            try
            {
                user = await _resumeContext.UsrAdmins.Where(users => users.Login == logins.oldValue).FirstOrDefaultAsync();
                if(user==null){
                    return "Incorrect login";
                }
                user.Login = logins.newValue;
                if(await _resumeContext.SaveChangesAsync()==1){
                    return null;
                }
                else{
                    return "Fails save DB";
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Fail get or set data of DB"); 
                return "Fail get or set data of DB";
            } 
        }
        public async Task<string> ChangePasswordAsync(UsrChangeUser passwords)
        {
            UsrAdmin user = new UsrAdmin();
            try
            {
                user = await _resumeContext.UsrAdmins.Where(users => users.Password == passwords.oldValue).FirstOrDefaultAsync();
                if(user==null){
                    return "Incorrect password";
                }
                user.Password = passwords.newValue;
                user.TokenDateOfDeath = DateTime.Now;
                if(await _resumeContext.SaveChangesAsync()==1){
                    return null;
                }
                else{
                    return "Fails save DB";
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Fail get or set data of DB"); 
                return "Fail get or set data of DB";
            } 
        }
        public async Task<bool> SetTokenDateOfDeathAsync(string login, DateTime tokenDateOfDeath)
        {
            try{
                var user = await _resumeContext.UsrAdmins.Where(users => users.Login == login).FirstOrDefaultAsync();
                user.TokenDateOfDeath = tokenDateOfDeath;
                int updated = await _resumeContext.SaveChangesAsync();
                if(updated>0){
                    return true;
                }
                return false;
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Fail set data of DB");
                return false;
            } 
        }
        public async Task<UsrDataShell> GetAsync(string queryParams)
        {
            UsrDataShell result = new UsrDataShell();
            if (queryParams.StartsWith("?_get="))
            {
                try
                {
                    switch (queryParams.Replace("?_get=", ""))
                    {
                        case ("main"): { result.UsrDatas = await _resumeContext.UsrMains.ToListAsync(); break; }
                        case ("contact"): { result.UsrDatas = await _resumeContext.UsrContacts.ToListAsync(); break; }
                        case ("about"): { result.UsrDatas = await _resumeContext.UsrAbouts.ToListAsync(); break; }
                        case ("educations"): { result.UsrDatas = await _resumeContext.UsrEducations.OrderBy(data=>data.NumberInTurn).ToListAsync(); break; }
                        case ("experiences"): { result.UsrDatas = await _resumeContext.UsrExperiences.OrderBy(data=>data.NumberInTurn).ToListAsync(); break; }
                        case ("skills"): { result.UsrDatas = await _resumeContext.UsrSkills.OrderBy(data=>data.NumberInTurn).ToListAsync(); break; }
                        default: { result.Error = "Not found entity! Check get query param"; break; }
                    }
                }
                catch(Exception ex)
                {
                    _logger.LogError(ex, "Fail get data of DB");
                    result.Error = "Fail get data of DB";

                }
            }
            else
            {
                result.Error = "Wrong get query params";
            }
            return result;
        }
        public async Task<UsrDataShell> DelAsync(string queryParams, int id){ 
            UsrDataShell result = new UsrDataShell();  
            if (queryParams.StartsWith("?_del="))
            {
                try
                {
                    switch (queryParams.Replace("?_del=", ""))
                    {
                        case ("educations"): {; 
                            result = await DataChangeAsync<UsrEducation>(await _resumeContext.UsrEducations.Where(educations => educations.UsrEducationId == id).FirstOrDefaultAsync(), EntityState.Deleted);
                            break; }
                        case ("experiences"): { 
                            result = await DataChangeAsync<UsrExperience>(await _resumeContext.UsrExperiences.Where(experiences => experiences.UsrExperienceId == id).FirstOrDefaultAsync(), EntityState.Deleted); 
                            break; }
                        case ("skills"): { 
                            _fileOperations.DeleteOldFile<UsrSkill>(
                                            "X", 
                                            await SelectNoTrackingListAsync<UsrSkill>(),
                                            id);   
                            result =  await DataChangeAsync<UsrSkill>(await _resumeContext.UsrSkills.Where(skills => skills.UsrSkillId == id).FirstOrDefaultAsync(), EntityState.Deleted); 
                            break; }
                        default: { 
                            result.Error = "Not found entity! Check del query param"; break; }
                    }
                }
                catch(Exception ex)
                {
                    _logger.LogError(ex, "Fail get data of DB");
                    result.Error = "Fail get data of DB";
                }
            }
            else
            {
                result.Error = "Wrong del query params";
            }
            return result;
        }
        public async Task<List<TEntity>> SelectNoTrackingListAsync<TEntity>() where TEntity: class{
            return  await _resumeContext.Set<TEntity>().AsNoTracking().ToListAsync();
        }

        private async Task<List<TEntity>> SelectListAsync<TEntity>() where TEntity: class{
            return await _resumeContext.Set<TEntity>().ToListAsync();
        }

        public async Task<string> MixDataAsync<TEntity>(List<TEntity> usrNewOrder) where TEntity: class
        {
            try{
                var usrOldOrder = await SelectListAsync<TEntity>();

                if(usrNewOrder.Count!= usrOldOrder.Count){ return "No sinhron data";}

                usrNewOrder = usrNewOrder.OrderBy(data => (data as UsrData).GetKey()).ToList<TEntity>();
                for(int i=0; i<usrNewOrder.Count; i++ ){
                    (usrOldOrder[i] as UsrData).SetNumberInTurn((usrNewOrder[i] as UsrData).GetNumberInTurn()); 
                }
                if(await _resumeContext.SaveChangesAsync()>0){
                    return null;
                }
                return "Data isn't mixing";
            }
            catch(Exception ex){
                _logger.LogError(ex, "Fail set data of DB");
                return "Fail set data of DB";
            }
        }
        public async Task<UsrDataShell> DataChangeAsync<TEntity>(TEntity usrData, EntityState entityState = EntityState.Modified) where TEntity: class
        {
            UsrDataShell result = new UsrDataShell();
            try{
                _resumeContext.Entry<TEntity>(usrData).State = entityState;
                int updated = await _resumeContext.SaveChangesAsync();
                if(updated==1){
                    return result;
                }
                else{
                    result.Error = $"Fail {entityState.ToString()} data"; 
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Fail set data of DB");
                result.Error = "Fail set data of DB";
            } 
             return result;
        }
    }
}
