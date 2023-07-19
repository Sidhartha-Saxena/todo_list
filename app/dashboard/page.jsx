"use client";
import React from "react";
import ItemsBar from "@/components/ItemsBar";
import { useQuery } from "react-query";
import Loading from "@/app/loading";
import { Home, Signout } from "@/components/navlinks";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSession } from "next-auth/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "react-datepicker/dist/react-datepicker.css";
ChartJS.register(ArcElement, Tooltip, Legend);
import Image from "next/image";
const allTasks = async () => {
  const response = await axios.get("/api/task/getAll");
  return response.data;
};

export default async function page() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  const { data, error, isLoading } = useQuery({
    queryFn: allTasks,
    queryKey: ["tasks"],
  });
  if (error) return "Error";
  if (isLoading) return <Loading />;
  let completed = 0,
    pending = 0,
    tomatoes = 0,
    dates = [];
  data.map((item) => {
    if (item.completed) {
      completed += 1;
    } else {
      dates.push({ title: item.title, date: item.dueDate.slice(0, 10) });
      pending += 1;
    }
    tomatoes += item.tomatoes;
  });

  const doughnutData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Tasks",
        data: [completed, pending],
        backgroundColor: ["rgb(154,205,50)", "	rgb(255,69,0)"],
      },
    ],
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full p-5">
      <div className="flex justify-between w-full text-2xl items-center md:px-4 md:py-2 ">
        <Home />
        <Signout />
      </div>
      {data.length === 0 ? (
        <div className="flex flex-col w-full h-[50vh] items-center justify-center gap-4">
          <Image src={"/empty.png"} width={500} height={500} alt="Empty" />
          <h1 className="text-center text-2xl font-semibold">
            List Empty add items to see dashboard
          </h1>
        </div>
      ) : (
        <div className="grid grid-col-1 md:grid-cols-2 place-items-center gap-4 p-1 w-full h-full">
          <div className="w-full flex flex-col items-center justify-center gap-2 h-full">
            <h1 className="text-3xl font-bold mb-2 self-start">Activity</h1>
            <div className="w-full grid place-items-center">
              {data ? (
                <div className="w-full flex flex-col md:grid md:grid-cols-2 place-items-center">
                  <div className="h-[30vh]">
                    <Doughnut
                      data={doughnutData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="flex gap-1 items-center">
                      <span className="text-[10px] w-[32px] h-[32px] rounded-full bg-[#9acd32] inline-block m-1"></span>
                      <h1 className=" text-xl font-bold font-mono">
                        {`Completed Task ${completed}`}
                      </h1>
                    </div>
                    <div className="flex gap-1 items-center">
                      <span className="text-[10px] w-[32px] h-[32px] rounded-full bg-[#ff4500] inline-block m-1"></span>
                      <h1 className=" text-xl font-bold font-mono">
                        {`Pending Task ${pending}`}
                      </h1>
                    </div>
                  </div>
                </div>
              ) : (
                <Loading />
              )}
            </div>
            <h1 className="text-3xl font-bold mb-2 self-start">
              Pending Tasks
            </h1>
            <div className="h-[30vh] w-full flex flex-col gap-2 overflow-y-scroll pr-2">
              {data?.map((tasks) => {
                const { id, title, completed, color, dueDate } = tasks;
                if (!completed) {
                  return (
                    <ItemsBar
                      key={id}
                      id={id}
                      title={title}
                      completed={completed}
                      color={color}
                      dueDate={dueDate}
                    />
                  );
                }
              })}
            </div>
          </div>
          <div className="w-full h-full flex flex-col gap-2">
            <div className="w-full">
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  start: "title",
                  end: "prev,next",
                }}
                events={dates}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
