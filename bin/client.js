import feathers from 'feathers';
import rabbitmq from '../src/client';
import memory from 'feathers-memory';
import cors from 'cors';
import hooks from 'feathers-hooks';
import bodyParser from 'body-parser';
import rest from 'feathers-rest/client';
const superagent = require('superagent');

console.log('here9098', process.env.DEBUG);

// console.log(rabbitmq());

const app = feathers()
            .options('*', cors())
            .use(cors())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({ extended: true }))
            .configure(hooks())
            .configure(rest('http://localhost:3001').superagent(superagent))
            .configure(rabbitmq({host: '127.0.0.1', appName: 'test'}));
            // .configure(services)


          // Initialize our service with any options it requires
    //   app.use('/todos', memory());
    // console.log(app);
      const todosService = app.service('todos');
      todosService.on('created',(todo) => console.log('created event', todo));


app.setup();
// const server = app.listen(3001);
//
// server.on('listening', () =>
//   console.log(`Feathers application started on :3001`)
// );
