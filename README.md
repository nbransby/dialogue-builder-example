# dialogue-builder-example

A working example of a bot utilising dialogue-builder including persistence of dialogue state.

This example is written in TypeScript and consists of two files `bot.ts` and `onboarding.ts`, (`bot.js` and `onboarding.js` contain the transpiled TypeScript - not a pretty sight). 

There is also `bot.esnext.js` and `onboarding.esnext.js` which is my attempt to implement the example without TypeScript but still using all the advanced JS syntax such as async/await and object destructuring. Although I haven't tried it myself, by using babel it should be possible to compile this down to es5 which is necessary to run on AWS Lambda.

Dialogue Builder depends on [bot-builder](https://github.com/claudiajs/claudia-bot-builder) by [claudia.js](https://claudiajs.com/) who's [command line tool](https://claudiajs.com/documentation.html#args) supports deploying to AWS Lambda. But in this  example we use the [Serverless Framework](https://serverless.com/) for deployment as it also supports automated provisioning of DynamoDB instances which is used in this example to store the dialog state.

#### To deploy this example so you can test it in Facebook Messenger you will need to do the following:

* #####Create a Facebook App
> Create a new [Facebook App](https://developers.facebook.com/apps) or use an existing one. In the `serverless.yml` file, replace `REPLACE_WITH_APP_SECRET` with your Facebook App Secret

* #####Create a Facebook Page
> Create a new [Page](https://www.facebook.com/pages/create) or use an existing one, then go to the App Dashboard and under Product Settings click "Add Product" and select "Messenger."
> 
![step1](https://scontent-ams3-1.xx.fbcdn.net/v/t39.2178-6/12995587_195576307494663_824949235_n.png?oh=c2d8210d366a5650df958c86a08792c5&oe=596749C3)
> 
In the Token Generation section, select your Page. A Page Access Token will be generated for you. 
> 
![step3](https://scontent-ams3-1.xx.fbcdn.net/v/t39.2178-6/12995543_1164810200226522_2093336718_n.png?oh=582e1b57f6e9b3f67f5a007d887d5fb8&oe=59329209)
> 
In the `serverless.yml` file, replace`REPLACE_WITH_PAGE_ACCESS_TOKEN` with your Page Access Token

* #####Install serverless and setup your AWS account credentials on your machine
> https://serverless.com/framework/docs/providers/aws/guide/installation/ 
> 
Make sure to also follow [these instructions](https://serverless.com/framework/docs/providers/aws/guide/credentials) on setting up AWS credentials

* #####Run the following in the root of this directory (npm version 4.x or higher) and, once complete, copy the URL returned

        npm install
        serverless deploy

* #####Setup the Webhook on Facebook with the URL as the Callback URL and `SOMETHING_RANDOM` as the verify token
> In the Webhooks section, click "Setup Webhooks."
> 
![webhook](https://scontent-lhr3-1.xx.fbcdn.net/t39.2178-6/13331609_660771177408445_306127577_n.png)
> 
Enter a URL for a webhook, enter a Verify Token and select `messages` and `messaging_postbacks` under Subscription Fields.
>
![subscription](https://scontent-ams3-1.xx.fbcdn.net/v/t39.2178-6/12057143_211110782612505_894181129_n.png?oh=132ce46ea1a96b8a91cbe387492943b5&oe=593C4AF1)

* #####Subscribe the App to the Page on Facebook
> In the Webhooks section, you can subscribe the webhook for a specific page.
> 
> ![enter image description here](https://scontent-ams3-1.xx.fbcdn.net/v/t39.2178-6/13421551_1702530599996541_471321650_n.png?oh=75f68bbf43a5a25d98464babc1232a25&oe=5939AA9F)

* #####Try your new bot
>Go to your Facebook Page and send a message to it. The bot should respond!
>
![page](https://scontent-ams3-1.xx.fbcdn.net/v/t39.2178-6/13331537_288414224831849_853132949_n.png?oh=5f381f9f42de44be26539da6ed663d09&oe=5930C11B)
