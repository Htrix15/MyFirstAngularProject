using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace TestAngular.Models
{
    public class UsrDataShell
    {
        public IEnumerable<UsrData> UsrDatas { get; set; }
        public UsrData UsrData_ { get; set; }
        public string Error { get; set; }
        public IFormFile File {get; set; }
        public string EntityType {get;set;}
    }
}
