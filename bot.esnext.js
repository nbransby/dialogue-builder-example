"use strict";
const builder = require("claudia-bot-builder");
const { DynamoDB } = require('aws-sdk');
const { Dialogue } = require('dialogue-builder');
const onboarding = require('./onboarding');

module.exports = builder((message, apiRequest) => {
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
            async store(state) {
                await dynamo.put({
                    TableName: 'pointless-bot-users',
                    Item: { fbid: message.sender, state: state }
                }).promise();
            }
        };

        const dialogue = new Dialogue(onboarding, storage, message.sender);

        dialogue.setKeywordHandler(['back', 'undo'], 'undo');
        dialogue.setKeywordHandler('reset', 'restart');
        
        return dialogue.consume(message).catch(() => ['I have said all I have to say']);
    }
    catch (error) {
        return `${error} at ${error.stack}`;
    }
}, { platforms: ["facebook"] });
