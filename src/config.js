let baseUrl = "";
let FB_APP_ID = "";
let STRIPE_PUBLIC_KEY = "";
let APP_URL = "";
let prokey = "price_1HLTXvEyjkUaFZlBHOuM4SXf"; // Prod
let basickey = "price_1HLTXUEyjkUaFZlBcCzspFN5"; // Prod

if (process.env.NODE_ENV === "production") {
  //baseUrl = "https://ec2-18-216-33-223.us-east-2.compute.amazonaws.com:3000/";
  //baseUrl = "https://d2871qaba6qfgd.cloudfront.net/";
  baseUrl = "https://api.kalypsoapp.co/";
  FB_APP_ID = "1161025660919432";//"264514927939052";
  STRIPE_PUBLIC_KEY = "pk_live_KGX8Z5VTAA3Y5jTHHitRqCDF00EEYsMkQA";
  APP_URL = "https://app.kalypsoapp.co/#/campaign/"
  prokey = "price_1HMdV2EyjkUaFZlBLfBPvwSW"; // testing only
  basickey = "price_1HMdVrEyjkUaFZlBdtIAfdGX"; // testing only
} else {
  baseUrl = "http://localhost:3000/"
  //baseUrl = "https://api.kalypsoapp.co/";
  //baseUrl = "https://ec2-18-216-33-223.us-east-2.compute.amazonaws.com:3000/";
  FB_APP_ID = "1161025660919432";//"264514927939052";
  STRIPE_PUBLIC_KEY = "pk_test_FKwJ4XAMLBwpIgfTAldY8hAS001hWH9dIS";
  APP_URL = "https://localhost:8080/#/campaign/"
  prokey = "price_1HMdV2EyjkUaFZlBLfBPvwSW";
  basickey = "price_1HMdVrEyjkUaFZlBdtIAfdGX";
}

export const apiUrl = baseUrl;
export const FbAppId = FB_APP_ID;
export const stripePk = STRIPE_PUBLIC_KEY;
export const app_URL = APP_URL;
export const pro_key = prokey;
export const basic_key = basickey;

