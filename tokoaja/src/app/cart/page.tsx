"use client";
import { useRouter } from "next/navigation";
import NavBar from "../../components/Navbar";
import { useState, useEffect } from "react";
export default function CartPage() {
  const [product, setProduct] = useState<
    | {
        id: string;
        products: Product[];
      }[]
    | undefined
  >();

  const navigation = useRouter();

  type response = {
    statusCode: number;
    message: string;
    data: mantap[];
  };

  type mantap = {
    _id: string;
    userId: string;
    productId: string;
    Products: Product[];
  };

  type Product = {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    thumbnail: string;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let response = await fetch(`http://localhost:3000/api/cart`, {
          cache: "no-store",
        });

        const resJson: response = await response.json();

        if (!response.ok) {
          throw new Error("an error while fetching data");
        }

        const data = resJson.data;

        // console.log(data);
        // const dataId = data.map((el) => {
        //   return el._id;
        // });

        // console.log(dataId, "===id");

        // setIdWish(dataId);

        // const newData = data.map((el) => {
        //   return el.Products;
        // });

        const newData = data.map((el) => {
          return {
            id: el._id,
            products: el.Products,
          };
        });

        // console.log(newData, "========");
        setProduct(newData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, []);

  const handleClick = async (id: string | undefined) => {
    await fetch(`http://localhost:3000/api/cart`, {
      method: "DELETE",
      body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json", //ini kigta kasih tau bahwa data yang kita kirim itu bentuk nya
      },
    });

    let response = await fetch(`http://localhost:3000/api/cart`, {
      cache: "no-store",
    });

    const resJson: response = await response.json();

    if (!response.ok) {
      throw new Error("an error while fetching data");
    }

    const data = resJson.data;

    // console.log(data);
    const newData = data.map((el) => {
      return {
        id: el._id,
        products: el.Products,
      };
    });

    // console.log(newData, "========");

    setProduct(newData);
  };

  return (
    <>
      <NavBar />
      {/* {console.log(product)} */}
      <section className="flex justify-center py-20">
        <section className="grid grid-cols-4 gap-4">
          {product?.map((el) => (
            <div
              key={el.products[0]._id}
              className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-80"
            >
              <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-64">
                <img
                  src={el.products[0].thumbnail}
                  alt="card-image"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                    {el.products[0].name}
                  </p>
                  <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                    ${el.products[0].price}
                  </p>
                </div>
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75 truncate w-48 ">
                  {el.products[0].description}
                </p>
              </div>
              <div className="p-6 pt-0">
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                  type="button"
                  onClick={() => handleClick(el.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </section>
      </section>
    </>
  );
}
