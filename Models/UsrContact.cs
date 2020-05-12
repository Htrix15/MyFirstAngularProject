using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TestAngular.Models
{
    public class UsrContact : UsrData
    {
        public int? UsrContactId { get; set; }
        public string Phone { get; set; }
        public string EMail { get; set; }
        public string DescAdditionalContact { get; set; }
        public string AdditionalContact { get; set; }
        public string SrcYMap { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }

        public override string Validate()
        {
            List<ValidationResult> errors = new List<ValidationResult>();
            if((DescAdditionalContact==null && AdditionalContact!=null) || (DescAdditionalContact!=null && AdditionalContact==null)){
                errors.Add(new ValidationResult("If additional contact is indicated, desc additional contact should be indicated! "));
            }
            if(Phone==null){
                errors.Add(new ValidationResult("Phone number should be indicated! "));
            }
            if(Surname==null){
                errors.Add(new ValidationResult("Surname number should be indicated! "));
            }
            if(Name==null){
                errors.Add(new ValidationResult("Name number should be indicated! "));
            }
            if(SrcYMap?.Length>0 && !(SrcYMap.StartsWith("https://api-maps.yandex.ru/services/constructor/"))){
                errors.Add(new ValidationResult("Incorrect href yandex map. Check out in to constructor!"));
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
