import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { emit } from "process";

type ProductModel = {
    _id: ObjectId
    name: string
    slug: string
    description: string
    excerpt: string
    price: number
    tags: string[]
    thumbnail: string
    images: string[]
}



const DATABASE_NAME = "my_Ecom"
const COLLECTION_NAME = "Products"

export const getDb = async () => {
    const client = await getMongoClientInstance();
    const db: Db = client.db(DATABASE_NAME);
  
    return db;
  };

export const getProducts = async (query: string | null) => {
    const db = await getDb()
    // console.log(query, '=====model');
      let products
    if(query == null || "") {
       products = (await db
          .collection(COLLECTION_NAME)
          .find()
          .toArray()) as ProductModel[];
        }else {
          products = (await db
            .collection(COLLECTION_NAME)
            .find({name: new RegExp(query, 'i')})
            .toArray()) as ProductModel[];
        }
      return products;
}

export const getProductBySlug = async (slug: string) => {
    const db = await getDb()


    const product = (await db.collection(COLLECTION_NAME).findOne({
      slug: slug
    })) as ProductModel

      return product;
}

export const getProductByName = async (name: string) => {
    const db = await getDb()

    const query = {name: name}
    const product = (await db.collection(COLLECTION_NAME).find(query).toArray()) as ProductModel[]

      return product;
}