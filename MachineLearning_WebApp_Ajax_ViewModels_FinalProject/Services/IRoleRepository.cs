using Microsoft.AspNetCore.Identity;

namespace MachineLearning_WebApp_Ajax_ViewModels_FinalProject.Services;

public interface IRoleRepository
{
    IQueryable<IdentityRole> ReadAllRoles();
}
