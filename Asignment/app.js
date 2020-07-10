var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileUpload = require('express-fileupload');
const session = require('express-session');

// import routes
var indexRouter = require('./routes/index');
var index02 = require('./routes/home2');
var index03 = require('./routes/home3');
var productRouter = require('./routes/product');
var shopingCart = require('./routes/shoping-cart');
var blog = require('./routes/blog');
var about = require('./routes/about');
var contact = require('./routes/contact');
var blogDetail = require('./routes/blogDetail');
var loginForm = require('./routes/loginRegis');
var logout = require('./routes/logout');
var productDetail = require('./routes/productDetail');

var admin = require('./routes/Admin/admin');
var formloginAD = require('./routes/Admin/loginAdmin');
var addProduct = require('./routes/Admin/addProduct.js');
var editProduct = require('./routes/Admin/editProduct.js');
var updateProduct = require('./routes/Admin/UpdateProduct.js');
var deleteProduct = require('./routes/Admin/DeleteProduct.js');
var addCategory = require('./routes/Admin/addCategory.js');
var addCategory = require('./routes/Admin/addCategory.js');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: true, 
  saveUninitialized: true, 
  secret: 'somesecret', 
  cookie: { }
}));


// Router client
app.use('/', indexRouter);
app.use('/home-02', index02);
app.use('/home-03', index03);
app.use('/product', productRouter);
app.use('/shoping-cart', shopingCart);
app.use('/blog', blog);
app.use('/about', about);
app.use('/contact', contact);
app.use('/product-detail', productDetail);
app.use('/blog-detail', blogDetail);
app.use('/loginForm', loginForm);
app.use('/logout', logout);
// Admin
app.use('/admin', admin);
app.use('/FormLoginAdmin', formloginAD);
app.use('/addProduct', addProduct);
app.use('/editProduct', editProduct);
app.use('/updateProduct', updateProduct);
app.use('/deleteProduct', deleteProduct);
app.use('/addCategory', addCategory);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
