const express = require('express');
const app = express();

const {mongoose} = require('./db/mongoose')

const bodyParser = require('body-parser');

// Load middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:4200'); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.json());
app.use(express.json());


let verifySession = (req, res, next) => {
    let refreshToken = req.header('x-refresh-token');
    let _id = req.header('_id');

    User.findByIdAndToken(_id, refreshToken)
    .then((user) => {
        if(!user){
            return Promise.reject({
                'error': 'User not found'
            });
        }

        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;

        let isSessionValid = false;

        user.sessions.forEach((session) => {
            if(session.token === refreshToken) {
                if(User.hasRefreshTokenExpired(session.expiresAt) === false) {
                    isSessionValid = true;
                }
            }
        });

        if(isSessionValid) {
            next();
        } else {
            return Promise.reject({
                'error': 'Refresh token expired'
            });
        }
    }).catch((e) => {
        res.status(401).send(e);
    })
}



//Load in the mongoose models
const { List } = require('./db/models/list.model');
const { Task } = require('./db/models/task.model');
const { User } = require('./db/models/user.model');

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

// signUp

app.post('/users', (req, res) => {
    let body = req.body;
    let newUser = new User(body);
    
    // console.log(newUser,'inside signup');
    newUser.save().then(() => {
        console.log("Inside then");
        return newUser.createSession();
    }).then((refreshToken) => {
        return newUser.generateAccessAuthToken().then((accessToken) => {
            return {accessToken, refreshToken}
        })
    }).then((authTokens) => {
        res
        .header('x-refresh-token', authTokens.refreshToken)
        .header('x-access-token', authTokens.accessToken)
        .send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

// login
app.post('/users/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    console.log(req.body,'inside login');


    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            return user.generateAccessAuthToken().then((accessToken) => {
                return {accessToken, refreshToken}
            });
        }).then((authToken) => {
            res
        .header('x-refresh-token', authToken.refreshToken)
        .header('x-access-token', authToken.accessToken)
        .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.get('/users/me/access-token', verifySession, (req, res) => {
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
    })
})

app.listen(3000, () => {
    console.log("server is up and running")
})