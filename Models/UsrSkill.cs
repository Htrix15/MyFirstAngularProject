using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TestAngular.Models
{
    public class UsrSkill: UsrData
    {
        public int? UsrSkillId { get; set; }
        public string SkillImg { get; set; }
        public string Skill { get; set; }
        public int? NumberInTurn { get; set; }

        public override string GetPathToImg(){return SkillImg;}
        public override int GetKey(){return (int) UsrSkillId;}
        public override int GetNumberInTurn(){return (int)NumberInTurn;}
        public override void SetNumberInTurn(int newNumberInTurn) {
             NumberInTurn = newNumberInTurn; }

        public override void SavePathToImg(string path){
           if(path!=null){
               SkillImg = path;
           }
        }
        public override string Validate()
        {
            List<ValidationResult> errors = new List<ValidationResult>();
            if(SkillImg==null && Skill==null){
                errors.Add(new ValidationResult("Image or text should be indicated"));
            }
            if(Skill!=null && Skill.Length>20){
                 errors.Add(new ValidationResult("Max length is 20 char"));
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
