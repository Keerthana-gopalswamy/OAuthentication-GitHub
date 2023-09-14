/// <reference types="Cypress"/>
import { And, Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import OAuth from "../../support/POM/authpom";
const a=new OAuth;
Given('user gets the oauth access token',()=>{
   a.getAccessToken()

})