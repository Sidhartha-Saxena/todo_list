"use client";
import { GoSignIn, GoSignOut, GoHome } from "react-icons/go";
import { FaChartPie } from "react-icons/fa";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export function Login() {
  return (
    <button
      onClick={() => signIn()}
      className="flex gap-2 text-xl font-bold items-center justify-center rounded-lg bg-blue-400 hover:bg-green-400 transition-all p-2"
    >
      <GoSignIn />
      Sign In
    </button>
  );
}
export function Signout() {
  return (
    <button onClick={() => signOut()} className="anime-btn">
      <div className="symbol">
        <GoSignOut />
      </div>
      <div className="symbol-text">Logout</div>
    </button>
  );
}
export function Home() {
  return (
    <Link href={"/"} className="anime-btn">
      <div className="symbol">
        <GoHome />
      </div>
      <div className="symbol-text">Home</div>
    </Link>
  );
}
export function Dashboard() {
  return (
    <Link href={"/dashboard"} className="anime-btn">
      <div className="symbol">
        <FaChartPie />
      </div>
      <div className="symbol-text">Dashboard</div>
    </Link>
  );
}
export function home404({ text }) {
  return (
    <Link
      href={"/"}
      className="grid gap-2 text-xl font-bold place-items-center rounded-full hover:bg-lime-500 p-2 transition-all"
    >
      <GoHome />
      {text}
    </Link>
  );
}
