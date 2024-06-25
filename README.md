# Marionnette

Currently, OpenAI charges 20$ per month to allow use of their premium features, such as newer models and unlimited usage. This might be a good deal for people who make extensive usage of those services, but, for most people, who doesn't use it a lot, but still want access to their most recent models and with larger limits than the free tier allows, the price seems a bit excessive.

The alternative, OpenAI's API, obviously doesn't provide a front-end to ease its usage. This project aims to fix this, by providing an angular application which allows the user to use its own API key to make requests to the official OpenAI API while paying only for what they use.

This angular front-end application was built to be easily expandable, but probably doesn't comply to the usual Angular standards, since it was made as both an experiment and a prototype tool. The application store the user-provided API token only in the local browser, allows it to be erased, and only sends it in the request headers to OpenAI API.

Requires an OpenAI user or project API token.

_This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.4._

