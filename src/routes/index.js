var express = require('express');
var router = express.Router();
const usersRouter = require('./user.route')

/* GET APP Details. */
router.get('/', function(req, res, next) {
  let response = {
    app_name:'Task Manager API',
    developers : [{
      name: 'Lakith Muthugala',
      git_repo: 'https://github.com/lakith',
      linkdin: 'https://lk.linkedin.com/in/lakith-muthugala-150532125',
      twitter: 'https://twitter.com/MuthugalaLakith',
      facebook: 'https://www.facebook.com/senila.muthugala/'
    }],
  }
  res.status(200).send(response);
});

router.get('/status', (req, res) => { res.send({status: 'OK'}) }) // api status
router.get('/health', (req, res) => { res.send({status: 'OK'}) }) // api status

router.use('/users', usersRouter); // user routes.

module.exports = router;
