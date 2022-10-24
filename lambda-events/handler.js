"use strict";

module.exports.reciever = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    },
    body: JSON.stringify({
      message: "Response recieved correctly",
      input: event.body,
    }),
  };

  callback(null, response);
};
