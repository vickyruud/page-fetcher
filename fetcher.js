const input = process.argv.slice(2);
const fs = require('fs')
const request = require('request');
const readline = require('readline');

if (process.argv.length === 4) {
  const requestedURL = process.argv[2];
  const filePath = process.argv[3];
  
  request(requestedURL, (error, status, body) => {
    if (!error) {
      if (body && status.statusCode === 200) {
        fs.writeFile(filePath, body, (err) => {
          if (!err) {
            fs.stat(filePath, (err, stats) => {
              if (!err) {
                console.log(`Downloaded and saved ${stats.size} bytes to ${filePath}.`);
              } else {
                console.log(`Could not fetch file size.`);
              }
            });
          } else {
            console.log(`Could not save to specified file path.`, err);
          }
        });
      } else {
        console.log(`Body of the ${requestedURL} is empty or the expected status code 200 was not received.`);
        console.log(`Status code: ${status.statusCode}`);
        console.log(`Status: ${status} \r\n Body: ${body}`);
      }      
    } else {
      console.log(`Could not fetch ${requestedURL} \r\n Error: ${error}`);
    }
  });
} else {
  console.log(`Incorrect reqeust format.`);
  console.log(`Expected: node fetcher.js [url] [filepath]`); 
  console.log(`Example: node fetcher.js http://www.example.edu/ ./index.html `) 
}