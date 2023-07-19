"use client";
import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";

const allTasks = async () => {
  const response = await axios.get("/api/task/getAll");
  return response.data;
};

export default function Pomo({ isVisible, onClose, data }) {
  if (!isVisible) return null;

  const queryClient = useQueryClient();

  const [minutes, setMinutes] = useState(25 );
  const [seconds, setSeconds] = useState(0);
  const [activeState, setActiveState] = useState(false);
  const [task, setTask] = useState("");
  let rest = false;
  let tomatoes = 0;
  let session = 0;
  const { mutate } = useMutation(async () => {
    await axios
      .put(`/api/task/updateTask/${task}`, { tomatoes: tomatoes })
      .then((d) => {
        queryClient.invalidateQueries(["tasks"]);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          console.log("error");
        }
      });
  });
  useEffect(() => {
    if (activeState) {
      let interval = setInterval(() => {
        clearInterval(interval);

        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            session += 1;
            let minutes = rest ? 24 : session % 4 === 0 ? 15 : 4;
            let seconds = 59;
            tomatoes += 1;
            setSeconds(seconds);
            setMinutes(minutes);
            rest = !rest;
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }
  }, [seconds, activeState]);
  useEffect(() => {
    mutate();
  }, [tomatoes]);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const handleClose = (e) => {
    if (e.target.id === "modalWrapper") {
      setActiveState(!activeState);
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
      id="modalWrapper"
      onClick={(e)=>handleClose(e)}
    >
      {data.length === 0 ? (
        <div className="flex gap-4 flex-col items-center justify-center border-4 border-red-600 shadow-md rounded-full p-6">
          <h1 className="text-center text-2xl font-semibold">
            Add items to use pomodoro timer
          </h1>
        </div>
      ) : (
        <div
          className={`flex gap-4 flex-col items-center justify-center border-4 border-red-600 shadow-md rounded-full p-10`}
        >
          <div className="font-bold text-4xl">
            {timerMinutes}:{timerSeconds}
          </div>
          <button
            disabled={task === "" ? true : false}
            onClick={() => setActiveState(!activeState)}
            className="hover:bg-blue-600 border-blue-600 rounded-xl font-semibold p-2"
          >
            {activeState ? "PAUSE" : "START"}
          </button>
          <select
            required
            value={task}
            onChange={(e) => {setTask(e.target.value);console.log(e.target.value)}}
            className="bg-[#151515] text-white rounded-md p-2"
          >
            <option value="" disabled>
              Select Task
            </option>
            {data.map((item) => {
              return <option value={`${item.id}`}>{item.title}</option>;
            })}
          </select>
        </div>
      )}
    </div>
  );
}
