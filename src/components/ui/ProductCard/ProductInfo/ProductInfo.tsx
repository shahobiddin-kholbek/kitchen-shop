'use client'
import { Product } from "@/Types/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    console.log("router.query.product:", router.query.product);
    if (typeof router.query.product === "string") {
      const parsedProduct = JSON.parse(router.query.product);
      setProduct(parsedProduct);
    }
  }, [router.query]);

  return (
    <section>
      {
        product && (
          <>
            <h1>{product.id}</h1>
            <div>{product.name}</div>
          </>
        )
      }


    </section>
  )
}
