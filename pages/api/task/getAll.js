import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import client from "@/prisma/client";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Please signin." });
    }

    try {
      const user = await client.user.findUnique({
        where: {
          email: session?.user?.email,
        },
        include: {
          tasks: {
            select: {
              id: true,
              title: true,
              dueDate: true,
              completed: true,
              color: true,
              tomatoes: true,
              description: true,
            },
            orderBy: {
              dueDate: "desc",
            },
          },
        },
      });
      const data = user.tasks;
      res.status(200).json(data);
    } catch (err) {
      res.status(403).json({ err: "Error occured while fetching a tasks" });
    }
  }
}
