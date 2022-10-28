import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

import * as lambda from '@aws-cdk/aws-lambda'
import * as sqs from '@aws-cdk/aws-sqs'



export class TestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    const queue = new sqs.Queue(this, "TestQueue", {
      visibilityTimeout: cdk.Duration.seconds(300),
    });

    const reciever = new lambda.Function(this,'handlerTest', {
      handler: 'reciever.hellohandler'
    })

    
  }
}
