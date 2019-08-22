const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json());
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.listen(4001, () => {
  console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
 //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4222');
  res.send(
    "<h1 style='text-align: center'>Wellcome to iAdaptime ivestors <br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  res.send("hello");
  // let user = req.body;
  // sendMail(user, info => {
  //   console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
  //   res.send(info);
  // });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.elasticemail.com",
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'muthu@iadaptime.com',
      pass: '6353077c-eabf-4a17-b545-e8e01165ec92'
    }
  });
console.log(transporter)
  let mailOptions = {
    from: '"Muthupandi S"<muthu@iadaptime.com>', // sender address
    to: user.email, // list of receivers
    subject: "Wellcome to iAdaptime investors 👻", // Subject line
    html: `<h1>Hi ${user.name}</h1><br>
    <h4>This is testing for Mail service</h4>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

// main().catch(console.error);
