// "use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const ButtonL = () => {
  // const handleOnClick = async () => {
  //   kue().get("token") && kue().delete("token");
  // };
  return (
    <>
      <form
        action={async () => {
          "use server";
          cookies().get("token") && cookies().delete("token");
          redirect("/");
        }}
      >
        <button type="submit" className="flex items-center">
          Logout
        </button>
      </form>
    </>
  );
};
