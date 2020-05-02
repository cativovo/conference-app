import { Auth } from 'aws-amplify';
import { AWSAppSyncClient } from 'aws-appsync';
import fetch from 'isomorphic-unfetch';
import awsExports from '../aws-exports';

(global as any).fetch = fetch;

export const API = new AWSAppSyncClient(
  {
    disableOffline: true,
    url: awsExports.aws_appsync_graphqlEndpoint,
    region: awsExports.aws_appsync_region,
    auth: {
      type: awsExports.aws_appsync_authenticationType as any,
      apiKey: awsExports.aws_appsync_apiKey,
    },
    complexObjectsCredentials: () => Auth.currentCredentials(),
  },
  { ssrMode: true }
);
