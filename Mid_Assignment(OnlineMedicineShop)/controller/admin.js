const express = require("express");
const userModel = require.main.require("./models/userModel");
const medicineModel = require.main.require("./models/medicineModel");
const router = express.Router();

router.get('/', (req, res)=>{
  if(req.session.user != null){
    res.render('admin/index');
  }else{
    res.redirect('/login');
  }
})

router.get('/profile', (req, res)=>{
	var id = req.cookies['id'];
    //res.send(data);
    userModel.getById(id, function(results){
		console.log(results);
        res.render('admin/profile', {userlist : results});
    });
	
});
router.get('/editProfile', (req, res)=>{
  var id = req.cookies['id'];
    //res.send(data);
    userModel.getById(id, function(results){
    console.log(results);
        res.render('admin/editProfile', {userlist : results});
    });
  
});

router.post('/editProfile',(req,res)=>{
  var user = {
    name     : req.body.name,
    userName : req.body.userName,
    email    : req.body.email,
    password : req.body.password,
    image    : req.body.image,
    id       : req.cookies['id']
  }
  userModel.updateUser(user,function(status){
    if (status) {
      res.redirect('/admin/Profile');
    }else{
      res.redirect('/admin/editProfile?sql_error!!');
    }
  });
});

router.get('/allCustomer', (req, res)=>{
  userModel.getAll(function(results){
    console.log(results);
    res.render('admin/allCustomer', {cuslist: results});
  });
});


router.get('/deleteCustomer/:id', (req, res)=>{
  var data = req.params.id;
  userModel.getById(data,function(results){
    console.log(results);
    res.render('admin/deleteCustomer', {cuslist: results});
  });
});

router.post('/deleteCustomer/:id',(req,res)=>{
  var data = req.params.id;
  userModel.delete(data,function(status){
    if (status) {
      res.redirect('/admin/allCustomer');
    }else{
      res.redirect('/admin/deleteCustomer/:id?sql_error!!');
    }
  });
});

router.get('/allMedicine', (req, res)=>{
  medicineModel.getAll(function(results){
    console.log(results);
    res.render('admin/allMedicine', {medlist: results});
  });
});

router.get('/deleteMedicine/:id', (req, res)=>{
  var data = req.params.id;
  medicineModel.getAllById(data,function(results){
    console.log(results);
    res.render('admin/deleteMedicine', {medlist: results});
  });
});

router.post('/deleteMedicine/:id',(req,res)=>{
  var data = req.params.id;
  medicineModel.delete(data,function(status){
    if (status) {
      res.redirect('/admin/allMedicine');
    }else{
      res.redirect('/admin/deleteMedicine/:id?sql_error!!');
    }
  });
});

router.get('/editMedicine/:id', (req, res)=>{
  var data = req.params.id;
  medicineModel.getAllById(data,function(results){
    console.log(results);
    res.render('admin/editMedicine', {medlist: results});
  });
});

router.post('/editMedicine/:id',(req,res)=>{
  var user = {
    name         : req.body.name,
    vendorName   : req.body.vendorName,
    price        : req.body.price,
    segmentation : req.body.segmentation,
    genre        : req.body.genre,
    amount       : req.body.amount,
    id           : req.params.id
  }

  medicineModel.update(user,function(status){
    if (status) {
      res.redirect('/admin/allMedicine');
    }else{
      res.redirect('/admin/editMedicine/:id?sql_error!!');
    }
  });
});

router.get('/addMedicine', (req, res)=>{
    res.render('admin/addMedicine');
});

router.post('/addMedicine/:id',(req,res)=>{
  var user = {
    name         : req.body.name,
    vendorName   : req.body.vendorName,
    price        : req.body.price,
    segmentation : req.body.segmentation,
    genre        : req.body.genre,
    amount       : req.body.amount
  }

  medicineModel.insert(user,function(status){
    if (status) {
      res.redirect('/admin/allMedicine');
    }else{
      res.redirect('/admin/addMedicine/:id?sql_error!!');
    }
  });
});


 


module.exports = router;
