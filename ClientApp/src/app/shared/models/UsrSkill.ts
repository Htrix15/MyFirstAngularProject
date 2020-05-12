export class UsrSkill{
  constructor(
    public usrSkillId?: number,
    public skillImg?: string | ArrayBuffer,
    public skill?: string,
    public numberInTurn?: number,
    public file?: any
  ) {}
}
