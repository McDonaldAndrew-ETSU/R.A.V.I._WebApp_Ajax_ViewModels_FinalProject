﻿namespace MachineLearning_WebApp_Ajax_ViewModels_FinalProject.Models;

public class CommandSentence
{
    public int Id { get; set; }

    public string CommandAction { get; set; } = String.Empty;
    public Command? Command { get; set; }

    public string SentenceSpelling { get; set; } = String.Empty;
    public Sentence? Sentence { get; set; }
}
