using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
namespace MachineLearning_WebApp_Ajax_ViewModels_FinalProject.Controllers;

[Authorize(Roles = "User, Administrator")]
public class SpeechController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}