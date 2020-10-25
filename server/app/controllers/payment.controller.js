const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Payment = db.payment;
const Investment = db.investment;
const Proof = db.proof;

exports.saveInvestment = (req, res) => {
 
  const arr = Investment.findOne({ username: req.body.username }).exec(
    (err, data) => {
     if (err) {
       
     }else{
       if (data) {
       
        Investment.deleteOne({username:req.body.username}).exec((err,val)=>{
          if (err) {
            
          }else{
            const investment = new Investment({
              user_id: req.body.user_id,
              username: req.body.username,
              plan: req.body.plan,
              amount: req.body.amount,
              duration: req.body.plan,
              start: new Date(),
              end: new Date(),
              status: "inactive",
              payment_id: 1,
            });
            investment.save((err, data) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              } else {
                res.status(201).send(data);
              }
            });
          }
        })
         
       }else{
        const investment = new Investment({
          user_id: req.body.user_id,
          username: req.body.username,
          plan: req.body.plan,
          amount: req.body.amount,
          duration: req.body.plan,
          start: new Date(),
          end: new Date(),
          status: "inactive",
          payment_id: 1,
        });
        investment.save((err, data) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          } else {
            res.status(201).send(data);
          }
        });
       }
     }
    }
  );


     
    
  
};

exports.makePayment = (req, res) => {
  Investment.findOne({ username: req.body.username }).exec(
    (err, data) => {
    if (err) {
      
    }else{

      const payment = new Payment({
        user_id: data.user_id,
        username: data.username,
        plan: data.plan,
        amount_paid: data.amount,
        investment_id:data._id,
        verify: false,
      });
      payment.save((err, data) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        } else {
          res.status(201).send(data);
        }
      });
    }
    }
  );



  
};

exports.updatePayment = (req, res) => {
 
  Payment.updateOne({ _id: req.body.payment_id }, { verify: true }).exec(
    (err, data) => {
    if (err) {
      res.status(500).send({ message: err });
    }else{
      Investment.updateOne({ username: data.username}, { status: "active" }).exec(
        (err, data) => {
          res.send(data);
        }
      );
    }
    }
  );
  
};
exports.getInvestments = (req, res) => {
  const arr = Investment.find({ username: req.body.username }).exec(
    (err, data) => {
      res.send(data);
    }
  );
};
exports.getInvestment = (req, res) => {
  const arr = Investment.findOne({ username: req.body.username }).exec(
    (err, data) => {
      res.send(data);
    }
  );
};

exports.saveProof = (req,res) =>{
  Investment.findOne({ username: req.body.username }).exec(
    (err, data) => {
    if (err) {
      
    }else{

      const proof = new Proof({
        user_id: data.user_id,
        username: data.username,
        plan: data.plan,
        amount_paid: data.amount,
        investment_id:data._id,
        url:req.body.url,
        verify: false,
      });
      proof.save((err, data) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        } else {
          res.status(201).send(data);
        }
      });
    }
    }
  );


}
