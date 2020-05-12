using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestAngular.Models
{
    public class UsrAdmin: UsrData
    {
        public int? Id {get;set;}
        public string Login { get; set; }
        public string Password { get; set; }
        public DateTime TokenDateOfDeath { get; set; }
        [NotMapped]
        public string Token { get; set; }
       
    }
}
