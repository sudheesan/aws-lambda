'use strict'
const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.list = (event,context,callback)=>{


    const params = {
        TableName : process.env.DYNAMODB_TABLE,
    };

    dynamoDb.scan(params,(error,rusult)=>{
        if(error){
            console.error(error);
            callback(new Error('ERROR WHILE CREATING THE USER'));
            return;
        }

        const response ={
             statusCode : 200,
             body: JSON.stringify(rusult.Items)
        };

        callback(null,response);
    });

};