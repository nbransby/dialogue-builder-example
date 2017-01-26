"use strict";
var dialogue_builder_1 = require("dialogue-builder");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = dialogue_builder_1.dialogue('Onboarding ', function (fbid) {
    return [
        (_a = ["Hi Facebook user with ID ", ", welcome to nosy bot!"], _a.raw = ["Hi Facebook user with ID ", ", welcome to nosy bot!"], dialogue_builder_1.say(_a, fbid)),
        (_b = ["This inquisitive little bot will ask a bunch of questions for no reason"], _b.raw = ["This inquisitive little bot will ask a bunch of questions for no reason"], dialogue_builder_1.say(_b)),
        (_c = ["It will log your answers pointlessly to the console"], _c.raw = ["It will log your answers pointlessly to the console"], dialogue_builder_1.say(_c)),
        (_d = ["You can always type back if you make mistake"], _d.raw = ["You can always type back if you make mistake"], dialogue_builder_1.say(_d)),
        (_e = ["How old are you?"], _e.raw = ["How old are you?"], dialogue_builder_1.ask(_e)),
        (_f = ["My age is"], _f.raw = ["My age is"], dialogue_builder_1.expect(_f)),
        (_g = {},
            _g[dialogue_builder_1.onText] = function (text) { return console.log("User's age is " + text); },
            _g),
        (_h = ["What length is your hair?"], _h.raw = ["What length is your hair?"], dialogue_builder_1.ask(_h)),
        (_j = ["My hair length is"], _j.raw = ["My hair length is"], dialogue_builder_1.expect(_j)),
        {
            'Long': function (text) { return console.log("User's hair is " + text); },
            'Short': function (text) { return console.log("User's hair is " + text); },
            'Shaved': function (text) {
                console.log("User's hair is " + text);
                return (_a = ["after_hair_colour"], _a.raw = ["after_hair_colour"], dialogue_builder_1.goto(_a));
                var _a;
            },
        },
        (_k = ["What colour is your hair?"], _k.raw = ["What colour is your hair?"], dialogue_builder_1.ask(_k)),
        (_l = ["My hair colour is"], _l.raw = ["My hair colour is"], dialogue_builder_1.expect(_l)),
        {
            'Black': function (text) { return console.log("User's hair colour is " + text); },
            'Brown': function (text) { return console.log("User's hair colour is " + text); },
            'Blonde': function (text) { return console.log("User's hair colour is " + text); },
        },
        'after_hair_colour',
        (_m = ["Where do you live?"], _m.raw = ["Where do you live?"], dialogue_builder_1.ask(_m)),
        (_o = ["I live at"], _o.raw = ["I live at"], dialogue_builder_1.expect(_o)),
        (_p = {},
            _p[dialogue_builder_1.location] = function (lat, long, title, url) { return console.log("User located at " + lat + ", " + long); },
            _p),
        (_q = ["Thanks ", ", have a nice day"], _q.raw = ["Thanks ", ", have a nice day"], dialogue_builder_1.say(_q, fbid)),
    ];
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
});
//# sourceMappingURL=onboarding.js.map