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
}