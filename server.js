const express = require('express')
const bodyParser = require ('body-parser')
const basicAuth = require ('express-basic-auth')


const app = express();
const PORT = 4000;

app.use(bodyParser.json());


let tasks =[
    {id:1 , title:'Task1' ,description:'Description for Task 1'},
    {id:2,title:'Task2' ,description:'Description for Task 2'}
];


const validateTask=(req ,res , next)=>{
    const {title,description} = req.body;
    

    if(!title || !description){
        return res.status(400).json ({error:'title and description are required.'})
    }

    next();
};


app.use(
    basicAuth({
      users: { 'Azhar': '123456' }, // Hardcoded username and password for demo
      challenge: true,
      unauthorizedResponse: 'Unauthorized access.'
    })
  );


  app.use('/tasks', (req, res, next) => {
    const { page, pageSize, sortBy, sortOrder, filter } = req.query;
  
    // Pagination
    const startIndex = (page - 1) * pageSize || 0;
    const endIndex = startIndex + (pageSize || tasks.length);
    const paginatedTasks = tasks.slice(startIndex, endIndex);
  
    // Sorting
    if (sortBy && sortOrder) {
      paginatedTasks.sort((a, b) => {
        const order = sortOrder === 'asc' ? 1 : -1;
        return a[sortBy] > b[sortBy] ? order : -order;
      });
    }


    
  // Filtering
  const filteredTasks = filter
  ? paginatedTasks.filter(task => task.title.toLowerCase().includes(filter.toLowerCase()))
  : paginatedTasks;

req.paginatedTasks = filteredTasks;
console.log(filteredTasks)
next();
});


app.get('/tasks', (req, res) => {
    res.status(200).json({
      page: req.query.page || 1,
      pageSize: req.query.pageSize || tasks.length,
      totalPages: Math.ceil(tasks.length / (req.query.pageSize || tasks.length)),
      tasks: req.paginatedTasks,
    });
  });




app.get('/tasks/:id',(req ,res)=>{
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task =>task.id===taskId);

     if(!task){
        return res.status(404).json({erorr:'Task not found.'});
    }

    res.status(200).json(task);
});




app.post('/tasks',validateTask ,(req,res)=>{
    const {title ,description} =req.body
    const newTask = {id:tasks.length+1 ,title , description};
    tasks.push(newTask);

    res.status(201).json(newTask);
});




app.put('/tasks/:id',validateTask,(req,res)=>{
    const taskId =parseInt(req.params.id);
    const updateTask= req.body;
    const index =tasks.findIndex(task=>task.id ===taskId);


    if (index === -1) {
        return res.status(404).json({error:'Task Not Found'})
    }

    tasks[index] = {...tasks[index],...updateTask};

    res.status(200).json(tasks[index])

})




app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex(task => task.id === taskId);

    if (index === -1){
        return res.status(404).json({error:'Task Not Found'});
    }

    const deleteTask =tasks.splice(index, 1);
    res.status(200).json({message:'Task delete successfully .' ,deleteTask});
})



app.use((err ,req ,res , next)=>{
    console.log(err.stack);
    res.status(500).json({error:'somthing went wrong!'})
});



app.listen(PORT ,()=>{
    console.log('Server is running on http://localhost:${PORT}');
});

