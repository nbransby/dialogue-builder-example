"use strict";
const dialogue_builder_1 = require("dialogue-builder");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = dialogue_builder_1.dialogue('Onboarding ', (fbid) => [
    dialogue_builder_1.say `Hi Facebook user with ID ${fbid}, welcome to nosy bot!`,
    dialogue_builder_1.say `This inquisitive little bot will ask a bunch of questions for no reason`,
    dialogue_builder_1.say `It will log your answers pointlessly to the console`,
    dialogue_builder_1.say `You can always type back if you make mistake`,
    dialogue_builder_1.ask `How old are you?`,
    dialogue_builder_1.expect `My age is`, {
        [dialogue_builder_1.onText]: (text) => console.log(`User's age is ${text}`)
    },
    dialogue_builder_1.ask `What length is your hair?`,
    dialogue_builder_1.expect `My hair length is`, {
        'Long': (text) => console.log(`User's hair is ${text}`),
        'Short': (text) => console.log(`User's hair is ${text}`),
        'Shaved': (text) => {
            console.log(`User's hair is ${text}`);
            return dialogue_builder_1.goto `after_hair_colour`;
        },
    },
    dialogue_builder_1.ask `What colour is your hair?`,
    dialogue_builder_1.expect `My hair colour is`, {
        'Black': (text) => console.log(`User's hair colour is ${text}`),
        'Brown': (text) => console.log(`User's hair colour is ${text}`),
        'Blonde': (text) => console.log(`User's hair colour is ${text}`),
    },
    'after_hair_colour',
    dialogue_builder_1.ask `Where do you live?`,
    dialogue_builder_1.expect `I live at`, {
        [dialogue_builder_1.location]: (lat, long, title, url) => console.log(`User located at ${lat}, ${long}`)
    },
    dialogue_builder_1.say `Thanks ${fbid}, have a nice day`,
]);
//# sourceMappingURL=onboarding.js.map