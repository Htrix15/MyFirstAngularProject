using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

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