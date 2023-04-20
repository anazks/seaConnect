var express = require('express');
var router = express.Router();
var boatModel = require('../model/boat_Model')
var routeModel = require('../model/RouteModel')
var JurneyModel = require('../model/JurneyModel')
let employeeModel =  require('../model/employeeModel')
/* GET users listing. */
router.get('/', function(req, res, next) {
        res.render('admin/Login')
});
router.get('/home',async (req,res)=>{
        try {
                let employee = await  employeeModel.find();
                let Employees = await employeeModel.find();
                let routes = await routeModel.find();
                let boats = await boatModel.find();
                let jurney = await JurneyModel.find();
                console.log(employee,"hia") 
                res.render('admin/home',{employee,Employees,boats,routes,jurney})
        } catch (error) {
                
        }
 
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
router.post('/add-jurney',async(req,res)=>{
    try {
                let availableSeat =  req.body.Seat;
                req.body.availableSeat=availableSeat;
            let addRoute = await JurneyModel.create(req.body)
            console.log("jurney added")
            res.redirect('/admin/home')
    } catch (error) {
            console.log(error)
    }
})
router.get('/approve/:id', async(req,res)=>{
        try {
               let Uid = req.params.id;
              
               let approved = await employeeModel.findByIdAndUpdate({_id:Uid},{$set :{status:"Approved"}})
               console.log("Approved")
               res.redirect('/admin/home')
        } catch (error) {
                console.log(error)
        }
    })

    router.get('/delete/:id', async(req,res)=>{
        try {
               let Uid = req.params.id;
              
               let approved = await JurneyModel.findByIdAndDelete({_id:Uid})
               console.log("deleted")
               res.redirect('/admin/home')
        } catch (error) {
                console.log(error)
        }
    })
module.exports = router;
