"use client";
import { useRouter } from "next/navigation";
import React from "react";
import {
  BsCalendar2Event,
  BsFillCheckCircleFill,
  BsCircle,
} from "react-icons/bs";

export default function Items({ id, title, completed, color, dueDate }) {
  const router = useRouter();
  return (
    <div
      className={`w-full cardShhadow rounded-2xl p-2 flex flex-col justify-between gap-1 cursor-pointer hover:opacity-100`}
      onClick={() => router.push(`/task/${id}`)}
      style={{ background: `${color}` }}
    >
      <div>
        <h1 className="font-bold text-3xl">{title}</h1>
      </div>
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center justify-start gap-1">
          <BsCalendar2Event /> {dueDate.slice(0, 10)}
        </div>
        <div className="text-base font-bold flex justify-between">
          <div>{completed ? <BsFillCheckCircleFill /> : <BsCircle />}</div>
        </div>
      </div>
    </div>
  );
}
