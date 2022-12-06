namespace MachineLearning_WebApp_Ajax_ViewModels_FinalProject.Models;

public class Command
{
    public string Action { get; set; } = String.Empty;
    public string Information { get; set; } = String.Empty;
    public string CommandType { get; set; } = String.Empty;
    public ICollection<CommandSentence> CommandSentences { get; set; } = new List<CommandSentence>();
}
