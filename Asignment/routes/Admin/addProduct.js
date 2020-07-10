var express = require('express');
var router = express.Router();
var Category = require('../../models/categories')
var Product = require('../../models/products')
router.use(express.json())
router.use(express.urlencoded())

let nameErr, imgErr, priceErr, sizeErr, colorErr, categoriesErr;
let Success, check;
let Name, Descriptions, Price, size, sizeQ, color, colorQ, categories;
let objProduct = {
      
  name : Name,
  description : Descriptions,
  price: Price,

  errName : nameErr, 
  errImg : imgErr, 
  errPrice : priceErr, 
  errSize : sizeErr, 
  errColor : colorErr, 
  errCategories : categoriesErr,
  
  success: Success,
}

router.post('/', function(req, res, next){
  var imglinks = [];
  nameErr = '', Success = '', imgErr = '', check = '';
  priceErr = '', sizeErr='', colorErr='',categoriesErr = '';

  Name = req.body.name;
  let img = Object.values(req.files);

  var  sizeArr = [], colorArr = [];
  
  Price = req.body.price;
  Descriptions = req.body.descriptions;
  size = req.body.Size;
  sizeQ = req.body.SizeQ;
  color = req.body.Color;
  colorQ = req.body.ColorQ;
  categories = req.body.Categories;

    if(typeof(img[0][0])=="object")
    {
      img = Object.values(img[0]);
    }   
  
    //check name of product
    if(Name == ''){
      nameErr = 'Name must be required!';
      check = 'err';
    }
   
    Product.findProductByName(Name, (err,data)=>{
      if(err){console.log(err)};
      if(data.length != 0)
      {
        nameErr = 'this product has already exists!';
        check = 'err';
      }
    })
    

    //check file img
    img.forEach(E=>{
      if(E.mimetype != "image/jpg" && E.mimetype != "image/png" && E.mimetype != "image/jpeg") {
        imgErr = "File must be image! ";
        check = 'err';
        
      }
    })
    
    //check price
    if(isNaN(Price))
    {
      priceErr = 'Price must be a number!';
      check = 'err';
    }else if(Price < 0)
    {
      priceErr = 'Price cannot be negative!';
      check = 'err';
    }
    
    if(typeof(size)=='object'){
      
      size.forEach((E, index)=>{
        if(E == '')
        {
          sizeErr = 'name of size must not be empty';
          check = 'err';
        }else{
          sizeArr.push({});
          sizeArr[index].sizeName = E;
        }
      })
    }else{
      
      if(size == '')
      {
        sizeErr = 'name of size must not be empty';
        check = 'err';
      }else{
        sizeArr.push({});
       sizeArr[0].sizeName = size;
      }
      
    }

    if(typeof(sizeQ)=='object'){
      
      sizeQ.forEach((E, index)=>{
        if(E == '')
        {
          sizeErr = 'Quantity of size must not be empty';
          check = 'err';
        }else if(isNaN(E))
        {
          sizeErr = 'Quantity of size must be a number!';
          check = 'err';
        }else if(E < 0)
        {
          sizeErr = 'Quantity of size cannot be negative!';
          check = 'err';
        }

        if(check != 'err')
        {
          
          sizeArr[index].quantity = E;
        }
      })
    }else{
      
      if(sizeQ == '')
        {
          sizeErr = 'Quantity of size must not be empty';
          check = 'err';
        }else if(isNaN(sizeQ))
        {
          sizeErr = 'Quantity of size must be a number!';
          check = 'err';
        }else if(sizeQ < 0)
        {
          sizeErr = 'Quantity of size cannot be negative!';
          check = 'err';
        }
        if(check != 'err')
        {
          
          sizeArr[0].quantity = sizeQ;
        }
    }

    if(typeof(color)=='object'){
      color.forEach((E, index)=>{
        if(E == '')
        {
          colorErr = 'name of color must not be empty';
          check = 'err';
        }else{
          colorArr.push({});
          colorArr[index].colorName = E;
        }
      })
    }else{
      if(color == '')
        {
          colorErr = 'name of color must not be empty';
          check = 'err';
        }
        else{
          colorArr.push({});
          colorArr[0].colorName = color;
        }
    }
    
    if(typeof(colorQ)=='object'){
      colorQ.forEach((E, index)=>{
        if(E == '')
        {
          colorErr = 'Quantity of color must not be empty';
          check = 'err';
        }else if(isNaN(E))
        {
          colorErr = 'Quantity of color must be a number!';
          check = 'err';
        }else if(E < 0)
        {
          colorErr = 'Quantity of color cannot be negative!';
          check = 'err';
        }
        if(check != 'err')
        {

          colorArr[index].quantity = E;
        }
      })
    }else{
      if(colorQ == '')
        {
          colorErr = 'Quantity of color must not be empty';
          check = 'err';
        }else if(isNaN(colorQ))
        {
          colorErr = 'Quantity of color must be a number!';
          check = 'err';
        }else if(colorQ < 0)
        {
          colorErr = 'Quantity of color cannot be negative!';
          check = 'err';
        }
        if(check != 'err')
        {
          colorArr[0].quantity = colorQ;
        }
    }

    if(categories == undefined){     
      categoriesErr = 'Select at least one category!';
      check = 'err';
    }


    setTimeout(function(){

      if(check == '')
      {

        img.forEach((E, index)=>{
          E.name = Name+index;
          
          imglinks.push(E.name+'.jpg');

          E.mv(__dirname + '/../../public/pictures/' + E.name + '.jpg', function(err){
            if(err){
              console.log('upload file fail ' + err);
            }
          })
        })


        var newProduct = new Product({
          name: Name,
          price: Price,
          description: Descriptions,
          size: sizeArr,
          color: colorArr,
          status: 'active',
          imgLink: imglinks,
          categories: categories
        });

        var promise = newProduct.save();
        
        promise.catch((err)=>{
            console.log('lỗi lưu product: '+err);
        })
        promise.then((post)=>{
          console.log('lưu product thành công'+post);
          Success = 'Success';
          Name = '';
          Descriptions = ''; 
          Price = '';
        })
      }
    }, 100);

    
    function createObj(){
      return  objProduct = {
      
        name : Name,
        description : Descriptions,
        price: Price,

        errName : nameErr, 
        errImg : imgErr, 
        errPrice : priceErr, 
        errSize : sizeErr, 
        errColor : colorErr, 
        errCategories : categoriesErr,
        
        success: Success,
      }
    }
      

     setTimeout(()=>{
       createObj();
     }, 195)


    setTimeout(function(){

      Category.findAll((err, data)=>{
        res.render('Admin/addProduct', {
          objForm : objProduct,
          Category: data
        }); 
      })
    }, 200);
    
});


router.get('/', function(req, res, next) {

  setTimeout(function(){
    Category.findAll((err, data)=>{
      res.render('Admin/addProduct', {
        objForm : objProduct,
        Category: data
      }); 
    })
  }, 120);

});

module.exports = router;