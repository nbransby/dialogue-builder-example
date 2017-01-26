import { DynamoDB } from 'aws-sdk'
import { Request } from 'claudia-api-builder';
import { Dialogue } from 'dialogue-builder'
import onboarding from './onboarding'
import builder = require('claudia-bot-builder');
import Message = builder.Message

export = builder((message: Message, apiRequest: Request) => {
    try {        
        const dynamo = new DynamoDB.DocumentClient();

        const dialogue = new Dialogue(onboarding, {
            async retrieve() {
                 const user = await dynamo.get({
                     TableName: 'users', 
                     Key: { fbid: message.sender }, 
                     ConsistentRead: true 
                    }).promise();
                 return user.Item!['state'];
            },
            async store(state: Object) {
                await dynamo.put({
                    TableName: 'users',
                    Item: { fbid: message.sender, state: state }
                }).promise();
            }
        }, message.sender);

        dialogue.setKeywordHandler(['back', 'undo'], 'undo');
        dialogue.setKeywordHandler('reset', 'restart');

        const messages = dialogue.consume(message);
        if(dialogue.isComplete) {
            //do something
        }
        return messages;
    } catch(error) {
        return `${error} at ${error.stack}`;
    }
}, { platforms: ["facebook"] })
