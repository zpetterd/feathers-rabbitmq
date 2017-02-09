import Debug from 'debug';

import common from './common';
const debug = Debug('feathers-rabbitmq:client');

export default function (options){
    return  async function () {
        const app = this;

        app.use(function (req, res, next) {
            console.log('lkjkl');

            req.feathers = { provider: 'rabbitmq' };
            next();
        });
        const context = this;
        this.setup = async () => {
            try {
                context.rabbit = await common();

                for (let key in app.services){
                    const service = app.services[key];
                    // console.log(app.services[key]);
                    for (let i = 0;i < app.services[key]._serviceEvents.length; i+=1){
                        const event = app.services[key]._serviceEvents[i];
                        // console.log(event);


                await context.rabbit.addQueue(`feathers-${key}-${event}-${options.appName}`)
                await context.rabbit.bindQueue(`feathers-${key}-${event}`, `feathers-${key}-${event}-${options.appName}`);
                // app.services[key].on(event, async (msg) => {
                // debug(`Setup a handler for the queue`, `feathers-${key}-${event}` )
                var handler =  await context.rabbit.handle({queue: `feathers-${key}-${event}-${options.appName}`}, function( message ) {
                    console.log('sdfsajgbhfjgbfhsg');
                    try {
                        debug(`Got a message`, `feathers.${key}.${event}.${options.appName}`, message.body )
                        service.emit(event,message.body )
                        // do something meaningful?
                        message.ack();
                    } catch( err ) {
                        message.nack();
                    }
                } );

                 await context.rabbit.startSubscription(`feathers-${key}-${event}-${options.appName}`);
                console.log(handler);
                // console.log(sub);
//                     const result = await context.rabbit.publish(`feathers.${key}.${event}`,
// {
//     // routingKey: "hi",
//     // type: `feathers.${key}.${event}`,
//     // correlationId: "one",
//     contentType: "application/json",
//     body: msg,
//     // messageId: "100",
//     // expiresAfter: 10000 // TTL in ms, in this example 1 second
//     // timestamp: // posix timestamp (long)
//     // mandatory: true, //Must be set to true for onReturned to receive unqueued message
//     // headers: {
//         // random: "application specific value"
//     // },
//     // timeout: // ms to wait before cancelling the publish and rejecting the promise
// // },
// // connectionName: "" // another optional way to provide connection name if needed
// // );
// });
// console.log(result);
// });
}
}
            } catch(e){
                console.error(e);
            }
        }
    }

}
