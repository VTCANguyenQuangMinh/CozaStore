var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

mongoose.connection.on('connected', function(){
    console.log('Kết nối database thành công! âu dia');
}).on('error', function(){
    console.log('Có biến rồi, không kết nối được với database! Ò oE Ò oE Ò oE');
}).on('disconnected', function(){
    console.log('Mongoose default connection disconnected!');
})

process.on('SIGINT', function(){
    mongoose.connection.close(function(){
        console.log('Mongoose connection disconnected throw app termination');
        process.exit(0);
    })
})