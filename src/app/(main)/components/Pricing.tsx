import { getProducts } from "../actions";
import PricingItem from "./PricingItem";

export default async function Pricing() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-3 gap-3" >
      {products.map((product) => (
        <PricingItem key={product?.priceId} {...product} />
      ))}
    </div>
  );
}
