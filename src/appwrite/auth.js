import conf from '../conf/conf.js';

import { Client, Account, ID } from "appwrite";

export class AuthService {
    Client = new Client();
    account;

    constructor() {
        this.Client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account = new Account(this.Client);
       
    }

    async  createAccount({email, password,name}){
        try {
     const userAccount =  await this.account.create(ID.unique(),email, password, name);
           if(userAccount){
               // call Another Method
               return this.login({email, password})
           }
           else{
               return userAccount
           }

        } catch (error) {
            throw error;
        }
    }

    async login({email,password}){
        try {
            const userAccount = await this.account.createEmailPasswordSession(email,password);
            return userAccount;
        } catch (error) {
            throw error;
        }
    }
  
    async getCurrentuser(){
        try {
         return await this.account.get();
            
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        return null;
    }

    async logout(){
        try {
           await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }

};

const authService = new AuthService();

export default authService;

