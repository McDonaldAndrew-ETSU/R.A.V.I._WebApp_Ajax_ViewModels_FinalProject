using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MachineLearning_WebApp_Ajax_ViewModels_FinalProject.Controllers;

[Authorize(Roles = "User, Administrator")]
public class CommandController : Controller
{
    public IActionResult CommandIndex() //done!
    {
        return View();
    }

    [Authorize(Roles = "Administrator")]
    public IActionResult CommandCreate() //done!
    {
        return View();
    }

    public IActionResult CommandDetails() //done!
    {
        return View();
    }

    [Authorize(Roles = "Administrator")]
    public IActionResult CommandEdit() //done!
    {
        return View();
    }

    [Authorize(Roles = "Administrator")]
    public IActionResult CommandDelete() //done!
    {
        return View();
    }
}
