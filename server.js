const express = require('express');
const dbConfig = require('./app/config/db.config')
const db = require('./app/models')
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const expSession = require('express-session');
const helpers = require('./utils/helpers');
const hbs = require('express-handlebars');

const { response } = require('express');
const exphbs = hbs.create({helpers});
// mongodb connection
db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log(`successfuly connected to ${dbConfig.DB}`)
}).catch((err)=>{
    console.log(`Connection error : ${err}`)
    process.exit()
})

// cors setup
const corsOption={
    origin:"http://localhost:8080"
}
app.use(cors(corsOption))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,"public")))

// session setup
app.use(expSession({
    name:'EMS-session',
    secret:`my-secret-session`,
    resave:true,
    saveUninitialized:true,
    cookie:{}
}))
//user interface template setting
app.engine("handlebars",exphbs.engine);
app.set("view engine","handlebars");

// routes
app.get('/',(req,res)=>{
    res.render('index',{layout:false});
})
app.get('/staff-signin',(req,res)=>{
    res.render('staff-signin',{layout:false});
})
app.get('/manager-signin',(req,res)=>{
    res.render('manager-signin',{layout:false});
})
app.get('/staff-signup',(req,res)=>{
    res.render('staff-signup',{isManager:req.session.isManager});
})
app.get('/manager-signup',(req,res)=>{
    if(req.session.isLoggedIn){
        res.render('manager-signup',{isManager:req.session.isManager});    
    }
    else{
        res.render('manager-signup',{layout:false});
    }
    
})
app.get('/add-shift',(req,res)=>{
    res.render('add-shift',{isManager:req.session.isManager});
})
app.get('/add-availability',(req,res)=>{
    res.render('add-availability',{isManager:req.session.isManager})
})
require('./app/routes/common.route')(app);
require('./app/routes/manager.route')(app);
require('./app/routes/staff.route')(app);

// server setup
const PORT= process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})