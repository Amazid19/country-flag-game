# Streamer.bot & Voice Configuration for Country Flag Game

এই ফাইলে Streamer.bot অ্যাকশন এবং C# স্ক্রিপ্ট সেটআপ গাইড সেভ করা আছে।

## ১. C# Code for Streamer.bot
Streamer.bot-এ নতুন অ্যাকশন তৈরি করে C# Code সাব-অ্যাকশনে নিচের কোডটি ব্যবহার করতে হবে:

```csharp
using System;
using System.Collections.Generic;

public class CPHInline
{
    private static Dictionary<string, int> userCommentCounts = new Dictionary<string, int>();

    public bool Execute()
    {
        string rawType = args["rawType"]?.ToString() ?? "";
        string userName = args["user"]?.ToString() ?? "Viewer";
        
        int pointsToAdd = 0;
        string speechText = "";

        // ১. সাবস্ক্রাইব করলে ১০০ পয়েন্ট ও ভয়েস অ্যানাউন্সমেন্ট
        if (rawType.Contains("Subscribe") || rawType.Contains("NewSubscriber"))
        {
            pointsToAdd = 100;
            speechText = userName + " subscribed to the channel! 100 points added!";
            CPH.SetArgument("pointsEarned", pointsToAdd);
            CPH.SetArgument("countryName", "");
            
            CPH.Speak(speechText);
            return true;
        }

        // ২. শেয়ার করলে ১০০০ পয়েন্ট ও ভয়েস অ্যানাউন্সমেন্ট
        if (rawType.Contains("Share") || rawType.Contains("StreamShared"))
        {
            pointsToAdd = 1000;
            speechText = userName + " shared the stream! 1000 points added!";
            CPH.SetArgument("pointsEarned", pointsToAdd);
            CPH.SetArgument("countryName", "");
            
            CPH.Speak(speechText);
            return true;
        }

        // ৩. সাধারণ চ্যাট কমেন্ট (দেশের নাম) ও পয়েন্ট লজিক
        string message = args["message"]?.ToString().Trim() ?? "";
        if (string.IsNullOrEmpty(message)) return false;

        string countryName = message.ToLower();

        if (!userCommentCounts.ContainsKey(userName))
        {
            userCommentCounts[userName] = 0;
        }

        userCommentCounts[userName]++;
        int commentCount = userCommentCounts[userName];

        // পয়েন্ট ডিস্ট্রিবিউশন রুলস
        if (commentCount == 1)
        {
            pointsToAdd = 3;
        }
        else if (commentCount == 2)
        {
            pointsToAdd = 5;
        }
        else
        {
            pointsToAdd = 4;
        }

        CPH.SetArgument("countryName", message);
        CPH.SetArgument("pointsEarned", pointsToAdd);

        return true;
    }
}
