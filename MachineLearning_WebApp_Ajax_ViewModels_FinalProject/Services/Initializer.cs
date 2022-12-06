using MachineLearning_WebApp_Ajax_ViewModels_FinalProject.Models.Entities;
using Microsoft.AspNetCore.Identity;

namespace MachineLearning_WebApp_Ajax_ViewModels_FinalProject.Services;

public class Initializer
{
    private readonly ApplicationDbContext _db;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public Initializer(ApplicationDbContext db, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _db = db;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task SeedUsersAsync()
    {
        _db.Database.EnsureCreated();

        if (!_db.Roles.Any(r => r.Name == "Administrator"))
        {
            await _roleManager.CreateAsync(new IdentityRole { Name = "Administrator" });
        }

        if (!_db.Roles.Any(r => r.Name == "User"))
        {
            await _roleManager.CreateAsync(new IdentityRole { Name = "User" });
        }

        if (!_db.Users.Any(u => u.UserName == "admin@test.com"))
        {
            var user = new ApplicationUser
            {
                Name = "Andrew",
                Email = "admin@test.com",
                UserName = "admin@test.com",
            };
            await _userManager.CreateAsync(user, "Pass1!");
            await _userManager.AddToRoleAsync(user, "Administrator");
        }
    }
}
