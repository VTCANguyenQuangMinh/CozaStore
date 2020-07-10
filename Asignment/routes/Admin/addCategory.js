var express = require('express');
var router = express.Router();
var Category = require('../../models/categories')


var nameErr = '', Success = '';
var Name, descriptions;


router.post('/', function(req, res, next){
    nameErr = '', Success = '';
    Name = req.body.name;
    console.log(req.body)
    descriptions = req.body.descriptions;
    
    setTimeout(function(){
        Category.findAll(function(err, data){
    
            data.forEach(element => {
                if(element.name == Name && element.status == 'active')
                {
                    nameErr = 'this category has already exists!';
                }
            });
            
        })
    }, 0);
   

    if(Name == ''){
        nameErr = 'Name must be required!';
    }

    setTimeout(function(){
        if(nameErr == ''){
            var newCategory = new Category({
                name: Name,
                description: descriptions,
                status: 'active'
            });
    
            var promise = newCategory.save();
            Success = 'Success';
            promise.catch((err)=>{
                console.log('lỗi lưu category: '+err);
            })
            promise.then((post)=>{
                console.log('lưu category thành công'+post);
                
            })
        }
    }, 20);

    
    setTimeout(function(){
        res.render('Admin/addCategory', {
            Err: nameErr,
            success: Success,
            nameCate: Name,
            desCate: descriptions
        }); 
    }, 40);
    
});


router.get('/', function(req, res, next) {
    
    res.render('Admin/addCategory', {
        Err: nameErr,
        success: Success,
        nameCate: Name,
        desCate: descriptions
    });

});

module.exports = router;