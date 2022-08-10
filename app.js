const express = require('express')
const path = require("path")
const app = express()
const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri"];


app.listen(3000, (err) => {
    if (err) {
        console.log('Server not running')
    }
    else console.log('Server listening on port 3000...')
})

// Load View Engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", 'ejs')


app.get('/',(req, res) => {
    res.render('home')
})
app.get('/contact',(req, res) => {
    res.render('contact')
})
app.get('/services',(req, res) => {
    res.render('services')
});

app.use(express.static("public"));

app.use((req, res, next) => {
    let currentDay = Date().slice(0,3);
    for(let i=0; i < daysList.length; i++) {
        if(currentDay !== daysList[i]) {
            in_days = false;
        }
        else {
            in_days = true;
            break;
        }
    }
    if(in_days) {
        next();
    }
    else res.render('offline')
});

// error-handling middleware
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.get('/', (req, res, next) => {
    next(new Error('Retrieving error!'))
});
