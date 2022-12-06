using MachineLearning_WebApp_Ajax_ViewModels_FinalProject.Models.ViewModels;
using MachineLearning_WebApp_Ajax_ViewModels_FinalProject.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace MachineLearning_WebApp_Ajax_ViewModels_FinalProject.Controllers;

[Authorize(Roles = "Administrator")]
public class UserController : Controller
{
    private readonly IUserRepository _userRepo;
    private readonly IRoleRepository _roleRepo;

    public UserController(IUserRepository userRepo, IRoleRepository roleRepo)
    {
        _userRepo = userRepo;
        _roleRepo = roleRepo;
    }


    public async Task<IActionResult> Index()
    {
        var users = await _userRepo.ReadAllUsersAsync();

        var userList = users.Select(u => new UserListVM
        {
            Name = u.Name,
            Email = u.Email,
            Username = u.UserName,
            NumberOfRoles = u.Roles.Count,
            RoleNames = string.Join(",", u.Roles.ToArray())
        });

        return View(userList);
    }


    public async Task<IActionResult> AssignRole([Bind(Prefix = "Id")] string userName)
    {
        var user = await _userRepo.ReadByUsernameAndGetRolesAsync(userName);
        if (user == null)
        {
            return RedirectToAction("Index");
        }

        var allRoles = _roleRepo.ReadAllRoles().ToList();

        var allRoleNames = allRoles.Select(r => r.Name);

        var rolesUserDoesNotHave = allRoleNames.Except(user.Roles);

        ViewData["User"] = user;

        return View(rolesUserDoesNotHave);
    }

    [HttpPost]
    public async Task<IActionResult> AssignTheRole(string userName, string roleName)
    {
        if (ModelState.IsValid)
        {
            try
            {
                await _userRepo.AssignUserToRoleAsync(userName, roleName);
                return RedirectToAction("Index", "User");
            }
            catch(Exception e)
            {
                return Content($"{e.Message}");
            }
        }
        return View();
    }





    public async Task<IActionResult> RemoveRole([Bind(Prefix = "Id")] string userName)
    {
        var user = await _userRepo.ReadByUsernameAndGetRolesAsync(userName);
        if (user == null)
        {
            return RedirectToAction("Index");
        }

        var rolesUserHas = user.Roles;

        ViewData["User"] = user;

        return View(rolesUserHas);
    }

    [HttpPost]
    public async Task<IActionResult> RemoveTheRole(string userName, string roleName)
    {
        if (ModelState.IsValid)
        {
            try
            {
                await _userRepo.RemoveRoleFromUserAsync(userName, roleName);
                return RedirectToAction("Index", "User");
            }
            catch (Exception e)
            {
                return Content($"{e.Message}");
            }
        }
        return View();
    }



}