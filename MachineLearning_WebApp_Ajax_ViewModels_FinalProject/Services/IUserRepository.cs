using MachineLearning_WebApp_Ajax_ViewModels_FinalProject.Models.Entities;

namespace MachineLearning_WebApp_Ajax_ViewModels_FinalProject.Services;

public interface IUserRepository
{
    Task AssignUserToRoleAsync(string userName, string roleName);

    Task<IQueryable<ApplicationUser>> ReadAllUsersAsync();

    Task<ApplicationUser?> ReadByUsernameAndGetRolesAsync(string username);

    Task RemoveRoleFromUserAsync(string userName, string roleName);
}
