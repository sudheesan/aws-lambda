'use strict'
const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event,context,callback)=>{

    const params = {
        TableName : process.env.DYNAMODB_TABLE,
        key:{
            id: event.pathParameters.id
        }
    };

    dynamoDb.delete(params,(error)=>{
        if(error){
            console.error(error);
            callback(new Error('ERROR WHILE DELETING THE USER'));
            return;
        }

        const response ={
             statusCode : 200,
             body: JSON.stringify({})
        };

        callback(null,response);
    });

};