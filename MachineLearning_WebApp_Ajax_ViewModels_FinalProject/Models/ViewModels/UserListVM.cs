using System.ComponentModel.DataAnnotations;

namespace MachineLearning_WebApp_Ajax_ViewModels_FinalProject.Models.ViewModels;

public class UserListVM
{
    public string Name { get; set; } = String.Empty;
    public string Email { get; set; } = String.Empty;
    public string Username { get; set; } = String.Empty;

    [Display(Name = "Number of Roles")]
    public int NumberOfRoles { get; set; }

    [Display(Name = "Role Names")]
    public string RoleNames { get; set; } = String.Empty;
}