"use client";
import React from "react";
import { GoHome } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
export default function Custom404() {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center gap-4">
      <Image
        src={"/errorpage.png"}
        width={500}
        height={500}
        alt="Sign Up Illustrations"
      />
      <h1 className="text-center text-2xl font-semibold">Page Not Found</h1>
      <Link
        href={"/"}
        className="grid gap-2 text-xl font-bold place-items-center rounded-lg bg-blue-600 hover:bg-lime-500 p-2 transition-all"
      >
        <GoHome /> HOME
      </Link>
    </div>
  );
}
