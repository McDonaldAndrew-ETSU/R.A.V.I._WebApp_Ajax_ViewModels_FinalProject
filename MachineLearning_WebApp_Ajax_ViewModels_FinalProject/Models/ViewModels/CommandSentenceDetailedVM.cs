namespace MachineLearning_WebApp_Ajax_ViewModels_FinalProject.Models.ViewModels;

public class CommandSentenceDetailedVM
{
    public int Id { get; set; }
    public string CommandAction { get; set; } = String.Empty;
    public string SentenceSpelling { get; set; } = String.Empty;

    public Command? Command { get; set; }
    public Sentence? Sentence { get; set; }
}
