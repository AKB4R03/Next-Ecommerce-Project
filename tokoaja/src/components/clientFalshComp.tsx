"use client";

import { useSearchParams } from "next/navigation";

const ClientFlashComponent = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");

  return (
    <>
      {errorMessage && (
        <div className="flex justify-center pt-20">
          <p className="animate-pulse rounded bg-red-400 px-4 py-2 text-center text-white">
            {errorMessage}
          </p>
        </div>
      )}
    </>
  );
};

export default ClientFlashComponent;
