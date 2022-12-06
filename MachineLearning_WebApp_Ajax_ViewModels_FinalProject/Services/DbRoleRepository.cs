using Microsoft.AspNetCore.Identity;

namespace MachineLearning_WebApp_Ajax_ViewModels_FinalProject.Services;

public class DbRoleRepository : IRoleRepository
{
    private readonly ApplicationDbContext _db;

    public DbRoleRepository(ApplicationDbContext db)
    {
        _db = db;
    }

    public IQueryable<IdentityRole> ReadAllRoles()
    {
        return _db.Roles;
    }
}
