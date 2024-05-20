"use server";
import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";

type AddToCart = {
  userId: string;
  productId: string;
  Products?: ProductModel[];
};

type ProductModel = {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
};

export type FindCart = Omit<AddToCart, "productId">;

export type DeleteCart = {
  _id: string;
};

const DATABASE_NAME = "my_Ecom";
const COLLECTION_NAME = "Whislist";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const createCart = async (cart: AddToCart) => {
  const db = await getDb();

  const data = {
    userId: new ObjectId(cart.userId),
    productId: new ObjectId(cart.productId),
  };

  const result = await db.collection(COLLECTION_NAME).insertOne(data);

  return result;
};

export const findCart = async (cart: FindCart) => {
  const db = await getDb();
  const result = await db
    .collection(COLLECTION_NAME)
    .aggregate([
      { $match: { userId: new ObjectId(cart.userId) } },
      {
        $lookup: {
          from: "Products",
          localField: "productId",
          foreignField: "_id",
          as: "Products",
        },
      },
    ])
    .toArray();

  // console.log(result, "++ cart ++");

  return result;
};

export const deleteCart = async (cart: string) => {
  console.log(cart, "======== dlete");
  const db = await getDb();
  const result = await db.collection(COLLECTION_NAME).deleteOne({
    _id: new ObjectId(cart),
  });
  return result;
};
