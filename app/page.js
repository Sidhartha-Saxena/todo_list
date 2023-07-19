import HomeWrapper from "@/components/HomeWrapper";
import { BsPlusLg, BsStopwatch } from "react-icons/bs";
import { Signout, Dashboard, Login } from "@/components/navlinks";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <div className="flex justify-center items-center p-5 flex-col gap-4 w-full h-full relative">
        <Link
          href={"/createTask"}
          className="fixed z-10 bottom-6 right-6 rounded-full bg-lime-500 hover:bg-transparent hover:border-2 hover:border-lime-500 text-slate-900 hover:text-white"
        >
          <BsPlusLg className="text-5xl" />
        </Link>

        <div className="flex justify-between w-full text-2xl items-center md:px-4 md:py-2 ">
          <Dashboard />
          <Signout />
        </div>
        <HomeWrapper />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col w-full h-screen items-center  justify-center gap-4">
        <Image
          src={"/signup.png"}
          width={500}
          height={500}
          alt="Sign Up Illustrations"
        />
        <h1 className="text-center text-2xl font-semibold">
          Sign in to use the app
        </h1>
        <Login />
      </div>
    );
  }
}
