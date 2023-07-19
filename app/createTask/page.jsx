"use client";
import { useMutation, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GiTomato } from "react-icons/gi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import axios, { AxiosError } from "axios";
import { Home, Signout } from "@/components/navlinks";
import { CirclePicker } from "react-color";
import toast from "react-hot-toast";

export default function page() {
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let toastTaskID;
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  if (status === "loading") {
    return <Loading />;
  }
  const [inputState, setInputState] = useState({
    title: "",
    dueDate: "",
    completed: false,
    color: "#F44336",
    tomatoes: 0,
    description: "",
  });
  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };
  const { mutate } = useMutation(async (input) => {
    await axios
      .post("/api/task/addTask", input)
      .then((data) => {
        queryClient.invalidateQueries(["tasks"]);
        toast.success("Task Added", { id: toastTaskID });
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastTaskID });
          setIsDisabled(false);
        }
      })
      .finally(() => {
        setIsDisabled(false);
        setInputState({
          title: "",
          dueDate: "",
          color: "#F44336",
          completed: false,
          tomatoes: 0,
          description: "",
        });
        setAdded(true);
      });
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    toastTaskID = toast.loading("Adding Task", { id: toastTaskID });
    mutate(inputState);
  };
  useEffect(() => {
    if (added) {
      router.push("/");
    }
  }, [added]);
  const { title, description, tomatoes, dueDate } = inputState;
  return (
    <>
      <form
        className="flex flex-col gap-6 w-full h-full md:h-screen pb-2 justify-between"
        onSubmit={handleSubmit}
      >
        <div
          className="w-full h-[30vh] items-end flex flex-col px-4 justify-between"
          style={{ backgroundColor: inputState.color }}
        >
          <div className="flex justify-between w-full text-2xl items-center md:px-4 md:py-2 ">
            <Home />
            <Signout />
          </div>

          <input
            type="text"
            value={title}
            name={"title"}
            placeholder={"Title"}
            onChange={handleInput("title")}
            className="w-full outline-none bg-transparent text-[4rem] placeholder:text-white font-bold"
          />
        </div>
        <div>
          <CirclePicker
            onChangeComplete={(color) => {
              setInputState({ ...inputState, color: color.hex });
            }}
            width="90vw"
            className="px-4"
          />
        </div>
        <div className="w-full px-4 h-[25vh]">
          <textarea
            rows={5}
            value={description}
            type="text"
            name={"description"}
            placeholder={"Description"}
            onChange={handleInput("description")}
            maxLength={200}
            className="w-full outline-none bg-transparent text-xl outline-1 outline-slate-100 rounded-3xl p-5 resize-none"
          />
        </div>
        <div className="px-4 w-full flex justify-between items-center">
          <div className="flex items-center justify-start gap-2">
            <div className="w-full px-4 flex items-center justify-start">
              <h1 className="pr-2">Due date</h1>
              <DatePicker
                id="date"
                selected={dueDate}
                showIcon
                placeholderText="Enter date"
                dateFormat="yyyy-MM-dd"
                autoComplete="off"
                onChange={(date) => {
                  setInputState({ ...inputState, dueDate: date });
                }}
                className="w-full px-2 text-black rounded-full bg-slate-300"
              />
            </div>
            <input
              type="checkbox"
              id="cbx2"
              style={{ display: "none" }}
              onChange={(e) => {
                setInputState({ ...inputState, completed: e.target.checked });
                console.log(e.target.checked);
              }}
            />
            <label htmlFor="cbx2" className="check">
              <svg width="32px" height="32px" viewBox="0 0 18 18">
                <path d="M 1 9 L 1 9 c 0 -5 3 -8 8 -8 L 9 1 C 14 1 17 5 17 9 L 17 9 c 0 4 -4 8 -8 8 L 9 17 C 5 17 1 14 1 9 L 1 9 Z"></path>
                <polyline points="1 9 7 14 15 4"></polyline>
              </svg>
            </label>
            <p className="text-lg font-semibold">Completed</p>
          </div>

          <div className="flex gap-2 items-center justify-end text-lg">
            <GiTomato className="text-[32ps] text-red-600" />
            {tomatoes}
          </div>
        </div>
        <div className="w-full shadow-md rounded-full px-4">
          <button className="btn" type="submit" disabled={isDisabled}>
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
            <span>Add</span>
          </button>
        </div>
      </form>
    </>
  );
}
