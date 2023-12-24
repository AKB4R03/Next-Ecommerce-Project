type resType = {
  statusCode: number;
  message: string;
  data: Top[];
};

type Top = {
  _id: number;
  thumbnail: string;
  name: string;
};
const fetchFour = async () => {
  const response = await fetch(`${process.env.URL}api/product`, {
    headers: {
      cache: "no-store",
    },
  });
  const resJson: resType = await response.json();
  console.log("==============");
  // console.log(data.data.slice(0, 5), "============");//
  return resJson.data.slice(0, 4);
};

export const TopCard = async () => {
  const product = await fetchFour();
  return (
    <>
      {/* //? best product */}
      {/* url('https://thecatsite.com/c/wp-content/uploads/2019/12/cats-christmas-featured.jpg') */}
      <section className="flex justify-center pt-40 pb-20">
        <section className="grid grid-cols-4 gap-4 ">
          {product.map((el) => (
            <div
              key={el._id}
              className="relative grid h-[30rem] w-full max-w-[20rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700"
            >
              <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('https://thecatsite.com/c/wp-content/uploads/2019/12/cats-christmas-featured.jpg')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
                <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50"></div>
              </div>
              <div className="relative p-6 px-6 py-14 md:px-12">
                <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
                  {el.name}
                </h2>
              </div>
            </div>
          ))}
        </section>
      </section>
      {/* //? end best product */}
    </>
  );
};
