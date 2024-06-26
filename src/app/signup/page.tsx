import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import SignUpForm from "./SignupForm";
import { addSales } from "@/utils/apiFunctions";

type Props = {
  params: any;
  searchParams: {
    [key: string]: string | string[] | undefined;
    session_id?: string;
  };
};

async function getCustomerbySession(sessionId?: string) {
  if (!sessionId) return null;
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });
  console.log("session", JSON.stringify(session.line_items.data));
  if (!session.customer) return null;

  const customer = await stripe.customers.retrieve(session.customer as string);
  return customer as Stripe.Customer;
}

export default async function SignUpPage(props: Props) {
  const searchParams = props.searchParams;
  const sessionId = searchParams.session_id;
  const customer = await getCustomerbySession(sessionId);

  // const test = await  await addSales();
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-center text-4xl font-bold my-10">
          Create an Account
        </h1>
        <SignUpForm email={customer?.email ?? ""} customerId={customer?.id} />
      </div>
    </div>
  );
}
