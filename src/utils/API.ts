import { AWSAppSyncClient, AWSAppSyncClientOptions } from "aws-appsync";
import config from "../aws-exports";

export const API = new AWSAppSyncClient(
  (config as unknown) as AWSAppSyncClientOptions
);
