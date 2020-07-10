var express = require('express');
var router = express.Router();
var customer = require('../models/customers');
var product = require('../models/products');

/* GET home page. */
router.post('/', function(req, res, next) {
  var formErr , formRegisErr, checkErr = '';
  var Cartproducts = [], Wishlishproducts = [] , emailErr = '';
  var passLog = '', pass = '', newCustomer = new customer();

  if(req.body.typeForm == 'login')
  {
    customer.findAll((err, data)=>{
      data.forEach(E=>{
        if(E.email == req.body.uname && E.password == req.body.pwd)
        {
          checkErr = 'FINDED';
          newCustomer = E;
        }
        
      }) 
    });

    setTimeout(() => {
      if(checkErr != 'FINDED')
      {
        formErr = 'Email or password is not correct!';
      }else{
        newCustomer.cart.forEach(E=>{

          product.findProductByIDCus(E.productID, (err, data)=>{
            var oldCart = {}
     
            oldCart.color = E.color;
            
            oldCart.size = E.size;
            oldCart.quantity = E.quantity;
            oldCart.img = data.imgLink;
            oldCart.idPr = data._id;
            oldCart.name = data.name;
            oldCart.price = data.price;
            oldCart.description = data.description;
            Cartproducts.push(oldCart);
          })
        })
        newCustomer.wishlish.forEach(E=>{
          product.findProductByIDCus(E, (err, data)=>{
            Wishlishproducts.push(data);
          })
        })

        setTimeout(() => {
          req.session.User = ({
            id: newCustomer._id,
            name : newCustomer.name,
            email: newCustomer.email,
            cart : Cartproducts,
            wishlish : Wishlishproducts
          });

          console.log(req.session.User);
          console.log(req.session.User.quantity * req.session.User.price);
        }, 90);
       
        passLog = 'Log in successful'
      }
    }, 100);
  }else if(req.body.typeForm == 'regis')
  {
    newCustomer.name = req.body.name;
    customer.findAll((err, data)=>{
      data.forEach(E=>{

        if(E.email == req.body.email)
        {
          emailErr = 'This e-mail is already used!';
          formRegisErr = 'err';
        }
      })
      
    });

    setTimeout(() => {
      if(emailErr == '')
      {
        newCustomer.email = req.body.email;
        
      }
    }, 50);
    newCustomer.address = req.body.address;
    newCustomer.password = req.body.pass;

    setTimeout(() => {
      if(formRegisErr != 'err')
      {
        
        var promise = newCustomer.save();
        
        promise.catch((err)=>{
            console.log('lỗi lưu customer: '+err);
        })
        promise.then((post)=>{
          console.log('lưu customer thành công'+post);
          pass = 'Success';
        })
      }
    }, 100);
  }

  setTimeout(function(){
    res.render('login_form', { 
      EmailErr:emailErr,
      sucess: pass,
      loginErr:formErr,
      sucessLogin:passLog
    });

  }, 200);

});

router.get('/', function(req, res, next){

  res.render('login_form', { 
    EmailErr:'',
    sucess: '',
    loginErr:'',
    sucessLogin:''
  });
})

module.exports = router;