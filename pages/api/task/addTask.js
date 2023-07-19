
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import client from "@/prisma/client";
import { getServerSession } from "next-auth";

export default async function handler(req,res){
    if (req.method === "POST") {
        const session = await getServerSession(req, res, authOptions)
        if (!session) {
          return res
            .status(401)
            .json({ message: "Please signin to add tasks." })
        }

        const data={...req.body}
        if (!data.title.length) {
          return res
            .status(403)
            .json({ message: "Task Title can't be empty." })
        }
        const prismaUser = await client.user.findUnique({
            where: { email: session?.user?.email },
          })

          data['userId']=prismaUser.id

          try {
            const result = await client.task.create({
              data: data
            })
            res.status(200).json("Added")
          } catch (err) {
            res.status(403).json({ err: "Error has occured while adding a Task" })
          }
    }
}