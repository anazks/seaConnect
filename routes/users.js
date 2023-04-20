var express = require('express');
var router = express.Router();
var employeeModel = require('../model/employeeModel')
/* GET users listing. */
router.get('/home', function(req, res, next) {
 res.render('employee/home')
});
router.get('/Login', function(req, res, next) {
  res.render('employee/Login')
});
router.get('/Register', function(req, res, next) {
  res.render('employee/Regsiter')
});
router.post('/Register', function(req, res, next) {
  try {
    let employee = employeeModel.create(req.body);
    console.log("data insterted")
    res.redirect('/users/Login')
  } catch (error) {
    console.log(error)
  }
});

router.post('/Login', function(req, res, next) {
  try {
      let {email} = req.body;
      let {password} = req.body;
      let employee = employeeModel.find({email:email,password:password})
      if(employee){
        res.redirect('/users/home')
      }else{
        res.redirect('/users/Login')
      }
  } catch (error) {
    console.log(error)
  }
});
module.exports = router;
