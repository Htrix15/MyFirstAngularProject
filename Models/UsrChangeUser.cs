using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TestAngular.Models
{
    public class UsrChangeUser
    {
        public string oldValue { get; set; }
        public string newValue { get; set; }
        public string Validate()
        {
            List<ValidationResult> errors = new List<ValidationResult>();
            if(oldValue==null || newValue==null){
                errors.Add(new ValidationResult("Value isn't be empty! "));
            }
            if(oldValue?.Length<5 || newValue?.Length<5){
                errors.Add(new ValidationResult("Minimum length is 5 characters!"));
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