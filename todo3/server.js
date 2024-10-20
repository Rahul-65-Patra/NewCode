const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');


app.use(express.urlencoded({extended:true}))
const staticPath = path.join(__dirname)
app.use(express.static(staticPath))

app.get('/',(req,res)=>{
  res.sendFile(`${staticPath}/index.html`)
})

app.post('/updateTask', (req, res) => {
  const { taskid, status } = req.body;

  fs.readFile('todo.json', 'utf-8', (err, data) => {
      
      let tasks = JSON.parse(data);
      let taskIndex = tasks.findIndex(task => task.taskId === parseInt(taskid));

      if (taskIndex === -1) {
          return res.json({ success: false, message: 'Task ID not found' });
      }
      tasks[taskIndex].status = status;

      fs.writeFile('todo.json', JSON.stringify(tasks, null, 2), 'utf-8', (err) => {
          res.json({ success: true, message: 'Task status updated successfully' });
      });
  });
});


app.listen(2000,()=>{
  console.log('Server running on port 2000')
})