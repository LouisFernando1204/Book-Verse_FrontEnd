/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
"use client";
import { useEffect, useState } from "react";
import { addCompletedTask, getCompletedTasks, getIncompletetask } from "../services/Task";
import { getPoints, getpointdonated, getpointdonatedAmount } from "../services/reader";
import { getUploadedBooks } from "../services/book";
import ImageWithSkeleton from "../../src/components/ui/image-with-skeleton";
import LoadingScreen from "../components/ui/loading-screen";

const Profile = ({ identity }) => {
    const [taskData, setTaskData] = useState([]);
    const [completedTask, setCompletedTask] = useState([])
    const [points, setpoints] = useState([])
    const [uploadBooks, setUploadbooks] = useState([])
    const [pointDonated, setUppointdonated] = useState([])
    const [pointDonatedAmount, setUppointdonatedamount] = useState([])
    const [changes, setChanges] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchpointdonated = async () => {
            try{
                setLoading(true);
                const getpointdonate = await getpointdonated(identity);
                setUppointdonated(getpointdonate)
                setLoading(false);
            }catch (error){
                console.log(error)

        }};

        fetchpointdonated()
    }, [changes])

    useEffect(() => {
        const fetchpointdonatedamount = async () => {
            try{
                setLoading(true);
                const getpointdonatedamount = await getpointdonatedAmount(identity);
                setUppointdonatedamount(getpointdonatedamount)
                setLoading(false);
            }catch (error){
                console.log(error)

        }};

        fetchpointdonatedamount()
    }, [changes])

    useEffect(() => {
        const fetchuploadbooks = async () => {
            try{
                setLoading(true);
                const uploadbook = await getUploadedBooks(identity);
                setUploadbooks(uploadbook)
                setLoading(false);
            }catch (error){
                console.log(error)

        }};

        fetchuploadbooks()
    }, [changes])

    useEffect(() => {
        const fetchpoint = async () => {
            try{
                setLoading(true);
                const point = await getPoints(identity);
                setpoints(point)
                setLoading(false);
            }catch (error){
                console.log(error)

        }};

        fetchpoint()
    }, [changes])

    useEffect(() => {
        const fetchTask = async () => {
            try{
                setLoading(true);
                const tasks = await getIncompletetask(identity);
                setTaskData(tasks)
                setLoading(false);
            }catch (error){
                console.log(error)
        }};

       fetchTask()
    }, [changes])

    useEffect(() => {
        const fetchcompletedtask = async () => {
            try{
                setLoading(true);
                const tasked = await getCompletedTasks(identity);
                setCompletedTask(tasked)
                setLoading(false);
            }catch (error){
                console.log(error)

        }};

        fetchcompletedtask()
    }, [changes])

    const copyToClipboard = () => {
        const username = document.getElementById('username').innerText;
        navigator.clipboard.writeText(username)
    };

    const dotask = async (id) => {
        await addCompletedTask(id)
    }

    console.log("incomplete task", taskData);
    console.log("complete task", completedTask);
    console.log("upload books", uploadBooks);

    return (
        loading ? (
            <LoadingScreen />
        ) : (
            <div className="max-w-6xl mx-auto p-8 m-8 bg-white shadow-md rounded-lg relative z-10">
                <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-8">
                    <div className="w-32 h-32">
                        <img
                            src={`https://api.dicebear.com/9.x/adventurer/jpg?seed=${identity}`}
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
                        <h2 className="text-2xl font-bold">{uploadBooks.length}</h2>
                        <p className="text-gray-600">Books Uploaded</p>
                    </div>
                    <div className="text-center p-4 bg-gray-100 rounded-md shadow">
                        <h2 className="text-2xl font-bold">{pointDonated}</h2>
                        <p className="text-gray-600">Donation Count</p>
                    </div>
                    <div className="text-center p-4 bg-gray-100 rounded-md shadow">
                        <h2 className="text-2xl font-bold">{points}</h2>
                        <p className="text-gray-600">Points Gained</p>
                    </div>
                    <div className="text-center p-4 bg-gray-100 rounded-md shadow">
                        <h2 className="text-2xl font-bold">{pointDonatedAmount}</h2>
                        <p className="text-gray-600">Points Donated</p>
                    </div>
                </div>
                <div className="mt-8">
                    <div>
                        <h3 className="text-xl font-semibold">Tasks</h3>
                        <ul className="mt-4 space-y-2">
                            {taskData.map((task) => (
                                <li key={task.id} className="flex flex-row justify-between p-4 rounded-md bg-red-100">
                                    <button
                                        onClick={async () => {
                                            window.open(task.url, '_blank'); 
                                            await new Promise(resolve => setTimeout(resolve, 500)); 
                                            await dotask(task.id); 
                                            setChanges(prev => !prev); 
                                        }}
                                        className="flex justify-between w-full text-left mb-3"
                                    >
                                        <span>{task.name}</span>
                                        <p className="text-gray-600">+{Number(task.point)} pt</p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="my-5">
                        <h3 className="text-xl font-semibold mb-5">Completed Tasks</h3>
                        <ul>
                            {completedTask.map((tasked) => (
                                <li key={tasked.id} className={`flex flex-row justify-between p-4 mb-3 rounded-md bg-green-100`}>
                                    {tasked.name}
                                    <p className="text-gray-600">+{Number(tasked.point)} pt</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-8">
                    <h3 className="text-xl font-semibold">Your Books</h3>
                    <ul className="mt-4 flex flex-wrap gap-4">
                        {uploadBooks.map((ebook) => (
                            <li key={ebook.id} className="flex-none w-64">
                                <div className="flex flex-col items-center p-4 bg-whizte rounded-md shadow-md transition hover:bg-blue-100">
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
        )
    );
};

export default Profile;