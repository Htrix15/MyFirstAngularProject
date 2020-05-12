namespace TestAngular.Models
{
    public abstract class UsrData
    {
        public virtual void SavePathToImg(string path){}
        public virtual string Validate(){return null;}
        public virtual int GetKey(){return 0;}
        public virtual int GetNumberInTurn(){return 0;}
        public virtual void SetNumberInTurn(int key){}
    }
}
