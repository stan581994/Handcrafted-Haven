import { useEffect } from "react";
import { useRouter } from "next/router";

const CartRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/shop/my-cart");
  }, [router]);

  return null;
};

export default CartRedirect;
