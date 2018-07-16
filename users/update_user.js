'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {

    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: event.pathParameters.id,
        },
        Item: {
            id: event.pathParameters.id,
            name: data.name,
            address: data.address,
            age: data.age,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime()
        }
    };
    dynamoDb.get(params, (error, result) => {

        if (error) {
            console.error(error);
            callback(new Error('Couldn\'t fetch the user.'));
            return;
        }

        if (result.Item) {
            dynamoDb.put(params, (error) => {

                if (error) {
                    console.error(error);
                    callback(new Error('Couldn\'t update the user.'));
                    return;
                }

                const response = {
                    statusCode: 204,
                    body: JSON.stringify(params.Item),
                };

                callback(null, response);
            });
        }
    });
};