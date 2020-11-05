const config = require("../config/auth.config");
const db = require("../models");
const Referral = db.referral;
const User = db.user;
const Role = db.role;
const Payment = db.payment;
const Investment = db.investment;
const Proof = db.proof;
const mail = require("../../mailer");

exports.saveInvestment = (req, res) => {
  const arr = Investment.findOne({ username: req.body.username }).exec(
    (err, data) => {
      if (err) {
      } else {
        if (data) {
          Investment.deleteOne({ username: req.body.username }).exec(
            (err, val) => {
              if (err) {
              } else {
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
          );
        } else {
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
  Investment.findOne({ username: req.body.username }).exec((err, data) => {
    if (err) {
    } else {
      const payment = new Payment({
        user_id: data.user_id,
        username: data.username,
        plan: data.plan,
        amount_paid: data.amount,
        investment_id: data._id,
        verify: false,
      });
      payment.save((err, data) => {
        if (err) {
          res.status(500).send({ message: err });
        } else {
          sendInvoice(data);
          res.status(201).send(data);
        }
      });
    }
  });
};

function sendInvoice(data) {


  
  User.findOne({ username: data.username }, (err, val) => {
    
    let htmlContent = `
    <!DOCTYPE html>
   
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Cobardia (firebrick)</title>
    
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    
        <meta name="description" content="Invoicebus Invoice Template" />
        <meta name="author" content="Invoicebus" />
    
        <meta name="template-hash" content="baadb45704803c2d1a1ac3e569b757d5" />
        <style>
          /*! Invoice Templates @author: Invoicebus @email: info@invoicebus.com @web: https://invoicebus.com @version: 1.0.0 @updated: 2015-02-27 16:02:34 @license: Invoicebus */
          /* Reset styles */
          @import url("https://fonts.googleapis.com/css?family=Open+Sans:400,700&subset=cyrillic,cyrillic-ext,latin,greek-ext,greek,latin-ext,vietnamese");
          html,
          body,
          div,
          span,
          applet,
          object,
          iframe,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p,
          blockquote,
          pre,
          a,
          abbr,
          acronym,
          address,
          big,
          cite,
          code,
          del,
          dfn,
          em,
          img,
          ins,
          kbd,
          q,
          s,
          samp,
          small,
          strike,
          strong,
          sub,
          sup,
          tt,
          var,
          b,
          u,
          i,
          center,
          dl,
          dt,
          dd,
          ol,
          ul,
          li,
          fieldset,
          form,
          label,
          legend,
          table,
          caption,
          tbody,
          tfoot,
          thead,
          tr,
          th,
          td,
          article,
          aside,
          canvas,
          details,
          embed,
          figure,
          figcaption,
          footer,
          header,
          hgroup,
          menu,
          nav,
          output,
          ruby,
          section,
          summary,
          time,
          mark,
          audio,
          video {
            margin: 0;
            padding: 0;
            border: 0;
            font: inherit;
            font-size: 100%;
            vertical-align: baseline;
          }
    
          html {
            line-height: 1;
          }
    
          ol,
          ul {
            list-style: none;
          }
    
          table {
            border-collapse: collapse;
            border-spacing: 0;
          }
    
          caption,
          th,
          td {
            text-align: left;
            font-weight: normal;
            vertical-align: middle;
          }
    
          q,
          blockquote {
            quotes: none;
          }
          q:before,
          q:after,
          blockquote:before,
          blockquote:after {
            content: "";
            content: none;
          }
    
          a img {
            border: none;
          }
    
          article,
          aside,
          details,
          figcaption,
          figure,
          footer,
          header,
          hgroup,
          main,
          menu,
          nav,
          section,
          summary {
            display: block;
          }
    
          /* Invoice styles */
          /**
     * DON'T override any styles for the <html> and <body> tags, as this may break the layout.
     * Instead wrap everything in one main <div id="container"> element where you may change
     * something like the font or the background of the invoice
     */
          html,
          body {
            /* MOVE ALONG, NOTHING TO CHANGE HERE! */
          }
    
          /** 
     * IMPORTANT NOTICE: DON'T USE '!important' otherwise this may lead to broken print layout.
     * Some browsers may require '!important' in oder to work properly but be careful with it.
     */
          .clearfix {
            display: block;
            clear: both;
          }
    
          .hidden {
            display: none;
          }
    
          b,
          strong,
          .bold {
            font-weight: bold;
          }
    
          #container {
            font: normal 13px/1.4em "Open Sans", Sans-serif;
            margin: 0 auto;
            min-height: 900px;
            background: #f7edeb url("../img/bg.png") 0 0 no-repeat;
            background-size: 100% auto;
            color: #5b6165;
            position: relative;
          }
    
          #memo {
            padding-top: 50px;
            margin: 0 80px 0 40px;
            border-bottom: 1px solid #ddd;
            height: 115px;
            width:100%;
          }
          #memo .logo {
            float: left;
            margin-right: 20px;
          }
          #memo .logo img {
            width: 150px;
            height: 100px;
          }
          #memo .company-info {
            float: right;
            text-align: right;
          }
          #memo .company-info > div:first-child {
            line-height: 1em;
            font-weight: bold;
            font-size: 24px;
            color:#f0f757;
          }
          #memo .company-info span {
            font-size: 11px;
            display: inline-block;
            min-width: 20px;
          }
          #memo:after {
            content: "";
            display: block;
            clear: both;
          }
    
          #invoice-title-number {
            font-weight: bold;
            margin: 30px 0;
            
          }
          #invoice-title-number span {
            line-height: 0.88em;
            display: inline-block;
            min-width: 20px;
          }
          #invoice-title-number #title {
            text-transform: capitalize;
            padding: 5px 12px 5px 20px;
            font-size: 30px;
            background:#f0f757;
            color: white;
          }
          #invoice-title-number #number {
            margin-left: 10px;
            font-size: 24px;
            position: relative;
            top: -5px;
          }
    
          #client-info {
            float: left;
            margin-left: 60px;
            min-width: 220px;
          }
          #client-info > div {
            margin-bottom: 3px;
            min-width: 20px;
          }
          #client-info span {
            display: block;
            min-width: 20px;
          }
          #client-info > span {
            text-transform: uppercase;
          }
    
          table {
            table-layout: fixed;
          }
          table th,
          table td {
            vertical-align: top;
            word-break: keep-all;
            word-wrap: break-word;
          }
    
          #items {
            margin: 35px 30px 0 30px;
          }
          #items .first-cell,
          #items table th:first-child,
          #items table td:first-child {
            width: 40px !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            text-align: right;
          }
          #items table {
            border-collapse: separate;
            width: 100%;
          }
          #items table th {
            font-weight: bold;
            padding: 5px 8px;
            text-align: right;
            background:#f0f757;
            color: white;
            text-transform: uppercase;
          }
          #items table th:nth-child(2) {
            width: 30%;
            text-align: left;
          }
          #items table th:last-child {
            text-align: right;
          }
          #items table td {
            padding: 9px 8px;
            text-align: right;
            border-bottom: 1px solid #ddd;
          }
          #items table td:nth-child(2) {
            text-align: left;
          }
    
          #sums {
            margin: 25px 30px 0 0;
            background: url("../img/total-stripe-firebrick.png") right bottom
              no-repeat;
          }
          #sums table {
            float: right;
          }
          #sums table tr th,
          #sums table tr td {
            min-width: 100px;
            padding: 9px 8px;
            text-align: right;
          }
          #sums table tr th {
            font-weight: bold;
            text-align: left;
            padding-right: 35px;
          }
          #sums table tr td.last {
            min-width: 0 !important;
            max-width: 0 !important;
            width: 0 !important;
            padding: 0 !important;
            border: none !important;
          }
          #sums table tr.amount-total th {
            text-transform: uppercase;
          }
          #sums table tr.amount-total th,
          #sums table tr.amount-total td {
            font-size: 15px;
            font-weight: bold;
          }
          #sums table tr:last-child th {
            text-transform: uppercase;
          }
          #sums table tr:last-child th,
          #sums table tr:last-child td {
            font-size: 15px;
            font-weight: bold;
            color: white;
          }
    
          #invoice-info {
            float: left;
            margin: 50px 40px 0 60px;
          }
          #invoice-info > div > span {
            display: inline-block;
            min-width: 20px;
            min-height: 18px;
            margin-bottom: 3px;
          }
          #invoice-info > div > span:first-child {
            color: black;
          }
          #invoice-info > div > span:last-child {
            color: #aaa;
          }
          #invoice-info:after {
            content: "";
            display: block;
            clear: both;
          }
    
          #terms {
            float: left;
            margin-top: 50px;
          }
          #terms .notes {
            min-height: 30px;
            min-width: 50px;
            color:#f0f757;
          }
          #terms .payment-info div {
            margin-bottom: 3px;
            min-width: 20px;
          }
    
          .thank-you {
            margin: 10px 0 30px 0;
            display: inline-block;
            min-width: 20px;
            text-transform: uppercase;
            font-weight: bold;
            line-height: 0.88em;
            float: right;
            padding: 5px 30px 5px 20px;
            font-size: 24px;
            background:#f0f757;
            color: white;
          }
    
          .ib_bottom_row_commands {
            margin-left: 30px !important;
          }
    
          /**
     * If the printed invoice is not looking as expected you may tune up
     * the print styles (you can use !important to override styles)
     */
          @media print {
            /* Here goes your print styles */
          }
        </style>
      </head>
      <body>
        <div id="container">
          <section id="memo">
            <div class="logo">
              <img src="https://lfamarket.herokuapp.com/assets/img/lfa.jpeg"  alt="LFAMARKETS logo/>
            </div>
    
            <div class="company-info">
              <div>LFA MARKETS</div>
    
              <br />
    
              <span
                >Matox-Mokomene Pephel opposite to Ramokgopa Capricorn College</span
              >
              <span>Limpopo</span>
    
              <br />
    
              <span>+27 76 526 4694</span> <br>
              <span>info@lfamarket.co.za</span>
            </div>
          </section>
    
          <section id="invoice-title-number">
            <span id="title">INVOICE</span> <br>
            <span>ID : ${data.investment_id} </span>   
          </section>
    
          <div class="clearfix"></div>
    
          <section id="client-info">
            <span>Bill to</span>
            <div>
              <span class="bold" style="text-transform:capitalize">${val.firstname} ${val.lastname}</span>
            </div>
    
            <div>
              <span>${val.phonenumber}</span>
            </div>
    
            <div>
              <span>${val.email}</span>
            </div>
    
            <div>
              <span>${val.username}</span>
            </div>
          </section>
    
          <div class="clearfix"></div>
    
          <section id="items">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <th>Plan</th>
                <!-- Dummy cell for the row number and row commands -->
                <th>Duration</th>
                <th>Price</th>
              </tr>
    
              <tr data-iterate="item">
                <td style="text-transform:capitalize">${data.plan}</td>
                <!-- Don't remove this column as it's needed for the row commands -->
    
                <td>${data.plan} months</td>
                <td>R${number_format(data.amount_paid)}</td>
              </tr>
            </table>
          </section>
    
          <section id="sums">
            <table cellpadding="0" cellspacing="0">
              <tr>
                <th>Subtotal</th>
                <td>R${number_format(data.amount_paid)}</td>
              </tr>
    
              <tr class="amount-total">
                <th>Total</th>
                <td>R${number_format(data.amount_paid)}</td>
              </tr>
    
              <!-- You can use attribute data-hide-on-quote="true" to hide specific information on quotes.
                   For example Invoicebus doesn't need amount paid and amount due on quotes  -->
              <tr data-hide-on-quote="true">
                <th>Paid</th>
                <td>R0.00</td>
              </tr>
    
              <tr data-hide-on-quote="true">
                <th>Amount Due</th>
                <td>R${number_format(data.amount_paid)}</td>
              </tr>
            </table>
    
            <div class="clearfix"></div>
          </section>
    
          <div class="clearfix"></div>
    
          <section id="invoice-info">
            <div><span>Issue Date :</span> <span>${new Date().toLocaleDateString()}</span></div>
            <br />
    
            <div><span>Currency :</span> <span>Rands</span></div>
          </section>
    
          <section id="terms" style="padding:0 20px;">
            <div class="notes" >
             <span style="text-transform:capitalize">${val.firstname}</span> , thank you very much. We really appreciate your business. Please
              send payments before the due date.
            </div>
    
            <br />
    
            <div class="payment-info">
              <div>Payment Details</div>
              <div>Bank name : FNB Bank</div>
              <div>Account holder name : LFA MARKET</div>
              <div>Account Number : 628 6122 7976</div>
              <div>Account type : Cheque</div>
              <div>Branch code : 200606</div>
            </div>
          </section>
    
          <div class="clearfix"></div>
    
          <div class="thank-you">Thanks</div>
    
          <div class="clearfix"></div>
        </div>
      </body>
    </html>
    
    `;
  
    
  
    var mailOptions = {
      from: `payment@lfamarket.co.za`,
      to: `${val.email}`,
      subject: "Lfamarkets Invoice",
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


}

exports.updatePayment = (req, res) => {
  Payment.updateOne({ _id: req.body.payment_id }, { verify: true }).exec(
    (err, data) => {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        Investment.findOne({ username: data.username }).exec((err, data) => {
          if (err) {
          } else {
            User.findOne({ username: data.username }).exec((err, val) => {
              if (err) {
              } else {
                if (val) {
                  Referral.findOne({
                    username: val.username.toLowerCase(),
                  }).exec((err, dat) => {
                    if (err) {
                      res.status(500).send({ message: err });
                      return;
                    } else {
                      var amount = data.amount * 0.01;
                      if (dat) {
                        var newval = dat.referral.push({
                          name: data.username.toLowerCase(),
                          amount: amount,
                        });

                        Referral.updateOne(
                          { username: req.body.referral.toLowerCase() },
                          { referral: data.referral }
                        ).exec((err, val) => {
                          if (err) {
                          }
                        });
                      } else {
                        var arr = [];
                        arr.push({
                          name: data.username.toLowerCase(),
                          amount: amount,
                        });
                        const ref = new Referral({
                          username: val.username.toLowerCase(),
                          referral: arr,
                        });

                        ref.save((err, user) => {
                          if (err) {
                            res.status(500).send({ message: err });
                            return;
                          }
                        });
                      }
                    }
                  });
                }
              }
            });
          }
        });
        Investment.updateOne(
          { username: data.username },
          { status: "active" }
        ).exec((err, data) => {
          res.send(data);
        });
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
  const arr = Investment.findOne(
    { username: req.body.username },
    (err, data) => {
      res.send(data);
    }
  );
};
exports.getInvoices = (req, res) => {
  const arr = Proof.find({ username: req.params.username }).exec(
    (err, data) => {
      if (err) {
      } else {
        res.status(200).send(data);
      }
    }
  );
};
exports.saveProof = (req, res) => {
  Investment.findOne({ username: req.body.username }).exec((err, data) => {
    if (err) {
    } else {
      const proof = new Proof({
        user_id: data.user_id,
        username: data.username,
        plan: data.plan,
        amount_paid: data.amount,
        investment_id: data._id,
        url: req.body.url,
        verified: false,
        startDate: null,
        endDate: null,
        earning: null,
        status: "inactive",
      });
      Proof.findOne({ investment_id: data._id}).exec((err,va)=>{
        if (err) {
          
        }else{
          if (va) {
            Proof.updateOne({ investment_id: data._id},{url: req.body.url}).exec((err,v)=>{
              if (err) {
                res.status(500).send({ message: err });
                return;
              } else {
                res.status(201).send(data);
              }
            })
          }else{
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
      })
    
    }
  });
};

exports.getReferrals = (req, res) => {
  Referral.find({ username: req.params.username }).exec((err, data) => {
    if (err) {
      res.status(500).send("Error");
    } else {
      res.status(200).send(data);
    }
  });
};

exports.getPayments = (req, res) => {
  Proof.find().exec((err, data) => {
    if (err) {
      res.status(500).send("Error");
    } else {
      res.status(200).send(data);
    }
  });
};

exports.allreferrals = (req, res) => {
  Referral.find().exec((err, data) => {
    if (err) {
      res.status(500).send("Error");
    } else {
      res.status(200).send(data);
    }
  });
};

exports.allinvestments = (req, res) => {
  Investment.find().exec((err, data) => {
    if (err) {
      res.status(500).send("Error");
    } else {
      res.status(200).send(data);
    }
  });
};

exports.verifyproof = (req, res) => {
  var endD;
  now = new Date();
  var earnings;

  if (req.params.plan == "one") {
    endD = new Date(now.setMonth(now.getMonth() + 1));
    earnings = 8800;
  }
  if (req.params.plan == "two") {
    endD = new Date(now.setMonth(now.getMonth() + 2));
    earnings = 14800;
  }
  if (req.params.plan == "four") {
    endD = new Date(now.setMonth(now.getMonth() + 4));
    earnings = 37800;
  }
  if (req.params.plan == "six") {
    endD = new Date(now.setMonth(now.getMonth() + 6));
    earnings = 78800;
  }
  if (req.params.plan == "eight") {
    endD = new Date(now.setMonth(now.getMonth() + 8));
    earnings = 123800;
  }
  if (req.params.plan == "twelve") {
    endD = new Date(now.setMonth(now.getMonth() + 12));
    earnings = 181800;
  }

  const newvalue = {
    verified: true,
    status: "active",
    startDate: new Date(),
    endDate: endD,
    earning: earnings,
  };
  const opts = { new: true };
  Proof.findOneAndUpdate(
    { investment_id: req.params.id },
    newvalue,
    opts,
    function (err, data) {
      if (err) {
      } else {
        updateinvestment(req, res);
        verifypayment(req, res);
        sendReceipt(data);
        handleReferral(data);
        res.status(200).send(data);
      }
    }
  );
};

exports.unverifyproof = (req, res) => {
  const newvalue = {
    verified: false,
    status: "inactive",
    startDate: null,
    endDate: null,
    earning: null,
  };
  const opts = { new: true };
  Proof.findOneAndUpdate(
    { investment_id: req.params.id },
    newvalue,
    opts,
    function (err, data) {
      if (err) {
      } else {
        res.status(200).send(data);
      }
    }
  );
};

updateinvestment = (req, res) => {
  Investment.findOneAndUpdate(
    { _id: req.params.id },
    { status: "active" },
    null,
    function (err, data) {
      if (err) {
      } else {
      }
    }
  );
};
verifypayment = (req, res) => {
  Payment.findOneAndUpdate(
    { investment_id: req.params.id },
    { verify: true },
    null,
    function (err, data) {
      if (err) {
      } else {
      }
    }
  );
};

exports.getmyplan = (req, res) => {
  Proof.findOne({
    user_id: req.params.id,
  }).exec((err, data) => {
    if (err) {
    } else {
      res.status(200).send(data);
    }
  });
};

sendReceipt = (res) => {
  User.findOne({ username: res.username }, (err, val) => {
   
  let htmlContent = `
  <!DOCTYPE html>
  <!--
    Invoice template by invoicebus.com
    To customize this template consider following this guide https://invoicebus.com/how-to-create-invoice-template/
    This template is under Invoicebus Template License, see https://invoicebus.com/templates/license/
  -->
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>Payment receipt</title>
  
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
  
      <meta name="description" content="Invoicebus Invoice Template" />
      <meta name="author" content="Invoicebus" />
  
      <meta name="template-hash" content="baadb45704803c2d1a1ac3e569b757d5" />
      <style>
        /*! Invoice Templates @author: Invoicebus @email: info@invoicebus.com @web: https://invoicebus.com @version: 1.0.0 @updated: 2015-02-27 16:02:34 @license: Invoicebus */
        /* Reset styles */
        @import url("https://fonts.googleapis.com/css?family=Open+Sans:400,700&subset=cyrillic,cyrillic-ext,latin,greek-ext,greek,latin-ext,vietnamese");
        html,
        body,
        div,
        span,
        applet,
        object,
        iframe,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        blockquote,
        pre,
        a,
        abbr,
        acronym,
        address,
        big,
        cite,
        code,
        del,
        dfn,
        em,
        img,
        ins,
        kbd,
        q,
        s,
        samp,
        small,
        strike,
        strong,
        sub,
        sup,
        tt,
        var,
        b,
        u,
        i,
        center,
        dl,
        dt,
        dd,
        ol,
        ul,
        li,
        fieldset,
        form,
        label,
        legend,
        table,
        caption,
        tbody,
        tfoot,
        thead,
        tr,
        th,
        td,
        article,
        aside,
        canvas,
        details,
        embed,
        figure,
        figcaption,
        footer,
        header,
        hgroup,
        menu,
        nav,
        output,
        ruby,
        section,
        summary,
        time,
        mark,
        audio,
        video {
          margin: 0;
          padding: 0;
          border: 0;
          font: inherit;
          font-size: 100%;
          vertical-align: baseline;
        }
  
        html {
          line-height: 1;
        }
  
        ol,
        ul {
          list-style: none;
        }
  
        table {
          border-collapse: collapse;
          border-spacing: 0;
        }
  
        caption,
        th,
        td {
          text-align: left;
          font-weight: normal;
          vertical-align: middle;
        }
  
        q,
        blockquote {
          quotes: none;
        }
        q:before,
        q:after,
        blockquote:before,
        blockquote:after {
          content: "";
          content: none;
        }
  
        a img {
          border: none;
        }
  
        article,
        aside,
        details,
        figcaption,
        figure,
        footer,
        header,
        hgroup,
        main,
        menu,
        nav,
        section,
        summary {
          display: block;
        }
  
        /* Invoice styles */
        /**
   * DON'T override any styles for the <html> and <body> tags, as this may break the layout.
   * Instead wrap everything in one main <div id="container"> element where you may change
   * something like the font or the background of the invoice
   */
        html,
        body {
          /* MOVE ALONG, NOTHING TO CHANGE HERE! */
        }
  
        /** 
   * IMPORTANT NOTICE: DON'T USE '!important' otherwise this may lead to broken print layout.
   * Some browsers may require '!important' in oder to work properly but be careful with it.
   */
        .clearfix {
          display: block;
          clear: both;
        }
  
        .hidden {
          display: none;
        }
  
        b,
        strong,
        .bold {
          font-weight: bold;
        }
  
        #container {
          font: normal 13px/1.4em "Open Sans", Sans-serif;
          margin: 0 auto;
          min-height: 900px;
          background: #f7edeb url("../img/bg.png") 0 0 no-repeat;
          background-size: 100% auto;
          color: #5b6165;
          position: relative;
        }
  
        #memo {
          padding-top: 50px;
          margin: 0 110px 0 60px;
          border-bottom: 1px solid #ddd;
          height: 115px;
        }
        #memo .logo {
          float: left;
          margin-right: 20px;
        }
        #memo .logo img {
          width: 150px;
          height: 100px;
        }
        #memo .company-info {
          float: right;
          text-align: right;
        }
        #memo .company-info > div:first-child {
          line-height: 1em;
          font-weight: bold;
          font-size: 22px;
          color:#f0f757;
        }
        #memo .company-info span {
          font-size: 11px;
          display: inline-block;
          min-width: 20px;
        }
        #memo:after {
          content: "";
          display: block;
          clear: both;
        }
  
        #invoice-title-number {
          font-weight: bold;
          margin: 30px 0;
        }
        #invoice-title-number span {
          line-height: 0.88em;
          display: inline-block;
          min-width: 20px;
        }
        #invoice-title-number #title {
          text-transform: capitalize;
          padding: 5px 12px 5px 20px;
          font-size: 30px;
          background:#f0f757;
          color: white;
        }
        #invoice-title-number #number {
          margin-left: 10px;
          font-size: 24px;
          position: relative;
          top: -5px;
        }
  
        #client-info {
          float: left;
          margin-left: 60px;
          min-width: 220px;
        }
        #client-info > div {
          margin-bottom: 3px;
          min-width: 20px;
        }
        #client-info span {
          display: block;
          min-width: 20px;
        }
        #client-info > span {
          text-transform: uppercase;
        }
  
        table {
          table-layout: fixed;
        }
        table th,
        table td {
          vertical-align: top;
          word-break: keep-all;
          word-wrap: break-word;
        }
  
        #items {
          margin: 35px 30px 0 30px;
        }
        #items .first-cell,
        #items table th:first-child,
        #items table td:first-child {
          width: 40px !important;
          padding-left: 0 !important;
          padding-right: 0 !important;
          text-align: right;
        }
        #items table {
          border-collapse: separate;
          width: 100%;
        }
        #items table th {
          font-weight: bold;
          padding: 5px 8px;
          text-align: right;
          background:#f0f757;
          color: white;
          text-transform: uppercase;
        }
        #items table th:nth-child(2) {
          width: 30%;
          text-align: left;
        }
        #items table th:last-child {
          text-align: right;
        }
        #items table td {
          padding: 9px 8px;
          text-align: right;
          border-bottom: 1px solid #ddd;
        }
        #items table td:nth-child(2) {
          text-align: left;
        }
  
        #sums {
          margin: 25px 30px 0 0;
          background: url("../img/total-stripe-firebrick.png") right bottom
            no-repeat;
        }
        #sums table {
          float: right;
        }
        #sums table tr th,
        #sums table tr td {
          min-width: 100px;
          padding: 9px 8px;
          text-align: right;
        }
        #sums table tr th {
          font-weight: bold;
          text-align: left;
          padding-right: 35px;
        }
        #sums table tr td.last {
          min-width: 0 !important;
          max-width: 0 !important;
          width: 0 !important;
          padding: 0 !important;
          border: none !important;
        }
        #sums table tr.amount-total th {
          text-transform: uppercase;
        }
        #sums table tr.amount-total th,
        #sums table tr.amount-total td {
          font-size: 15px;
          font-weight: bold;
        }
        #sums table tr:last-child th {
          text-transform: uppercase;
        }
        #sums table tr:last-child th,
        #sums table tr:last-child td {
          font-size: 15px;
          font-weight: bold;
          color: white;
        }
  
        #invoice-info {
          float: left;
          margin: 50px 40px 0 60px;
        }
        #invoice-info > div > span {
          display: inline-block;
          min-width: 20px;
          min-height: 18px;
          margin-bottom: 3px;
        }
        #invoice-info > div > span:first-child {
          color: black;
        }
        #invoice-info > div > span:last-child {
          color: #aaa;
        }
        #invoice-info:after {
          content: "";
          display: block;
          clear: both;
        }
  
        #terms {
          float: left;
          margin-top: 50px;
        }
        #terms .notes {
          min-height: 30px;
          min-width: 50px;
          color:#f0f757;
        }
        #terms .payment-info div {
          margin-bottom: 3px;
          min-width: 20px;
        }
  
        .thank-you {
          margin: 10px 0 30px 0;
          display: inline-block;
          min-width: 20px;
          text-transform: uppercase;
          font-weight: bold;
          line-height: 0.88em;
          float: right;
          padding: 5px 30px 5px 20px;
          font-size: 24px;
          background:#f0f757;
          color: white;
        }
  
        .ib_bottom_row_commands {
          margin-left: 30px !important;
        }
  
        /**
   * If the printed invoice is not looking as expected you may tune up
   * the print styles (you can use !important to override styles)
   */
        @media print {
          /* Here goes your print styles */
        }
      </style>
    </head>
    <body>
      <div id="container">
        <section id="memo">
          <div class="logo">
            <img src="https://lfamarket.herokuapp.com/assets/img/lfa.jpeg"  alt="LFAMARKETS logo/>
          </div>
  
          <div class="company-info">
            <div>LFA MARKETS</div>
  
            <br />
  
            <span
              >Matox-Mokomene Pephel opposite to Ramokgopa Capricorn College</span
            >
            <span>Limpopo</span>
  
            <br />
  
            <span>+27 76 526 4694</span> <br>
            <span>info@lfamarket.co.za</span>
          </div>
        </section>
  
        <section id="invoice-title-number" style="padding: 0 15px">
          <span id="title">Payment Receipt</span>
          <br>
   <span>ID : ${res.investment_id} </span>        
        </section>
  
        <div class="clearfix"></div>
  
        <section id="client-info">
          <span>Receipt to</span>
          <div>
            <span class="bold" style="text-transform:capitalize">${val.firstname} ${val.lastname}</span>
          </div>
  
      
          <div>
            <span>${val.email}</span>
          </div>
  
          <div>
            <span>${val.username}</span>
          </div>
        </section>
  
        <div class="clearfix"></div>
  
        <section id="items">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <th>Plan</th>
              <!-- Dummy cell for the row number and row commands -->
              <th>Duration</th>
              <th>Price</th>
            </tr>
  
            <tr data-iterate="item">
              <td style="text-transform:capitalize">${res.plan}</td>
             
  
              <td>${res.plan} months</td>
              <td>R${number_format(res.amount_paid)}</td>
            </tr>
          </table>
        </section>
  
        <section id="sums">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <th>Subtotal</th>
              <td>R${number_format(res.amount_paid)}</td>
            </tr>
  
            <tr class="amount-total">
              <th>Total</th>
              <td>R${number_format(res.amount_paid)}</td>
            </tr>
  
            <!-- You can use attribute data-hide-on-quote="true" to hide specific information on quotes.
                 For example Invoicebus doesn't need amount paid and amount due on quotes  -->
            <tr data-hide-on-quote="true">
              <th>Paid</th>
              <td>R${number_format(res.amount_paid)}0</td>
            </tr>
  
            <tr data-hide-on-quote="true">
              <th>Amount Due</th>
              <td>R0.00</td>
            </tr>
          </table>
  
          <div class="clearfix"></div>
        </section>
  
        <div class="clearfix"></div>
  
        <section id="invoice-info">
          <div><span>Issue Date :</span> <span>${new Date().toLocaleDateString()}</span></div>
          <br />
  
          <div><span>Currency :</span> <span>Rands</span></div>
        </section>
  
        <section id="terms" style="padding:0 20px;">
          <div class="notes" >
           <span style="text-transform:capitalize">${val.firstname}</span> , thank you very much. We really appreciate your business.
          
          </div>
  
          
        </section>
  
        <div class="clearfix"></div>
  
        <div class="thank-you">Thanks</div>
  
        <div class="clearfix"></div>
      </div>
    </body>
  </html>
  
  `;

 

  var mailOptions = {
    from: `payment@lfamarket.co.za`,
    to: `${val.email}`,
    subject: "Payment Receipt",
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
})
};

handleReferral = (data) => {
  User.findOne({ username: data.username.toLowerCase() }).exec((err, val) => {
    if (err) {
    } else {
      if (val.referral) {
        const refer = new Referral({
          username: val.referral,
          referral: data.username,
          amount: data.amount_paid * 0.01,
        });

        refer.save();
      }
    }
  });
};

checkStatus = () => {
  Proof.find().exec((err, data) => {
    var now = new Date();
    data.forEach((item) => {
      if (item.status == "active") {
        if (now > new Date(item.endDate)) {
          updateproof(item);
        } else {
          console.log("net yet");
        }
      }
    });
  });
};
updateproof = (val) => {
  Proof.findOneAndUpdate({ _id: val._id }, { status: "due" }, null, function (
    err,
    data
  ) {
    if (err) {
    } else {
    }
  });
};

updatepay = (req, res) => {
  Proof.findOneAndUpdate(
    { _id: req.params.id },
    { status: "paid" },
    null,
    function (err, data) {
      if (err) {
      } else {
      }
    }
  );
};

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + "").replace(",", "").replace(" ", "");
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    dec = typeof dec_point === "undefined" ? "." : dec_point,
    s = "",
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return "" + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
}

checkStatus();
