import feathers from 'feathers';
import rabbitmq from '../src';
import memory from 'feathers-memory';
import cors from 'cors';
import hooks from 'feathers-hooks';
import bodyParser from 'body-parser';
import rest from 'feathers-rest';

console.log(rabbitmq());

const app = feathers()
            .options('*', cors())
            .use(cors())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({ extended: true }))
            .configure(hooks())
            .configure(rest())
            .configure(rabbitmq({host: '127.0.0.1'}));
            // .configure(services)


          // Initialize our service with any options it requires
      app.use('/todos', memory());

      const todosService = app.service('todos');
      todosService.on('created',(todo) => console.log('created event', todo));
      todosService.on('created',(todo) => console.log('created event2', todo));

      setTimeout(() => {
          console.log('creating')
          todosService.create({test: 'data'}).then((result) => {
              console.log('gfsg');
          })
          todosService.patch('2',{test: 'data'}).then((result) => {
              console.log('gfsg');
          })
      },1000);

const server = app.listen(3001);

server.on('listening', () =>
  console.log(`Feathers application started on :3001`)
);
