const express = require('express');
const app = express();

const {mongoose} = require('./db/mongoose')

const bodyParser = require('body-parser');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:4200'); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// Load middleware
app.use(bodyParser.json());
app.use(express.json());

//Load in the mongoose models
const { List } = require('./db/models/list.model');
const { Task } = require('./db/models/task.model');

console.log(Task,'aaaaaaaa');


// Route Handlers

// List Routes

// Get /list
// Purpose: Get all lists

app.get('/lists', (req, res) => {
    console.log(List,'aaaaaaaa');
    // We want to return an array of all the lists in the database
    List.find({}).then((lists) => {
        res.send(lists);
    })
})

// POST /list
// Purpose: Create a list

app.post("/lists", async (req, res) => {
    console.log("Inside post",req.body.title);
  
    const data = new List({
      title: req.body.title
    });
  
    try {
      const val = await data.save();
      // To return the data
      res.json(val);
  
      // To return the message
    //   res.send("Data saved");
    } catch (error) {
      console.error("Error saving data:", error);
      res.status(500).send("Error saving data");
    }
  });

// put /lists/:id
// Purpose: Update a specified list
app.put('/lists/:id', (req, res) => {
    // We want to update the specific list (list document with id in the url) with the new values specified in the JSON body of the request
    List.findOneAndUpdate({_id:req.params.id}, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
})
  
  

// delete /lists/:id
// Purpose: Delete a specified list
app.delete('/lists/:id', (req, res) => {
    // We want to delete the specific list (list document with id in the url) with the new values specified in the JSON body of the request
    List.findOneAndRemove({
        _id:req.params.id
    }).then((removedListDoc) => {
        res.send(removedListDoc);
    });
})

app.get('/lists/:listId/tasks', (req, res) => {
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    })
});

app.post('/lists/:listId/tasks', (req, res) => {
    console.log("Inside post");

    const newTask = new Task({
        title: req.body.title,
        status: req.body.status,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc);
    })
})

// Second method to save the tasks
// app.post("/lists/:listId/tasks", async (req, res) => {
//     console.log("Inside post");
  
//     const data = new Task({
//         title: req.body.title,
//         _listId: req.params.listId
//     });
  
//     try {
//       const val = await data.save();
//       // To return the data
//       res.json(val);
  
//       // To return the message
//     //   res.send("Data saved");
//     } catch (error) {
//       console.error("Error saving data:", error);
//       res.status(500).send("Error saving data");
//     }
//   });


app.put('/lists/:listId/tasks/:taskId', (req, res) => {
    // We want to update the specific task (task document with id in the url) with the new values specified in the JSON body of the request
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
});

app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    // We want to delete the specific task (task document with id in the url) with the new values specified in the JSON body of the request
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedListDoc) => {
        res.send(removedListDoc);
    });
});

// to get one task according to taskid and listid
app.get('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((task) => {
        res.send(task);
    })
})

app.listen(3000, () => {
    console.log("server is up and running")
})