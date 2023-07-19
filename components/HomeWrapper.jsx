"use client";
import React, { useState } from "react";
import Items from "./Items";
import { useQuery } from "react-query";
import Loading from "@/app/loading";
import axios from "axios";
import Image from "next/image";
import Pomo from "./Pomo";
import { BsStopwatch } from "react-icons/bs";
const allTasks = async () => {
  const response = await axios.get("/api/task/getAll");
  return response.data;
};

export default async function HomeWrapper() {
  const [show, setShow] = useState(false);
  const { data, error, isLoading } = useQuery({
    queryFn: allTasks,
    queryKey: ["tasks"],
  });
  if (error) return "Error";
  if (isLoading) return <Loading />;
  if (data.length === 0) {
    return (
      <div className="flex flex-col w-full h-[50vh] items-center justify-center gap-4">
        <Image src={"/empty.png"} width={500} height={500} alt="Empty" />
        <h1 className="text-center text-2xl font-semibold">List Empty</h1>
      </div>
    );
  }

  return (
    <div className="grid grid-col-1 lg:grid-cols-5 place-items-center gap-4 py-2 w-full h-full">
      <button
        onClick={() => {
          setShow(true);
        }}
        className="fixed z-10 bottom-6 left-6 flex items-center justify-center rounded-full p-1 bg-amber-500 hover:bg-transparent hover:border-2 hover:border-amber-500 text-slate-900 hover:text-white"
      >
        <BsStopwatch className="text-5xl" />
      </button>
      {data?.map((tasks) => {
        const { id, title, description, completed, color, dueDate, tomatoes } =
          tasks;
        return (
          <Items
            key={id}
            id={id}
            title={title}
            description={description}
            completed={completed}
            color={color}
            dueDate={dueDate}
            tomatoes={tomatoes}
          />
        );
      })}
      <Pomo
        isVisible={show}
        data={data}
        onClose={() => {
          setShow(false);
        }}
      />
    </div>
  );
}
