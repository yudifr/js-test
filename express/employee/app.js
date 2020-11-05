const express = require('express');
const app = express();
const path = require('path');
const env = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const employeeRouter = require('./routes/employees');

env.config({
    path: './config.env'
});
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
const port = process.env.PORT;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session({
    secret: "nodenode",
    resave :true,
    saveUninitialized:true,
    
}));
app.use(flash());

//setting msg var global
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash(('success_msg'));
    res.locals.error_msg = req.flash(('error'));
    next();
});


app.use(employeeRouter);

app.listen(port, () => {
    console.log("noice");
});