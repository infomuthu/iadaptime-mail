const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.options('*', cors());
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to FunOfHeuristic <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.elasticemail.com",
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "muthu@iadaptime.com",
      pass: "6353077c-eabf-4a17-b545-e8e01165ec92"
    }
  });

  let mailOptions = {
    from: '"Fun Of Heuristic"<muthu@iadaptime.com>', // sender address
    to: user.email, // list of receivers
    subject: "Wellcome to Fun Of Heuristic 👻", // Subject line
    html: `<h1>Hi ${user.name}</h1><br>
    <h4>Thanks for joining us</h4>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

// main().catch(console.error);
