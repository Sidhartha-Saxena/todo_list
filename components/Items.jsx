"use client";
import { useRouter } from "next/navigation";
import React from "react";
import {
  BsCalendar2Event,
  BsFillCheckCircleFill,
  BsCircle,
} from "react-icons/bs";
import { GiTomato } from "react-icons/gi";

export default function Items({
  id,
  title,
  description,
  completed,
  color,
  dueDate,
  tomatoes,
}) {
  const router = useRouter();
  return (
    <div
      className={`w-full lg:w-60 lg:aspect-square shadow-sm shadow-slate-50 rounded-2xl p-2 flex flex-col justify-between gap-1 cursor-pointer hover:opacity-100 overflow-hidden`}
      onClick={() => router.push(`/task/${id}`)}
      style={{
        background: `${color}`,
        opacity: `${completed ? "0.5" : "1"}`,
      }}
    >
      <div>
        <h1 className="font-bold text-5xl mb-1 text-ellipsis overflow-hidden">{title}</h1>
        <p className="text-base text-ellipsis overflow-hidden" >{description}</p>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-start gap-1">
          <BsCalendar2Event /> {dueDate.slice(0, 10)}
        </div>
        <div className="text-base font-bold flex justify-between">
          <div className="flex items-center justify-center">
            {tomatoes}
            <GiTomato className="pl-1"/>
          </div>
          <div>{completed ? <BsFillCheckCircleFill /> : <BsCircle />}</div>
        </div>
      </div>
    </div>
  );
}
