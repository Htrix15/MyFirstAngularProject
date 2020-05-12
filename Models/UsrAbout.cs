using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TestAngular.Models
{
    public class UsrAbout : UsrData
    {
        public int? UsrAboutId { get; set; }
        public string Language { get; set; }
        public string City { get; set; }
        public string Hobby { get; set; }
        public override string Validate()
        {
            List<ValidationResult> errors = new List<ValidationResult>();
            if(Language==null){
                errors.Add(new ValidationResult("Language should be indicated "));
            }
            if(City==null){
                errors.Add(new ValidationResult("City should be indicated "));
            }
            if(Hobby==null){
                errors.Add(new ValidationResult("Hobby should be indicated"));
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
