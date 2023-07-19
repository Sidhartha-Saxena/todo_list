import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import client from "@/prisma/client";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Please signin." });
    }
  if (req.method === "GET") {

    try {
      const data = await client.task.findUnique({
        where: {
          id: req.query.id,
        },
        select: {
          title: true,
          dueDate: true,
          completed: true,
          color: true,
          tomatoes: true,
          description: true,
        },
      });
      res.status(200).json(data);
    } catch (err) {
      res.status(403).json({ err: "Error occured while fetching a tasks" });
    }
  }
}
