"use client";
import { useMutation, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GiTomato } from "react-icons/gi";
import { BsTrash3, BsSave2 } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { Home, Signout } from "@/components/navlinks";
import Loading from "../../loading";
import { useParams, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { CirclePicker } from "react-color";

const getTask = async (id) => {
  const response = await axios.get(`/api/task/getTask/${id}`);
  return response.data;
};

export default function page() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  let toastTaskID;
  const [isDisabled, setIsDisabled] = useState(false);
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
  const setInputs = async () => {
    const data = await getTask(params.taskId);
    data.dueDate = new Date(data.dueDate);
    console.log(data.completed);
    setInputState({ ...data });
  };
  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
  };
  const { mutate: updateMutate } = useMutation(async (input) => {
    await axios
      .put(`/api/task/updateTask/${params.taskId}`, input)
      .then((data) => {
        queryClient.invalidateQueries(["tasks"]);
        toast.success("Task Updated", { id: toastTaskID });
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastTaskID });
          setIsDisabled(false);
        }
      })
      .finally(() => {
        setIsDisabled(false);
      });
  });
  const { mutate: deleteMutate } = useMutation(async () => {
    await axios
      .delete(`/api/task/deleteTask/${params.taskId}`)
      .then((data) => {
        queryClient.invalidateQueries(["tasks"]);
        toast.success("Task Deleted", { id: toastTaskID });
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastTaskID });
          setIsDisabled(false);
        }
      })
      .finally(() => {
        setIsDisabled(false);
        router.push("/");
      });
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    toastTaskID = toast.loading("Updating Task", { id: toastTaskID });
    updateMutate(inputState);
  };
  const handleDelete = async () => {
    toastTaskID = toast.loading("Removing Task", { id: toastTaskID });
    deleteMutate();
  };
  useEffect(() => {
    setInputs();
  }, []);
  const { title, description, tomatoes, dueDate, completed } = inputState;
  return (
    <form className="flex flex-col gap-6 w-full h-full" onSubmit={handleSubmit}>
      <div
        className="w-full h-[30vh] items-end flex flex-col px-4 justify-between"
        style={{ backgroundColor: inputState.color }}
      >
        <div className="flex justify-between w-full text-3xl items-center md:px-4 md:py-2 ">
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
      <div className="w-full px-4 h-[25vh]  ">
        <textarea
          rows={5}
          value={description}
          type="text"
          name={"description"}
          placeholder={"Description"}
          onChange={handleInput("description")}
          maxLength={200}
          className="w-full outline-none bg-transparent text-xl outline-1 outline-slate-100 rounded-3xl p-5 resize-none shadow-md"
        />
      </div>
      <div className="px-4 w-full flex flex-col lg:flex-row justify-between items-center">
        <div className="flex items-center justify-start gap-2">
          <div className="w-full px-4 flex items-center justify-start">
            <h1 className="pr-2">Due date</h1>
            <DatePicker
              id="date"
              selected={dueDate}
              showIcon
              autoComplete="off"
              placeholderText="Enter date"
              dateFormat="yyyy-MM-dd"
              onChange={(date) => {
                setInputState({ ...inputState, dueDate: date });
              }}
              className="w-full px-2 text-black rounded-full bg-slate-300"
            />
          </div>
          <input
            type="checkbox"
            id="cbx2"
            checked={completed}
            style={{ display: "none" }}
            onChange={(e) => {
              setInputState({ ...inputState, completed: e.target.checked });
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
      <div className="fixed bottom-4 w-full px-4 flex justify-between items-center">
        <button
          className="hover:bg-lime-500 rounded-xl text-xl font-semibold flex items-center justify-centers p-2 transition-all"
          type="submit"
          disabled={isDisabled}
        >
          <BsSave2 className="pr-1" />
          Save
        </button>
        <button
          className="hover:bg-red-500 rounded-xl text-xl font-semibold flex items-center justify-centers p-2 transition-all"
          onClick={() => handleDelete()}
          disabled={isDisabled}
        >
          <BsTrash3 className="pr-1" />
          Delete
        </button>
      </div>
    </form>
  );
}
