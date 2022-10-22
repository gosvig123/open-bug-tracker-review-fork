"use strict";

module.exports.reciever = (event, context, callback) => {
  console.log("event", event);
  console.log("context", context);

  // const response = {
  //   statusCode: 200,
  //   headers: {
  //     'Access-Control-Allow-Origin': '*', // Required for CORS support to work
  //   },
  //   body: JSON.stringify({
  //     message: 'Go Serverless v1.0! Your function executed successfully!',
  //     input: event,
  //   }),
  // };

  callback(null, response);
};
