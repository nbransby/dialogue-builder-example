"use strict";
const { dialogue, say, ask, expect, location, onText, goto } = require('dialogue-builder');

exports.default = dialogue('Onboarding ', (fbid) => [
    say `Hi Facebook user with ID ${fbid}, welcome to nosy bot!`,
    say `This inquisitive little bot will ask a bunch of questions for no reason`,
    say `It will log your answers pointlessly to the console`,
    say `You can always type back if you make mistake`,
    ask `How old are you?`,
    expect `My age is`, {
        [onText]: (text) => console.log(`User's age is ${text}`)
    },
    ask `What length is your hair?`,
    expect `My hair length is`, {
        'Long': (text) => console.log(`User's hair is ${text}`),
        'Short': (text) => console.log(`User's hair is ${text}`),
        'Shaved': (text) => {
            console.log(`User's hair is ${text}`);
            return goto `after_hair_colour`;
        },
    },
    ask `What colour is your hair?`,
    expect `My hair colour is`, {
        'Black': (text) => console.log(`User's hair colour is ${text}`),
        'Brown': (text) => console.log(`User's hair colour is ${text}`),
        'Blonde': (text) => console.log(`User's hair colour is ${text}`),
    },
    'after_hair_colour',
    ask `Where do you live?`,
    expect `I live at`, {
        [location]: (lat, long, title, url) => console.log(`User located at ${lat}, ${long}`)
    },
    say `Thanks ${fbid}, have a nice day`,
]);
