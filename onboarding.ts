import {dialogue, say, ask, expect, location, onText, goto} from "dialogue-builder"

export default dialogue('Onboarding ', (fbid: string) => [ 
    say `Hi Facebook user with ID ${fbid}, welcome to nosy bot!`, 
    say `This inquisitive little bot will ask a bunch of questions for no reason`, 
    say `It will log your answers pointlessly to the console`, 
    say `You can always type back if you make mistake`, 
    ask `How old are you?`,
    expect `My age is`, {
        [onText]: (text: string) => console.log(`User's age is ${text}`)
    },

    ask `What length is your hair?`,
    expect `My hair length is`, {
        'Long': (text: string) => console.log(`User's hair is ${text}`),
        'Short': (text: string) => console.log(`User's hair is ${text}`),
        'Shaved': (text: string) => {
            console.log(`User's hair is ${text}`);
            return goto `after_hair_colour`;
        },
    },

    ask `What colour is your hair?`,
    expect `My hair colour is`, {
        'Black': (text: string) => console.log(`User's hair colour is ${text}`),
        'Brown': (text: string) => console.log(`User's hair colour is ${text}`),
        'Blonde': (text: string) => console.log(`User's hair colour is ${text}`),
    },

    'after_hair_colour',

    ask `Where do you live?`, 
    expect `I live at`, {
        [location]: (lat: number, long: number, title: string, url: string) => console.log(`User located at ${lat}, ${long}`)
    },

    say `Thanks ${fbid}, have a nice day`,
]);