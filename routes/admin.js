var express = require('express');
var router = express.Router();
var boatModel = require('../model/boat_Model')
var routeModel = require('../model/RouteModel')
var JurneyModel = require('../model/JurneyModel')
/* GET users listing. */
router.get('/', function(req, res, next) {
        res.render('admin/Login')
});
router.get('/home',(req,res)=>{
    res.render('admin/home')
})
router.post('/add-boat',(req,res)=>{
    try {
            let addBoat = boatModel.create(req.body)
            console.log("boatadded")
            res.redirect('/admin/home')
    } catch (error) {
            console.log(error)
    }
})
router.post('/add-route',(req,res)=>{
    try {
            let addRoute = routeModel.create(req.body)
            console.log("route added")
            res.redirect('/admin/home')
    } catch (error) {
            console.log(error)
    }
})
router.post('/add-jurney',(req,res)=>{
    try {
            let addRoute = JurneyModel.create(req.body)
            console.log("jurney added")
            res.redirect('/admin/home')
    } catch (error) {
            console.log(error)
    }
})
module.exports = router;
