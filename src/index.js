// import rabbit from 'rabbot';
import Debug from 'debug';
const debug = Debug('feathers-rabbitmq:server');
import common from './common';
export class RabbitMQ{
    constructor(options){
        console.log('addaf');
    }

    setup(){
        console.log('adda');
    }
}
export default function rabbitmq (options) {
    return  async function () {
        console.log('adda',arguments);
        // let rabbit;
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

                for (let i = 0;i < app.services[key]._serviceEvents.length; i+=1){
                    const event = app.services[key]._serviceEvents[i];
                    await context.rabbit.addExchange(`feathers-${key}-${event}`,'topic', {});
                debug('Binding to service', key, 'for event', event);

                app.services[key].on(event, async (msg) => {
                    debug('Publishing a event to',`feathers-${key}-${event}`, msg);
                    const result = await context.rabbit.publish(`feathers-${key}-${event}`,
                {
                    routingKey: "",
                    type: 'test',
                    // correlationId: "one",
                    // contentType: "application/json",
                    body: msg,
                    // messageId: "100",
                    // expiresAfter: 10000 // TTL in ms, in this example 1 second
                    // timestamp: // posix timestamp (long)
                    // mandatory: true, //Must be set to true for onReturned to receive unqueued message
                    // headers: {
                        // random: "application specific value"
                    // },
                    // timeout: // ms to wait before cancelling the publish and rejecting the promise
                // },
                // connectionName: "" // another optional way to provide connection name if needed
                // );
            }).then(console.log).catch(console.trace);
                console.log(result);
                });
            }
        }
        }catch (e){
            console.error(e);
            throw(e);
        }
        }

// app.rest = wrappers;


    }
}
