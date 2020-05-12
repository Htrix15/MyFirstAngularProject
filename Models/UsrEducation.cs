using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TestAngular.Models
{
    public class UsrEducation : UsrData
    {
        public int? UsrEducationId { get; set; }
        public string Institution { get; set; }
        public int? DateCompletion { get; set; }
        public string Specialty { get; set; }
        public string GradePoint { get; set; }
        public int? NumberInTurn { get; set; }
        public override string Validate()
        {
            List<ValidationResult> errors = new List<ValidationResult>();
            if(Institution==null){
                errors.Add(new ValidationResult("Institution should be indicated "));
            }
            if(DateCompletion==null){
                errors.Add(new ValidationResult("DateCompletion should be indicated "));
            }
            if(Specialty==null){
                errors.Add(new ValidationResult("Specialty should be indicated"));
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
        public override int GetKey(){return (int) UsrEducationId;}
        public override int GetNumberInTurn(){return (int)NumberInTurn;}
        public override void SetNumberInTurn(int newNumberInTurn) {
             NumberInTurn = newNumberInTurn; }
    }
}
