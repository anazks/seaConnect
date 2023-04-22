var express = require('express');
var router = express.Router();
let jurneyModel= require('../model/JurneyModel')
let userMode = require("../model/userModel")
let bookinModel = require('../model/bookingModel');
const bookingModel = require('../model/bookingModel');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/Register', function(req, res, next) {
  res.render('user/Register');
});
router.get('/Login', function(req, res, next) {
  res.render('user/Login');
});
router.post('/Login', async(req,res)=>{
  try {
    let {email} = req.body;
    let {password} = req.body;
    let userData = await userMode.find({email:email,password:password})
    console.log(userData)
    if(userData){
        req.session.user = userData[0];
      res.redirect('/home')
    }else{
      res.redirect('/Login')
    }
} catch (error) {
  console.log(error)
}
})
router.post('/Register',async(req,res)=>{
  try {
    let user = await userMode.create(req.body);
    console.log("data insterted")
    res.redirect('/Login')
  } catch (error) {
    console.log(error)
  }
})
router.get('/Home',async function(req, res, next) {
      try {
          let jurneys = await jurneyModel.find();
          console.log(jurneys)
            if(req.session.user){
              let user = req.session.user;
              console.log(user,"seesiondata")
              res.render('user/Home',{jurneys,user});
            }
         
      } catch (error) {
        console.log(error)
      }
 
});
router.get('/checkSeats/:id',async function(req, res, next) {
  try {
    let id = req.params.id
      let jurneys = await jurneyModel.find({_id:id});
      console.log(jurneys)
      res.render('user/bookNow',{jurneys});
  } catch (error) {
    console.log(error)
  }

});
router.post('/book_Now', async(req,res)=>{
      try {
        console.log(req.body)
            let userId = req.session.user._id;
            let userName= req.session.user.userName;
           req.body.userId =userId;
           req.body.userName=userName;
          console.log(req.body,"for db")
            var availableSeat =parseInt(req.body.availableSeat);
            var ticket = req.body.tickets
            var newSeat = availableSeat - ticket;
            console.log(newSeat,"new seat")
            let bookings = await bookinModel.create(req.body)
            console.log(bookings._id,"booking id")
            let bookingID =bookings._id;
            let  jurneyId= req.body.jurneyId;
            var {rate} = req.body;
              amount = ticket * rate;
            res.render('user/paynent',{amount,bookingID,newSeat,jurneyId})
      } catch (error) {
          console.log(error)
      }   
})
router.post('/confirmBooking',async(req,res)=>{
      try {
            var {amount}= req.body;
            var {id} = req.body;
            var {newseat} = req.body;
            var {jurneyId} = req.body;
            console.log(newseat,"definded")
            let paymentDOne = await bookinModel.findByIdAndUpdate({_id:id},{$set :{status:"payed",payment:amount}})
            let newSeatUpadtion = await jurneyModel.findByIdAndUpdate({_id:jurneyId},{$set :{availableSeat:newseat}})
            res.redirect('/home')
      } catch (error) {
          console.log(error)
      }
})
router.get('/myBookings',  async(req,res)=>{
        try {
              console.log(req.session.user._id)
              var bookings = await bookingModel.find({userId:req.session.user._id});
              console.log(bookings,"bookingss...")
              res.render('user/myBookings',{bookings})
        } catch (error) {
                console.log(error)
        }
 
})
router.get('/logout',(req,res)=>{
    req.session.user.destroy();
    res.redirect('/login')
})
module.exports = router;
