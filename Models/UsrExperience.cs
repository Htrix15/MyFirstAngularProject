using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TestAngular.Models
{
    public class UsrExperience : UsrData
    {
        public int? UsrExperienceId { get; set; }
        public string Job { get; set; }
        public DateTime? DateStart { get; set; }
        public DateTime? DateEnd { get; set; }
        public string Website { get; set; }
        public string Duties { get; set; }
        public string Skills { get; set; }
        public string Position { get; set; }
        public string GitHub { get; set; }
        public int? NumberInTurn { get; set; }

        public override int GetKey(){return (int) UsrExperienceId;}
        public override int GetNumberInTurn(){return (int)NumberInTurn;}
        public override void SetNumberInTurn(int newNumberInTurn) {
             NumberInTurn = newNumberInTurn; }

        public override string Validate()
        {
            List<ValidationResult> errors = new List<ValidationResult>();
            if(Job==null){
                errors.Add(new ValidationResult("Job should be indicated "));
            }
            if(DateStart==null){
                errors.Add(new ValidationResult("Date start working should be indicated "));
            }
            if(Duties==null){
                errors.Add(new ValidationResult("Duties should be indicated"));
            }
            if(Skills==null){
                errors.Add(new ValidationResult("Skills should be indicated"));
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
