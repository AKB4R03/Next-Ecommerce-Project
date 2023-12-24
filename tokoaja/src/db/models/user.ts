import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { hash } from "../utils/bcrypt";

type UserModel = {
    username: string
    password: string
    email: string
    name?: string
}

const DATABASE_NAME = "my_Ecom"
const COLLECTION_NAME = "User"

export const getDb = async () => {
    const client = await getMongoClientInstance();
    const db: Db = client.db(DATABASE_NAME);
  
    return db;
  };

export const createUser = async (user: UserModel) => {
    
    const modifUser: UserModel = {
        ...user,
        password: hash(user.password),
    } 

    const db = await getDb();
    const result = await db.collection(COLLECTION_NAME).insertOne(modifUser);
  
    return result;
}

export const getUserByEmail = async (email: string) => {
    const db = await getDb();
      const user = (await db.collection(COLLECTION_NAME).findOne({email: email}))
  
    return user;
  };

