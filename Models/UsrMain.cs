using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TestAngular.Models
{
    public class UsrMain : UsrData
    {
        public int? UsrMainId { get; set; }
        public string Photo { get; set; }
        public string WelcomeText { get; set; }
        public override string GetPathToImg(){return Photo;}
        public override void SavePathToImg(string path){
            if(path!=null){
                Photo = path;
            }
        }
        public override string Validate()
        {
            List<ValidationResult> errors = new List<ValidationResult>();
            if(Photo==null || WelcomeText==null){
                 errors.Add(new ValidationResult("Photo and welcome text should be indicated"));
            }
            if(errors.Count==0){
                return null;
            }
            string errorsMessage="";
            foreach(var error in errors){
                errorsMessage+=error.ErrorMessage;
            }    
            return errorsMessage;  
        }
    }
}
