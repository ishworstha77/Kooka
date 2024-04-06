import { Facebook } from "lucide-react";

export const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <p className="text-3xl text-primary font-bold text-center uppercase">
        Lynch’s gourmet breadcrumbs
      </p>
      <Facebook />
      <p className="text-xl text-primary text-center font-semibold">
        FAQ STORE POLICIES CONTACT PRIVACY POLICY
      </p>
      <div className="flex gap-2">
        <p className="text-sm text-center font-semibold">POWERED BY</p>
        <p className="text-sm text-center font-semibold underline underline-offset-1">
          SQUARESPACE
        </p>
      </div>
    </div>
  );
};
