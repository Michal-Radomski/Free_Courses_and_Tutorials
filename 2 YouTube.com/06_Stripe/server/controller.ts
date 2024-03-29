import { Request, Response } from "express";
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

interface ExtendedObject extends Object {
  id: string;
}

export const stripePayment = (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  const { product, token, price } = req.body;
  // console.log({ product, token, price });
  // console.log("price:", price, typeof price);
  const idempotencyKey = uuidv4();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer: ExtendedObject) => {
      stripe.charges.create(
        {
          amount: price * 100,
          currency: "pln",
          customer: customer.id,
          receipt_email: token.email,
          description: `purchase of ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempotencyKey }
      );
    })
    .then((result: Object) => {
      res.status(200).json(result);
    })
    .catch((error: string) => {
      console.log({ error });
    });
};
