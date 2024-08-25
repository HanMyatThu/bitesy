import { PastOrderResult } from "./past-order-result";

export const PastOrder = () => {
  return (
    <div className="mb-16">
      {[...Array(5)].map((_, i) => (
        <PastOrderResult key={i} />
      ))}
    </div>
  );
};
