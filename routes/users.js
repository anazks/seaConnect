var express = require('express');
var router = express.Router();
var employeeModel = require('../model/employeeModel')
var bookingModel = require('../model/bookingModel');
const { route } = require('.');
/* GET users listing. */
router.get('/home',async function(req, res, next) {
      try {
          let name = req.session.employee.userName;
          let empNme = req.session.employee.userName;
          let bookings = await bookingModel.find({employee:name});
          res.render('employee/home',{bookings})

           
      } catch (error) {
        console.log(error)
      }
});
router.get('/Login', function(req, res, next) {
  if(req.session.nouser){
    let alert = req.session.nouser;
    console.log(alert)
    res.render('employee/Login',{alert})
  }else{
    res.render('employee/Login')
  }
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

router.post('/Login', async function(req, res, next) {
  try {
      let {email} = req.body;
      let {password} = req.body;
      console.log(req.body,"req")
      let employee = await employeeModel.find({email:email,password:password})
      console.log(employee,"emloye");
      if(employee.length >0){
          req.session.employee = employee[0];
          console.log( req.session.employee ,"session emp")
        res.redirect('/users/home')
      }else{
        req.session.nouser = "userName or passwordincorrect";
        res.redirect('/users/Login')
      }
  } catch (error) {
    console.log(error)
  }
});
router.get('/profile',(req,res)=>{
  let employee = req.session.employee;
  res.render('employee/profile',{employee})
})
router.post('/location_add', async(req,res)=>{
      try {
          let locationUpdate = await bookingModel.findByIdAndUpdate({_id:req.body.id},{$set :{lati:req.body.lati,longti:req.body.longti}})
          res.redirect('/users/home')
      } catch (error) {
        console.log(error)
      }
})
router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/')
})
module.exports = router;
