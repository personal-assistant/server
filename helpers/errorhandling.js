var nodeError = ['Error','EvalError','InternalError','RangeError','ReferenceError','SyntaxError','TypeError','URIError']
var mongooseError = ['MongooseError','DisconnectedError','DivergentArrayError','MissingSchemaError','DocumentNotFoundError','MissingSchemaError','ObjectExpectedError','ObjectParameterError','OverwriteModelError','ParallelSaveError','StrictModeError','VersionError']
var mongooseErrorFromClient = ['CastError','ValidatorError','ValidationError'];
var jwtError = ['TokenExpiredError','JsonWebTokenError','NotBeforeError']

function nodeErrorMessage(message){
    switch(message){
        case 'User not found':
            return 403;
        case 'Token is undefined':
        case 'Email is Invalid!':
        case 'Password is Invalid!':
        case 'Item id not found':
        case 'Item not found':
        case 'Code is invalid':
            return 400;
        default :{
            return 500;
        }
    }
}

module.exports = function(errorObject){

    let statusCode = 500;  
    let returnObj = {
        error : errorObject
    }
    if(jwtError.includes(errorObject.name)){
        statusCode = 403;
        returnObj.message = 'Token is Invalid'
        returnObj.source = 'jwt'
    }
    else if(nodeError.includes(errorObject.name)){
        returnObj.error = JSON.parse(JSON.stringify(errorObject, ['message', 'arguments', 'type', 'name']))
        returnObj.source = 'node';
        statusCode = nodeErrorMessage(errorObject.message);
        returnObj.message = errorObject.message;
    }else if(mongooseError.includes(errorObject.name)){
        returnObj.source = 'database'
        returnObj.message = 'Error from server'
    }else if(mongooseErrorFromClient.includes(errorObject.name)){
        returnObj.source = 'database';
        //errorObject.message ? returnObj.message = errorObject.message : returnObj.message = 'Bad Request'
         returnObj.message = errorObject.message
        statusCode = 400;
    }else{
        returnObj.source = 'unknown error';
        returnObj.message = 'Something error';
    }
    returnObj.statusCode = statusCode;
    
    return returnObj;


}
