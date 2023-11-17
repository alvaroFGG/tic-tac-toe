import { NextApiRequest, NextApiResponse } from "next";

const getHello = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: "Hello World" });
};

export default getHello;
