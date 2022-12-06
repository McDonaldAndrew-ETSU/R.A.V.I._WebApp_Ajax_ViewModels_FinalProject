using System.ComponentModel.DataAnnotations;

namespace MachineLearning_WebApp_Ajax_ViewModels_FinalProject.Models;

public class Sentence
{
    public string Spelling { get; set; } = String.Empty;
    public string Meaning { get; set; } = String.Empty;
    public ICollection<CommandSentence> CommandSentences { get; set; } = new List<CommandSentence>();
}
