import conf from '../conf/conf.js';
import { Client, Account, ID , Databases, Storage, Query } from "appwrite";

export class databaseService {
    Client = new Client();
    databases;
    bucket;

    constructor(){
        this.Client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.Client);
        this.bucket = new Storage(this.Client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
          try {
             return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
             )
          } catch (error) {
            console.log("Error creating post :: ", error);
            
          }
    }
    
    async updatePost(slug,{title, content, featuredImage, status, userId}){
           
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
 
            )
        } catch (error) {
            console.log("Error updating post :: ", error);
        }
    }
   
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                 conf.appwriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.log("Error deleting post :: ", error);
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            
        } catch (error) {
           
            console.log("Error getting post :: ", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
         try {

            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,

                
                
            )
            
         } catch (error) {

            console.log("Error getting posts :: ", error);
             return false;
            
         }
    }

    // file upload services 

    async uploadFile(file){
        try{
                 return await this.bucket.createFile(
                      conf.appwriteBucketId, 
                      ID.unique(),
                      file
                )
        }
        catch (error) {
            console.log("Error uploading file :: ", error);
            return false;
        }

    }

    // Delete files 

    async deleteFile(fileId){
        try {

            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true;

        } catch (error) {
            console.log("Error deleting file :: ", error);
            return false;
            
        }
    }
   
    // file preview

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId,
        )

    }
 
}


const service = new databaseService();
export default databaseService;