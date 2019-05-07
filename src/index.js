const express = require('express');
// connect to mongoose
require('./db/mongoose');

const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   if (req.method === 'GET') {
//     res.send('GET requests are disabled');
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   res.status(503).send('Site is under maintenance, please come back later');
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});

const main = async () => {
  // const task = await Task.findById('5cd1df9417e3ff3eab2b29d3');
  // await task.populate('owner').execPopulate();
  // console.log(task.owner);

  const user = await User.findById('5cd1dd858480333d9a9ce386');
  await user.populate('tasks').execPopulate();
  console.log(user.tasks);
};

main();
