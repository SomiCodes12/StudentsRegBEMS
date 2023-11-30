import amqp from "amqplib"
import {PrismaClient} from "@prisma/client"

const amqpServer = "amqp://localhost:5672"
const prisma = new PrismaClient()

export const myConnection = async (queue : any) => {
    try {
        
    const connect = await amqp.connect(amqpServer);
    const channel = await connect.createChannel();

    await channel.assertQueue(queue);
    channel.consume(queue , async (message : any) => {
        let res = JSON.parse(message.content.toString());

        const user = prisma.authModel.findUnique({
            where : {
                id : res?.userID
            }
        });

        user?.details?.push(res)

        const info = prisma.authModel.update({
            where : {id : res?.userID},
            data : {
                details : user?.details
            }
        });
        await channel.ack(message)
    });
    } catch (error) {
        console.log(error);
    }
}