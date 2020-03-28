const http = require("http");
const fs = require("fs");

/***
 *  to run this file, create a package.json
 *  npm init -y
 *  npm install nodemon
 *
 * then run the project with
 * npm start.
 *
 * open your browser and and type http://localhost:8080
 *
 *  getMessageInput: http://localhost:8080/message
 *  htmlText:  http://localhost:8080/
 */

const server = http.createServer((req, res) => {
  // get input by the user
  const getMessageInput = () => {
    return res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <style>
    *{
      font-family: Verdana;
      width: 80%;
      margin: auto;
    }

    body{
      margin-top: 5rem;
      align-items: center
    }
    </style>
    <body>
    <form autocomplete='off' action='/' method='post'>
       <input type='text' name='message' placeholder="Please enter message" /> </b>
        <input type='submit' value='Submit Message' />
     </form>
     </body>
     </html>
    `);
  };

  //  recive notification
  const htmlText = message => {
    return res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <style>
    *{
      font-family: Verdana;
      width: 80%;
      margin: auto;
    }

    body{
  text-align: center;
  font-size: 2rem;
    }
    </style>
    <body>
        <h1>Simple Form For HNG Task </h1>
        <h2>${message}</h2>
    </body>
    </html>
    `);
  };

  if (req.method === "POST" && req.url === "/") {
    let text = req.body;
    req.on("data", data => {
      text += data;
    });
    req.on("end", () => {
      const save = text.split("=")[1];
      fs.appendFile("message.txt", save, err => {
        if (err) {
          htmlText("Sorry Input Failed");
        } else {
          htmlText("message: Data Stored");
        }
      });
    });
  } else if (req.method === "GET" && req.url === "/message") {
    getMessageInput();
  } else {
    htmlText("Error: Ups, Try again.....");
  }
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
