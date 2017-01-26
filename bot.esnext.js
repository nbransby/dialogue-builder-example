"use strict";
const builder = require("claudia-bot-builder");
const { DynamoDB } = require('aws-sdk');
const { Dialogue } = require('dialogue-builder');
const onboarding = require('./onboarding');

module.exports = builder((message, apiRequest) => {
    try {
        const dynamo = new DynamoDB.DocumentClient();

        const dialogue = new Dialogue(onboarding, {
            async retrieve() {
                const user = await dynamo.get({
                    TableName: 'users',
                    Key: { fbid: message.sender },
                    ConsistentRead: true
                }).promise();
                return user.Item['state'];
            },
            async store(state) {
                await dynamo.put({
                    TableName: 'users',
                    Item: { fbid: message.sender, state: state }
                }).promise();
            }
        }, message.sender);

        dialogue.setKeywordHandler(['back', 'undo'], 'undo');
        dialogue.setKeywordHandler('reset', 'restart');

        const messages = dialogue.consume(message);
        if (dialogue.isComplete) {
            //do something
        }
        return messages;
    }
    catch (error) {
        return `${error} at ${error.stack}`;
    }
}, { platforms: ["facebook"] });
