const mongoose = require('mongoose');

const TaskSchema = {
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    status: {
        type: Boolean,
        required: true,
        minlength: 1,
        trim: true
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}

const Task = mongoose.model('TASK', TaskSchema);

// const sch = {
//     name: String,
//     email: String,
//     id: Number,
//   };
  
//   const Task = mongoose.model("TASK", sch);

module.exports = {Task}