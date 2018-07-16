'use strict'
const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event,context,callback)=>{

    const data = JSON.parse(event.body);

    const params = {
        TableName : process.env.DYNAMODB_TABLE,
        Item :{
            id : uuid.v4(),
            name : data.name,
            address : data.address,
            age : data.age,
            createdAt : new Date().getTime(),
            updatedAt : new Date().getTime()
        }
    };

    dynamoDb.put(params,(error)=>{
        if(error){
            console.error(error);
            callback(new Error('ERROR WHILE CREATING THE USER'));
            return;
        }

        const response ={
             statusCode : 201,
             body: JSON.stringify(params.Item)
        };

        callback(null,response);
    });

};