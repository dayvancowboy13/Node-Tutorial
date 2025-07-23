const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')


// express app
const app = express();

// connect to mongoDB
const dbURI = process.env.__MONGO_URL;
mongoose.connect(dbURI).then((result) => {
    console.log('Connected to DB');
    // listen for requests
    app.listen(3000);
    })
.catch((err)=>{console.log(err)});

// register view engine
app.set('view engine', 'ejs');


// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog2',
//         snippet: 'about my new blog',
//         body: 'details about my new blog'
//     });

//     blog.save()
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });
// });

// app.get('/all-blogs', (req,res) =>{
//     Blog.find()
//     .then((result)=>{
//         res.send(result);
//     })
//     .catch((err)=>{
//         console.log(err)
//     });
// });

// // find a single blog
// app.get('/single-blog', (req,res)=>{
//     Blog.findById('687fbd60b4ed6ea3c85ff4b7')
//     .then((result) =>{
//         res.send(result);
//     })
//     .catch((err) =>{
//         console.log(err);
//     })
// });
  
// routes
app.get('/', (req,res) =>{
    res.redirect('/blogs');
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   ];
    // res.render('index', { title: 'Home', blogs: blogs });
});

app.get('/about', (req,res) =>{
    res.render('about', { title: 'About' });
});

app.use('/blogs', blogRoutes);

// redirect
// app.get('/about-us', (req,res)=>{
//     res.redirect('/about');
// });

app.use((req,res) => {
    res.status(404).render('404', { title: '404' });
});