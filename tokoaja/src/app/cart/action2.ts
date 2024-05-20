"use server";

import { cookies } from "next/headers";
import { handleRemoveCart } from "./action";

export async function RemoveCart({ cartId }: { cartId: string }) {
  //   const cookiesObj = cookies();

  //   await handleRemoveCart(cartId);

  return "Cart item removed successfully";
}
