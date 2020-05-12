using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TestAngular.Models
{
    public class UsrEmail
    {
        public string EMail { get; set; }
        public string Name { get; set; }
        public string TextMessage { get; set; }

        public string Validate()
        {
            List<ValidationResult> errors = new List<ValidationResult>();
            if(TextMessage==null){
                errors.Add(new ValidationResult("Value isn't be empty! "));
            }
            if(EMail==null || !(new EmailAddressAttribute().IsValid(EMail))){
                errors.Add(new ValidationResult("Incorrect email format!"));
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

