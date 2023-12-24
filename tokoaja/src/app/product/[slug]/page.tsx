"use client";
import NavBar from "@/components/Navbar";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailProduct() {
  const { slug } = useParams();

  const navigation = useRouter();

  // console.log(slug, "==========");

  type response = {
    statusCode: number;
    message: string;
    data: Product;
  };

  type Product = {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    thumbnail: string;
  };

  const [product, setProduct] = useState<Product | undefined>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log(slug);
        const response = await fetch(
          `http://localhost:3000/api/product/${slug}`,
          {
            cache: "no-store",
          }
        );

        // console.log(response);
        console.log("gahahahahah");

        const resJson: response = await response.json();

        if (!response.ok) {
          throw new Error("an error while fetching data");
        }

        // const { products } = resJson;

        const data = resJson.data;

        console.log(data, "========");
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, []);

  const handleClick = async (productId: string | undefined) => {
    await fetch(`http://localhost:3000/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productId),
    });

    navigation.push("/cart");
  };

  return (
    <>
      <NavBar />
      <section className="flex justify-center py-40">
        <div className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[70rem] h-[500px] flex-row">
          <div className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
            <img
              src={product?.thumbnail}
              alt="card-image"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-6">
            <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
              {product?.name}
            </h6>
            <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {product?.slug}
            </h4>
            <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
              {product?.description}
            </p>
            <p className="pt-10">${product?.price}</p>
            <div className="flex justify-center pt-20">
              <button
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                type="button"
                onClick={() => handleClick(product?._id)}
              >
                Add to Cart
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
