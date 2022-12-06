using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MachineLearning_WebApp_Ajax_ViewModels_FinalProject.Models.Entities;

public class ApplicationUser : IdentityUser
{
    [Required]
    [StringLength(50)]
    public string Name { get; set; } = String.Empty;

    [NotMapped]
    public ICollection<string> Roles { get; set; } = new List<string>();


    public bool HasRole(string roleName) //Can also be done with the user manager: _userManager.IsInRole(user.Id, roleName)
    {
        return Roles.Contains(roleName);
    }
}
