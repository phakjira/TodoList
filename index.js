const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const TodoTask = require("./models/TodoTask");

dotenv.config();

app.use("/static", express.static("public")); 
app.use(express.urlencoded({extended: true}));

// view engine configure 
app.set("view engine", "ejs");

//connection to db
mongoose.set("useFindAndModify", false);
mongoose.set( "useUnifiedTopology", true );
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true}, ()=>{
    console.log("Connected to db!!! YAY!!!");
    app.listen(3000, ()=> console.log("Server is up and running ka"))
})


app.get('/', (req,res) =>{
    TodoTask.find({}, (err,tasks) =>{
        res.render('todo.ejs', {todoTasks: tasks});
    });
    // res.send('hi miss Jess!');
});

app.post('/', async (req,res)=>{
    console.log(req.body);
    const todoTask = new TodoTask({
        content: req.body.content
    });
    try{
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});

app.route("/edit/:id").get((req,res) =>{
    const id = req.params.id;
    console.log('get',req.params)
    TodoTask.find({}, (err, tasks) =>{
        res.render("todoEdit.ejs", {todoTasks: tasks, idTask: id});
    })
}).post((req,res)=>{
    const id = req.params.id;
    console.log('post',id)
    TodoTask.findByIdAndUpdate(id, { content: req.body.content}, err =>{
        if(err){
            return res.send(500,err);
        }
    })
});

app.route("/remove/:id").get((req,res) =>{
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err =>{
        if(err) return res.send(500, err);
        res.redirect('/');
    })
})
