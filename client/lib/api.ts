import axios from "axios";

import type { NextApiRequest, NextApiResponse } from "next";

interface Data {
  name: string;
}

function handler(req: NextApiRequest, res: NextApiResponse<Data>): void {
  res.status(200).json({ name: "John Doe" });
}

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export { handler };
