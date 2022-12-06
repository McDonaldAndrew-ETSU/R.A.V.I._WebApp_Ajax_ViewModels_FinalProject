using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MachineLearning_WebApp_Ajax_ViewModels_FinalProject.Controllers;

[Authorize(Roles = "User, Administrator")]
public class CommandSentenceController : Controller
{
    public IActionResult CommandSentenceIndex() //done!
    {
        return View();
    }

    [Authorize(Roles = "Administrator")]
    public IActionResult CommandSentenceDetailedIndex() //done!
    {
        return View();
    }

    [Authorize(Roles = "Administrator")]
    public IActionResult CommandSentenceCreate() //done!
    {
        
        return View();
    }

    [Authorize(Roles = "Administrator")]
    public IActionResult CommandSentenceDetails() //done!
    {
        return View();
    }

    [Authorize(Roles = "Administrator")]
    public IActionResult CommandSentenceEdit() //done!
    {
        return View();
    }

    [Authorize(Roles = "Administrator")]
    public IActionResult CommandSentenceDelete() //done!
    {
        return View();
    }
}
