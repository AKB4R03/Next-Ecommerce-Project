"use client";
import Link from "next/link";

import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { number } from "zod";

type CardProps = {
  name: string;
};

const Card: React.FC<CardProps> = ({ name }) => {
  // type Res<T: Product[]> = {
  //   data: T;
  // };

  // if (name == "") console.log("ini string kosong");
  // console.log(name, "=======");

  type response = {
    statusCode: number;
    message: string;
    data: Product[];
  };

  type Product = {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    thumbnail: string;
  };

  const [product, setProduct] = useState<Product[] | undefined>();
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // console.log(name, "============ ini di useEffect");
        let response;
        if (name == "") {
          response = await fetch(`http://localhost:3000/api/product`, {
            cache: "no-store",
          });
        } else {
          response = await fetch(
            `http://localhost:3000/api/product/?name=${name}`,
            {
              cache: "no-store",
            }
          );
        }

        const resJson: response = await response.json();

        if (!response.ok) {
          throw new Error("an error while fetching data");
        }

        const data = resJson.data.slice(0, 20);

        console.log(data, "========");
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [name]);

  const fetchMore = async () => {
    const fetchCount = 10;
    const delay = 500;

    const fetchData = async (offset: number) => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/product?offset=${offset}&limit=${fetchCount}`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const resJson: response = await response.json();
        return resJson.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    };

    const loadNextData = async () => {
      const currentLength = product ? product.length : 0;

      if (currentLength >= 44) {
        setHasMore(false);
      } else {
        const newData = await fetchData(currentLength);
        const updatedProduct = product
          ? [...product, ...newData.slice(0, fetchCount)]
          : newData.slice(0, fetchCount);

        setProduct(updatedProduct);

        if (updatedProduct.length >= 44) {
          setHasMore(false);
        }
      }
    };

    if (product && product.length < 44) {
      setTimeout(async () => {
        await loadNextData();
      }, delay);
    } else {
      setHasMore(false);
    }
  };

  return (
    <>
      {/* product card */}
      {/* {console.log(product)} */}
      <InfiniteScroll
        dataLength={product?.length ?? 0}
        next={fetchMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<h1>you&apos;re all set</h1>}
      >
        <section className="flex justify-center py-20">
          <section className="grid grid-cols-4 gap-4">
            {product?.map((el) => (
              <div
                key={el._id}
                className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-80"
              >
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-64">
                  <img
                    src={el.thumbnail}
                    alt="card-image"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                      {el.name}
                    </p>
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                      ${el.price}
                    </p>
                  </div>
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75 truncate w-48 ">
                    {el.description}
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    href={`/product/${el.slug}`}
                    // href={`/product/detailProduct/${product.id}`}
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    type="button"
                  >
                    See Detail
                  </Link>
                </div>
              </div>
            ))}
          </section>
        </section>
      </InfiniteScroll>
      {/* end of product card */}
    </>
  );
};

export default Card;
