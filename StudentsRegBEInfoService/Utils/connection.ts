import amqp from "amqplib"
const amqpServer = "amqp://localhost:5672";

let channel : any;
let connects : any;
let result : any;

const myConnection = async (queue : string , data : any) => {
    try {
        connects = await amqp.connect(amqpServer);
        channel = await connects.createChannel();

        await channel.sendToQueue(queue , Buffer.from(JSON.stringify(data)))
    } catch (error) {
        console.log(error);
    }
}

export {myConnection , connects , channel , result}