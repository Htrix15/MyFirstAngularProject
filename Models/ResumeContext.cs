using Microsoft.EntityFrameworkCore;

namespace TestAngular.Models
{
    public class ResumeContext : DbContext
    {
        public DbSet<UsrAdmin> UsrAdmins { get; set; }
        public DbSet<UsrMain> UsrMains { get; set; }
        public DbSet<UsrAbout> UsrAbouts { get; set; }
        public DbSet<UsrContact> UsrContacts { get; set; }
        public DbSet<UsrEducation> UsrEducations { get; set; }
        public DbSet<UsrExperience> UsrExperiences { get; set; }
        public DbSet<UsrSkill> UsrSkills { get; set; }
        public ResumeContext(DbContextOptions<ResumeContext> options): base(options) {}
    }
}
