var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
        res.render('admin/Login')
});
router.get('/home',(req,res)=>{
    res.render('admin/home')
})
module.exports = router;
