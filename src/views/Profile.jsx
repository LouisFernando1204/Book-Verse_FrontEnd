/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
"use client";
import { useEffect, useState } from "react";
import { addCompletedTask, getCompletedTasks, getIncompletetask } from "../services/Task";
import { getPoints, getpointdonated, getpointdonatedAmount } from "../services/reader";
import { getUploadedBooks } from "../services/book";
import ImageWithSkeleton from "../../src/components/ui/image-with-skeleton";

const Profile = ({ identity }) => {
    const [taskdata, setTaskData] = useState([]);
    const [completedtask, setCompletedTask] = useState([])
    const [points, setpoints] = useState([])
    const [uploadbooks, setUploadbooks] = useState([])
    const [pointdonated, setUppointdonated] = useState([])
    const [pointdonatedamount, setUppointdonatedamount] = useState([])
    useEffect(() => {
        const fetchpointdonated = async () => {
            try {
                const getpointdonate = await getpointdonated(identity);
                console.log(getpointdonate)
                setUppointdonated(getpointdonate)
            } catch (error) {
                console.log(error)

            }
        };

        fetchpointdonated()
    }, [])

    useEffect(() => {
        const fetchpointdonatedamount = async () => {
            try {
                const getpointdonatedamount = await getpointdonatedAmount(identity);
                console.log(getpointdonatedamount)
                setUppointdonatedamount(getpointdonatedamount)
            } catch (error) {
                console.log(error)

            }
        };

        fetchpointdonatedamount()
    }, [])

    useEffect(() => {
        const fetchuploadbooks = async () => {
            try {
                const uploadbook = await getUploadedBooks(identity);
                console.log(uploadbook)
                setUploadbooks(uploadbook)
            } catch (error) {
                console.log(error)

            }
        };

        fetchuploadbooks()
    }, [])
    useEffect(() => {
        const fetchpoint = async () => {
            try {
                const point = await getPoints(identity);
                setpoints(point)
            } catch (error) {
                console.log(error)

            }
        };

        fetchpoint()
    }, [])
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const tasks = await getIncompletetask(identity);
                console.log(tasks)
                setTaskData(tasks)
            } catch (error) {
                console.log(error)

            }
        };

        fetchTask()
    }, [])
    useEffect(() => {
        const fetchcompletedtask = async () => {
            try {
                const tasked = await getCompletedTasks(identity);
                console.log(tasked)
                setCompletedTask(tasked)
            } catch (error) {
                console.log(error)

            }
        };

        fetchcompletedtask()
    }, [])

    const copyToClipboard = () => {
        const username = document.getElementById('username').innerText;
        navigator.clipboard.writeText(username)
    };

    const dotask = async (id) => {
        await addCompletedTask(id)
    }

    return (
        <div className="max-w-6xl mx-auto p-8 m-8 bg-white shadow-md rounded-lg relative z-10">
            <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-8">
                <div className="w-32 h-32">
                    <img
                        src="https://avatars.githubusercontent.com/u/114904516?v=4"
                        alt="Profile Picture"
                        className="rounded-full object-cover shadow-lg w-full h-full"
                    />
                </div>
                <div className="text-center md:text-left flex flex-row justify-start gap-2 items-center">
                    <h1 id="username" className="text-3xl font-semibold">{identity}</h1>
                    <img
                        className="w-6 h-6 cursor-pointer"
                        src="https://img.icons8.com/fluency-systems-regular/50/copy--v1.png"
                        alt="copy--v1"
                        onClick={copyToClipboard}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="text-center p-4 bg-gray-100 rounded-md shadow">
                    <h2 className="text-2xl font-bold">{uploadbooks.length}</h2>
                    <p className="text-gray-600">Books Uploaded</p>
                </div>
                <div className="text-center p-4 bg-gray-100 rounded-md shadow">
                    <h2 className="text-2xl font-bold">{pointdonated}</h2>
                    <p className="text-gray-600">Donation Count</p>
                </div>
                <div className="text-center p-4 bg-gray-100 rounded-md shadow">
                    <h2 className="text-2xl font-bold">{points}</h2>
                    <p className="text-gray-600">Points Gained</p>
                </div>
                <div className="text-center p-4 bg-gray-100 rounded-md shadow">
                    <h2 className="text-2xl font-bold">{pointdonatedamount}</h2>
                    <p className="text-gray-600">Points Donated</p>
                </div>
            </div>
            <div className="mt-8">
                <div>
                    <h3 className="text-xl font-semibold">Tasks</h3>
                    <ul className="mt-4 space-y-2">
                        {taskdata.map((task, index) => (
                            <li key={index} className="flex flex-row justify-between p-4 rounded-md bg-red-100">
                                <button
                                    onClick={async() => {
                                        await dotask(task.id);
                                        window.open(task.url, '_blank');
                                    }}
                                    className="flex justify-between w-full text-left mb-3"
                                >
                                    <span>{task.name}</span>
                                    <p className="text-gray-600">+{task.point} pt</p>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="my-5">
                    <h3 className="text-xl font-semibold mb-5">Completed Tasks</h3>
                    <ul>
                        {completedtask.map((tasked, index) => (
                            <li key={index} className={`flex flex-row justify-between p-4 mb-3 rounded-md bg-green-100`}>
                                {tasked.name}
                                <p className="text-gray-600">+{tasked.point} pt</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="mt-8">
                <h3 className="text-xl font-semibold">Your Books</h3>
                <ul className="mt-4 flex flex-wrap gap-4">
                    {uploadbooks.map((ebook, index) => (
                        <li key={index} className="flex-none w-64">
                            <div className="flex flex-col items-center p-4 bg-white rounded-md shadow-md transition hover:bg-blue-100">
                                <div className="w-60 h-22">
                                    <ImageWithSkeleton
                                        src={`https://gateway.pinata.cloud/ipfs/${ebook.cover}`}
                                        alt={ebook.title}
                                        className="w-1/3 h-1/3 object-cover"
                                    />
                                </div>
                                <p className="text-gray-600 mt-2 text-center text-Bold">{ebook.title}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Profile;