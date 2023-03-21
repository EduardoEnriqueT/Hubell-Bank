const express = require('express');
const router = express.Router();
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const Localpassport= require('passport-local');
const User = require('./models/user')
const bcrypt = require('bcrypt');
const flash = require('connect-flash');
const session = require('express-session');
const { ensureAuthenticated } = require('./config/auth');

require('./config/passport')(passport);

const dbUrl =  'mongodb+srv://eduardo:J5E4pFsU9G2sKI53@cluster0.xaihz.mongodb.net/Cluster0?retryWrites=true&w=majority';

mongoose.connect(dbUrl, {
useNewUrlParser: true, 
useCreateIndex: true, 
useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

app.use(express.urlencoded({extended: true }))

app.use(express.json()) 
app.set ('view engine', 'ejs');
app.set ('views', path.join(__dirname, 'views'));
app.use("/style", express.static(__dirname + '/style'));
app.use("/img", express.static(__dirname + '/img'));
app.use("/js", express.static(__dirname + '/js'));



//express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));

  //Passport
  app.use(passport.initialize());
app.use(passport.session());


//Connect flash
  app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})

//Routes
app.get('/', (req,res) => {
    res.render('index')
})

app.get('/login', (req,res) => {
    res.render('login')
})

app.get('/register', (req,res) => {
    res.render('register')
})

app.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard',
{
    name: req.user.username,
    balance: req.user.balance,
    saving: req.user.saving
}
));


//Transaction
app.post('/transaction', (req, res) => {
    var a = balance;
    var b = saving;

    var c = a + b;

    c = saving;
    const User = new user({ saving })
    User.save();

});
//Register
app.post('/register', async (req,res) => {
 const { username, email, password, saving, balance} = req.body;
 let error = [];

 if(!username || !email || !password || !saving || !balance){
     error.push({msg: 'Please fill in all fields'})
 }

 if(error.length > 0) {
    res.render('register', {
        error,
        username,
        email,
        password,
        saving,
        balance
        
    })
 }else {
     User.findOne({email: email})
     .then(user => {
         if(user) {
             //user exist
             error.push({msg: 'Email is already registered.'});
             res.render('register', {
                error,
                username,
                email,
                password,
                balance,
                saving
            });
         } else {
            const newUser = new User({
                username,
                email,
                password,
                balance,
                saving
            });
            bcrypt.genSalt(12, (err, salt) => 
                bcrypt.hash(newUser.password, salt, (err,hash) => {
                   if(err) throw err;
                   
                   newUser.password = hash;

                   newUser.save()
                   .then(user => {
                       req.flash('seccess_msg', 'you are now registered and can log in');
                       res.redirect('login');
                   })
                   .catch(err => console.log(err));
            }))
         }
     });
 }
});

app.post('/login', async (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});




//logout

app.get('/logout', async (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
});

module.exports = router;
app.listen('3000', (req, res) => {
    console.log('Working on port 3000')
})



