using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MachineLearning_WebApp_Ajax_ViewModels_FinalProject.Controllers;

[Authorize(Roles = "User, Administrator")]
public class SentenceController : Controller
{
    public IActionResult SentenceIndex() //done!
    {
        return View();
    }

    public IActionResult SentenceCreate() //done!
    {
        return View();
    }

    public IActionResult SentenceDetails() //done!
    {
        return View();
    }

    [Authorize(Roles = "Administrator")]
    public IActionResult SentenceEdit() //done!
    {
        return View();
    }

    [Authorize(Roles = "Administrator")]
    public IActionResult SentenceDelete() //done!
    {
        return View();
    }
}
