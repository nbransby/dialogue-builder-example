import { DynamoDB } from 'aws-sdk'
import { Request } from 'claudia-api-builder';
import { Dialogue } from 'dialogue-builder'
import onboarding from './onboarding'
import builder = require('claudia-bot-builder');
import Message = builder.Message

export = builder(async (message: Message, apiRequest: Request) => {
    try {        
        apiRequest.lambdaContext.callbackWaitsForEmptyEventLoop = true;

        const dynamo = new DynamoDB.DocumentClient();

        const user = (await dynamo.get({
            TableName: 'pointless-bot-users', 
            Key: { fbid: message.sender }, 
            ConsistentRead: true 
        }).promise()).Item;

        const dialogue = new Dialogue(onboarding, {
            retrieve: () => user && user['state'],
            store: (state: Object) => dynamo.put({ 
                TableName: 'pointless-bot-users', 
                Item: { fbid: message.sender, state: state }
            }, () => {} )
        }, message.sender);

        dialogue.setKeywordHandler(['back', 'undo'], 'undo');
        dialogue.setKeywordHandler('reset', 'restart');

        const messages = dialogue.consume(message);
        if(dialogue.isComplete) {
            //do something
        }
        return messages;
    } catch(error) {
        console.log(error);
        console.log(error.stack);
        return `${error} at ${error.stack}`;
    }
}, { platforms: ["facebook"] })
