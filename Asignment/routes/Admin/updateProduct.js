var express = require('express');
var fs = require('fs');
var router = express.Router();
var Category = require('../../models/categories');
var Product = require('../../models/products');



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

router.post('/:id',function(req, res, next){

  var PrId = req.params.id.slice(1);
  var imglinks = [];
  nameErr = '', Success = '', imgErr = '', check = '';
  priceErr = '', sizeErr='', colorErr='',categoriesErr = '';

  Name = req.body.name;
  Price = req.body.price;
  Descriptions = req.body.descriptions;
  size = req.body.Size;
  sizeQ = req.body.SizeQ;
  color = req.body.Color;
  colorQ = req.body.ColorQ;
  categories = req.body.Categories;

  var  sizeArr = [], colorArr = [];
 
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

  
  Product.findProductByID(PrId, (err, dataPr)=>{

    if(Name == ''){
      nameErr = 'Name must be required!';
      check = 'err';
    }
  
    Product.findProductByName(Name, (err,data)=>{
      if(err){console.log(err)};
      if(data.length != 0  &&  data[0].name != dataPr.name)
      {
        nameErr = 'this product has already exists!';
        check = 'err';
      }
    })

    setTimeout(()=>{
      if(check == '')
      {

        if(req.files == null)
        {
          dataPr.imgLink.forEach((E, index)=>{       
            imglinks.push(Name+index+'.jpg');
            fs.rename(__dirname + '/../../public/pictures/' + E, __dirname + '/../../public/pictures/' + Name + index + '.jpg', (err) => {
              if (err) throw err;
              console.log('Rename complete!');
            });
          })
        }else{
          dataPr.imgLink.forEach(E=>{
            fs.unlink(__dirname + '/../../public/pictures/' + E, (err) => {
              if (err) throw err;
              console.log('successfully deleted /tmp/hello');
            });
          })

          let img = Object.values(req.files);
          if(typeof(img[0][0])=="object")
          {
            img = Object.values(img[0]);
          }
 
          img.forEach((E, index)=>{


            E.name = Name+index;
            
            imglinks.push(E.name+'.jpg');
  
            E.mv(__dirname + '/../../public/pictures/' + E.name + '.jpg', function(err){
              if(err){
                console.log('upload file fail ' + err);
              }
            })
          })

        }

          update ={
            name: Name,
            price: Price,
            description: Descriptions,
            size: sizeArr,
            color: colorArr,
            status: 'active',
            imgLink: imglinks,
            categories: categories
          }
          console.log(update.name)
          Product.findOneAndUpdate({_id:PrId}, update, ()=>{});
          Success = 'Success';
      }
    }, 100)
      
    setTimeout(function(){
      Category.findAll((err, dataCate)=>{
        objProduct = {
  
            name : dataPr.name,
            description : dataPr.description,
            price: dataPr.price,

            errName : nameErr, 
            errImg : imgErr, 
            errPrice : priceErr, 
            errSize : sizeErr, 
            errColor : colorErr, 
            errCategories : categoriesErr,
            
            success: Success,
          }

        res.render('Admin/updateProduct', {
          objForm : objProduct,
          Category: dataCate,
          productOri: dataPr
        }); 
      })
    }, 120)
  
    })

})


router.get('/:id', function(req, res, next) {
    var PrId = req.params.id.slice(1);
    Product.findProductByID(PrId, (err, dataPr)=>{
    
      Category.findAll((err, dataCate)=>{
          objProduct = {
              name : dataPr.name,
              description : dataPr.description,
              price: dataPr.price,
            
              errName : nameErr, 
              errImg : imgErr, 
              errPrice : priceErr, 
              errSize : sizeErr, 
              errColor : colorErr, 
              errCategories : categoriesErr,
              
              success: Success,
            }

          res.render('Admin/updateProduct', {
            objForm : objProduct,
            Category: dataCate,
            productOri: dataPr
          }); 
      })
    })
  
});

module.exports = router;