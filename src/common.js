import rabbit from 'rabbot';
import Debug from 'debug';
const debug = Debug('feathers-rabbitmq:common');

export default async function common (options) {
            try {

            await  rabbit.configure({
                connection: {
                user: "guest",
                pass: "guest",
                server: [ "127.0.0.1" ],
                port: 5672,
                vhost: "%2f",
                timeout: 1000,
                failAfter: 30,
                retryLimit: 400
            },
        });
        return rabbit;

        }catch (e){
            console.error(e);
            throw(e);
        }
//         }
//
// // app.rest = wrappers;
//
//
//     }
}
