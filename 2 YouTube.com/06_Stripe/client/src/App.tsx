import React from "react";
import StripeCheckOut, { Token } from "react-stripe-checkout";
import axios from "axios";

import "./App.scss";

interface Product {
  name: string;
  productBy: string;
}

function App(): JSX.Element {
  const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY as string;

  const [product] = React.useState<Product>({
    name: "React from FB",
    productBy: "facebook",
  });

  const [price, setPrice] = React.useState<number>(0);
  // console.log({ price });

  const makePayment = async (token: Token) => {
    const body = {
      token,
      product,
      price,
    };
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const bodyToSend = JSON.stringify(body);
    // console.log({ token });

    return await axios
      .post("/api/payment", bodyToSend, config)
      .then((response) => {
        // console.log({ response });
        const { status } = response;
        console.log({ status });
      })
      .then(() => {
        setTimeout(() => {
          setPrice(0);
        }, 1000);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const onClosed = () => {
    alert(`You have bought React for $${price}`);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number((event.target as HTMLInputElement).value));
  };

  return (
    <div className="stripe">
      <h3>Node-React Stripe App</h3>

      <form>
        <label>
          How much do you want to pay? :
          <input type="number" value={price} onChange={onChange} />
        </label>
      </form>

      {/* @ts-ignore */}
      <StripeCheckOut
        token={makePayment}
        stripeKey={stripeKey}
        name={`Buy React for just $${price}`}
        amount={price * 100}
        shippingAddress={false}
        billingAddress={true}
        closed={onClosed}
      >
        <button className="btn-large blue">Buy React for just ${price}</button>
      </StripeCheckOut>
    </div>
  );
}

export default App;
