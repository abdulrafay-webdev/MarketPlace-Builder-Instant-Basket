import { client } from "../../../../sanity/lib/client";

export default async function handler(req, res) {
    if (req.method === "POST") {
      try {
        const order = await client.create({
          _type: "order",
          ...req.body,
        });
        res.status(200).json(order);
      } catch (error) {
        console.error("Sanity create error:", error);
        res.status(500).json({ message: "Error creating order" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  }