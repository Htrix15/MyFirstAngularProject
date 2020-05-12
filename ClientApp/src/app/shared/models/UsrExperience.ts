export class UsrExperience {
  constructor(
    public usrExperienceId?: number,
    public job?: string,
    public dateStart?: Date,
    public dateEnd?: Date,
    public website?: string,
    public duties?: string,
    public skills?: string,
    public position?: string,
    public gitHub?: string,
    public numberInTurn?: number
  ) { }
}
