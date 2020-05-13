using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using TestAngular.Models;

namespace TestAngular.Services
{
    public class FileOperations
    {
        private readonly string pathRoot;
        private readonly ILogger<FileOperations> _logger;
        public FileOperations(IWebHostEnvironment appEnvironment,
            ILogger<FileOperations> logger){
            pathRoot = appEnvironment.WebRootPath;
            _logger = logger;
        }

        public void DeleteOldFile<T>(string newPath, List<T> allEnity, int idEntity)
        {
            try{
                if(newPath!=null){
                    string pathOldImg = (allEnity.Where(data => (data as UsrData).GetKey() == idEntity).FirstOrDefault() as UsrData)?.GetPathToImg();
                    if(pathOldImg!=null && newPath != pathOldImg){
                        int t = allEnity.Where(data => (data as UsrData).GetPathToImg() == pathOldImg).Count();
                        if(allEnity.Where(data => (data as UsrData).GetPathToImg() == pathOldImg).Count() == 1)
                        {
                            FileInfo oldFile = new FileInfo(pathRoot + "/" +  pathOldImg);
                            if (oldFile.Exists){
                                oldFile.Delete();
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Fail delete file");
            }
        }
        public async Task<string> SaveFile(IFormFile file)
        {
            string pathForDB = null;
            if(file!=null){
                string realPathToSaveFile = pathRoot + "/img/" + file.FileName;
                using (var fileStream = new FileStream(realPathToSaveFile, FileMode.Create))
                {
                    try
                    {
                        await file.CopyToAsync(fileStream);
                        pathForDB = "img/" + file.FileName;
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "Fail save file");
                        pathForDB = "FAIL!";
                    }
                }
            }
            return pathForDB;
        }
    }
}