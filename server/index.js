import express from "express";
import * as  dotenv from 'dotenv';
dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/api", (req, res, next) => {

    const { slack_name, track } = req.query;

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();
    const currentDay = daysOfWeek[currentDate.getUTCDay()];

    // Get current UTC time
    const utcTime = new Date().toISOString();
  
 
    const githubFileUrl = 'https://github.com/CryptoCholo/hngX/blob/main/server/index.js';
    const githubRepoUrl = 'https://github.com/CryptoCholo/hngX';
  
    const response = {
      slack_name,
      current_day: currentDay,
      utc_time: utcTime,
      track,
      github_file_url: githubFileUrl,
      github_repo_url: githubRepoUrl,
      status_code: 200,
    };
    
    // Check if the UTC time is within the valid time range
    if (utcTime >= minTime && utcTime <= maxTime) {
      res.json(response);
    } else {
      res.status(400).json({ error: 'Invalid UTC time' });
    }
});


app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
  

app.listen(PORT, () => {
  console.log(`your application is running on ${process.env.HOST}:${process.env.PORT}`);
});