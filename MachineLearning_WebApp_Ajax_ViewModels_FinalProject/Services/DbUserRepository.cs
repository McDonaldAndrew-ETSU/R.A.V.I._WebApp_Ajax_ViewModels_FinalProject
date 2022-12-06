using MachineLearning_WebApp_Ajax_ViewModels_FinalProject.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MachineLearning_WebApp_Ajax_ViewModels_FinalProject.Services;

public class DbUserRepository : IUserRepository
{
    private readonly ApplicationDbContext _db;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public DbUserRepository(ApplicationDbContext db, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _db = db;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task<IQueryable<ApplicationUser>> ReadAllUsersAsync()
    {
        var users = _db.Users;
        // Read the roles for each user in the database
        foreach (var user in users)
        {
            user.Roles = await _userManager.GetRolesAsync(user);
        }
        return users;
    }

    public async Task<ApplicationUser?> ReadByUsernameAndGetRolesAsync(string username)
    {
        var user = await _db.Users.FirstOrDefaultAsync(u => u.UserName == username);
        if (user != null)
        {
            user.Roles = await _userManager.GetRolesAsync(user);
        }
        return user;
    }



    public async Task AssignUserToRoleAsync(string userName, string roleName)
    {
        var roleCheck = await _roleManager.RoleExistsAsync(roleName);
        if (!roleCheck)
        {
            await _roleManager.CreateAsync(new IdentityRole(roleName));
        }
        var user = await ReadByUsernameAndGetRolesAsync(userName);
        if (user != null)
        {
            if (!user.HasRole(roleName)) //Can also be done with the user manager: _userManager.IsInRole(user.Id, roleName)
            {
                await _userManager.AddToRoleAsync(user, roleName);
                await _db.SaveChangesAsync();
            }
        }
    }

    public async Task RemoveRoleFromUserAsync(string userName, string roleName)
    {
        var roleCheck = await _roleManager.RoleExistsAsync(roleName);
        if (!roleCheck)
        {
            await _roleManager.CreateAsync(new IdentityRole(roleName));
        }
        var user = await ReadByUsernameAndGetRolesAsync(userName);
        if (user != null)
        {
            if (user.HasRole(roleName)) //Can also be done with the user manager: _userManager.IsInRole(user.Id, roleName)
            {
                await _userManager.RemoveFromRoleAsync(user, roleName);
                await _db.SaveChangesAsync();
            }
        }
    }


}