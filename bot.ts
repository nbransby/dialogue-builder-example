import { DynamoDB } from 'aws-sdk'
import { Request } from 'claudia-api-builder'
import { Dialogue } from 'dialogue-builder'
import onboarding from './onboarding'
import builder = require('claudia-bot-builder')
import Message = builder.Message

export = builder(async (message: Message, apiRequest: Request) => {
    try {        
        const dynamo = new DynamoDB.DocumentClient();

        const storage = {
            async retrieve() {
                const user = await dynamo.get({
                    TableName: 'pointless-bot-users', 
                    Key: { fbid: message.sender }, 
                    ConsistentRead: true 
                }).promise();
                return user.Item && user.Item['state'];
            },
            async store(state: Object) { 
                await dynamo.put({ 
                    TableName: 'pointless-bot-users', 
                    Item: { fbid: message.sender, state: state }
                }).promise();
            }
        }

        const dialogue = new Dialogue(onboarding, storage, message.sender);

        dialogue.setKeywordHandler(['back', 'undo'], 'undo');
        dialogue.setKeywordHandler('reset', 'restart');

        return dialogue.consume(message).catch(() => ['I have said all I have to say']);

    } catch(error) {
        console.log(error);
        console.log(error.stack);
        return `${error} at ${error.stack}`;
    }
}, { platforms: ["facebook"] })
