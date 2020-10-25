const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const mail = require("./mailer");
const app = express();

var corsOptions = {
  origin: "https://lfamarket-api.herokuapp.com"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

// db.mongoose
//   .connect(`mongodb+srv://arudovwen:arudovwen@cluster0.msdqh.mongodb.net/lfamarket`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
  
  db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome User" });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/payment.routes")(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.post("/api/send-proof", (req, res) => {

  let htmlContent = `
              
                <p>Hi,</p>
                <p>${req.body.name} contacted with the following Details</p>
                <br/>
                <p>Email: ${req.body.email}</p>
                <p>Username: ${req.body.username}</p>
                <p> Name: ${req.body.name}</p>
                <p>Payment proof: ${req.body.url}</p>`;
           
                var mailOptions = {
                  from: `${req.body.name} <${req.body.email}>`,
                  to: "successahon@gmail.com",
                  subject: 'Payment Proof',
                  html: htmlContent,
                };

  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.status(201).send(info.response);
      console.log("Email sent: " + info.response);
    }
  });
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
