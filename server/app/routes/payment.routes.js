const controller = require('../controllers/payment.controller')

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      app.post('/api/invest', controller.saveInvestment);
      app.post('/api/update-invest', controller.updatePayment);
      app.post('/api/make-payment', controller.makePayment);
       app.post('/api/get-investments', controller.getInvestments);
       app.post('/api/get-investment', controller.getInvestment);
       app.post('/api/save-proof', controller.saveProof);
       app.get('/api/get-referrals/:username', controller.getReferrals);
       app.get('/api/all-referrals', controller.allreferrals)
       app.get('/api/all-investors', controller.allinvestments)
       app.get('/api/all-payments',controller.getPayments)

       app.get('/api/get-invoices/:username',controller.getInvoices)

       app.get('/api/verify-payment/:id/:plan',controller.verifyproof)
       app.get('/api/unverify-payment/:id/:plan',controller.unverifyproof)
       app.get('/api/getmyplan/:id', controller.getmyplan)
}