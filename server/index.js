import express from "express";
import * as  dotenv from 'dotenv';
dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/api", (req, res, next) => {

    const { slack_name, track } = req.query;

    // Get the current day of the week
    const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
  // Get the current UTC time and adjust it to UTC+1
  const now = new Date();
  const currentUtcTime = new Date(now.getTime()); // Add 1 hour

  // Validate UTC+1 time within a +/-2 minute window
  const validTimeRange = 2 * 60 * 1000; // 2 minutes in milliseconds
  const utcTime = currentUtcTime.getTime();
  const minTime = utcTime - validTimeRange;
  const maxTime = utcTime + validTimeRange;
  
 
    const githubFileUrl = 'https://github.com/CryptoCholo/hngX/blob/main/server/index.js';
    const githubRepoUrl = 'https://github.com/CryptoCholo/hngX';
  
    const response = {
      slack_name,
      current_day: currentDay,
      utc_time:  currentUtcTime.toISOString().replace(/\.\d{3}Z$/, 'Z'),
      track,
      github_file_url: githubFileUrl,
      github_repo_url: githubRepoUrl,
      status_code: 200,
    };
    
    // Check if the UTC time is within the valid time range
    if (utcTime >= minTime && utcTime <= maxTime) {
      res.json(response);
    } else {
        res.status(400).json({ error: 'Invalid UTC+1 time' });
    }
});


app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
  

app.listen(PORT, () => {
  console.log(`your application is running on ${process.env.HOST}:${process.env.PORT}`);
});