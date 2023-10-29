const TodoLists = require('../models/todo_db');

// function for redirecting to main home page
module.exports.home = function(req,res){
    // fetching using mongoose
    TodoLists.find({})
    .then(todoList => {
        res.render('home', {
            todoList: todoList
        });
    })
    .catch(error => {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'An error occurred' });
    });
}

// function for new Data
function DateValue(dueDate){
    let months = ['jan','feb','mar','Apr','May','june','july','aug','sept','oct','nov','dec'] // static value for implementing monthe value


    newdate = '';
    let monapp = '';
    // checking months 
    if(dueDate[1] == '01'){
        monapp=months[0];
    }
    else if(dueDate[1] == '02'){
        monapp=months[1];
    }else if(dueDate[1] == '03'){
        monapp=months[2];
    }else if(dueDate[1] == '04'){
        monapp=months[3];
    }else if(dueDate[1] == '04'){
        monapp=months[3];
    }else if(dueDate[1] == '05'){
        monapp=months[4];
    }else if(dueDate[1] == '06'){
        monapp=months[5];
    }else if(dueDate[1] == '07'){
        monapp=months[6];
    }else if(dueDate[1] == '08'){
        monapp=months[7];
    }else if(dueDate[1] == '09'){
        monapp=months[8];
    }else if(dueDate[1] == '10'){
        monapp=months[9];
    }else if(dueDate[1] == '11'){
        monapp=months[10];
    }else if(dueDate[1] == '12'){
        monapp=months[11];
    }
    newdate =dueDate[2]+'-'+monapp+'-'+dueDate[0] // displaying date in dd-mm-yyyy format
    return newdate;
}

// function for creating toto list
module.exports.createTodo = function(req,res){
    dueDate =req.body.dateValue.split('-')    // splitting date and taking montha value
   let newdate='';
    newdate= DateValue(dueDate);     
    TodoLists.create({
        desc: req.body.desc,
        category: req.body.category,
        dueDate: newdate
    })
    .then((newArr) => {
        // Successfully created a new document
        console.log(newArr)
        return res.redirect('/');
    })
    .catch((err) => {
        console.log('Oops, an error occurred:', err);
        return res.status(500).json({ error: 'An error occurred' });
    });
    
}

// function for deleting todo list
module.exports.deleteTodo = async function(req,res){ 
    
    try {
        const sp = req.query.id; // getting the id from the query parameters
        if(sp != undefined){
        console.log("sp"+sp)
        const newsp = sp.split(',');
        console.log("newsp"+newsp);
        // Use a loop to delete each item
        for (let i = 0; i < newsp.length; i++) {
            // Use `await` to ensure the delete operation is complete before moving to the next iteration
            
            console.log('deleted'+newsp[i]);
            await TodoLists.findByIdAndDelete(newsp[i]);
            
        }
        
        return res.redirect('/');
    }
    else return res.redirect('/');
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred' });
    }
}

