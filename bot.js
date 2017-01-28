"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const aws_sdk_1 = require("aws-sdk");
const dialogue_builder_1 = require("dialogue-builder");
const onboarding_1 = require("./onboarding");
const builder = require("claudia-bot-builder");
module.exports = builder((message, apiRequest) => __awaiter(this, void 0, void 0, function* () {
    try {
        const dynamo = new aws_sdk_1.DynamoDB.DocumentClient();
        const storage = {
            retrieve() {
                return __awaiter(this, void 0, void 0, function* () {
                    const user = yield dynamo.get({
                        TableName: 'pointless-bot-users',
                        Key: { fbid: message.sender },
                        ConsistentRead: true
                    }).promise();
                    return user.Item && user.Item['state'];
                });
            },
            store(state) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield dynamo.put({
                        TableName: 'pointless-bot-users',
                        Item: { fbid: message.sender, state: state }
                    }).promise();
                });
            }
        };
        const dialogue = new dialogue_builder_1.Dialogue(onboarding_1.default, storage, message.sender);
        dialogue.setKeywordHandler(['back', 'undo'], 'undo');
        dialogue.setKeywordHandler('reset', 'restart');
        return dialogue.consume(message).catch(() => ['I have said all I have to say']);
    }
    catch (error) {
        console.log(error);
        console.log(error.stack);
        return `${error} at ${error.stack}`;
    }
}), { platforms: ["facebook"] });
//# sourceMappingURL=bot.js.map