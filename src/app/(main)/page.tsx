import { Pricing } from "./components";

export default function Home() {
  return (
    <div className="app-container pb-24 pt-32">
      <h2 className="mb-14 text-center" id="buy_credits">
        Buy credits
      </h2>
      <Pricing />
    </div>
  );
}
