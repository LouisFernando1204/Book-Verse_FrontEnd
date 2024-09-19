"use client";
import React, { useEffect, useState, Suspense } from "react";
import { LampContainer } from "../components/ui/lamp";
import Card from "../components/ui/card-home";
import { addCompletedTask, getCompletedTasks, getTasks, getIncompletetask} from "../services/Task";
import { getPoints, getpointdonated, getpointdonatedAmount } from "../services/reader";
import { getUploadedBooks} from "../services/book";
import ImageWithSkeleton from "../../src/components/ui/image-with-skeleton";

const Profile = ({identity}) => {
    const [taskdata, setTaskData] = useState([]);
    const [completedtask, setCompletedTask] = useState([])
    const [points,setpoints] = useState([])
    const [uploadbooks,setUploadbooks] = useState([])
    const [pointdonated,setUppointdonated] = useState([])
    const [pointdonatedamount,setUppointdonatedamount] = useState([])
    useEffect(() => {
        const fetchpointdonated = async () => {
            try{
                const getpointdonate = await getpointdonated(identity);
                console.log(getpointdonate)
                setUppointdonated(getpointdonate)
            }catch (error){
                console.log(error)

        }};

        fetchpointdonated()
    }, [])

    useEffect(() => {
        const fetchpointdonatedamount = async () => {
            try{
                const getpointdonatedamount = await getpointdonatedAmount(identity);
                console.log(getpointdonatedamount)
                setUppointdonatedamount(getpointdonatedamount)
            }catch (error){
                console.log(error)

        }};

        fetchpointdonatedamount()
    }, [])

    useEffect(() => {
        const fetchuploadbooks = async () => {
            try{
                const uploadbook = await getUploadedBooks(identity);
                console.log(uploadbook)
                setUploadbooks(uploadbook)
            }catch (error){
                console.log(error)

        }};

        fetchuploadbooks()
    }, [])
    useEffect(() => {
        const fetchpoint = async () => {
            try{
                const point = await getPoints(identity);
                setpoints(point)
            }catch (error){
                console.log(error)

        }};

        fetchpoint()
    }, [])
    useEffect(() => {
        const fetchTask = async () => {
            try{
                const tasks = await getIncompletetask(identity);
                console.log(tasks)
                setTaskData(tasks)
            }catch (error){
                console.log(error)

        }};

       fetchTask()
    }, [])
    useEffect(() => {
        const fetchcompletedtask = async () => {
            try{
                const tasked = await getCompletedTasks(identity);
                console.log(tasked)
                setCompletedTask(tasked)
            }catch (error){
                console.log(error)

        }};

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
        // <LampContainer>
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
        onClick={() => {
          dotask(task.id);
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
                <ul className="mt-4 space-y-2">
                   
                    {/* <Card
                        handleAddToFavorites={handleAddToFavorites}
                        filteredEBooks={filteredEBooks}
                        favoriteEBooks={favoriteEBooks}
                        message={message}
                    /> */}
                    {uploadbooks.map((ebook, index) => (
                        <li>
                            <div>
                            <ImageWithSkeleton
                        src={`https://gateway.pinata.cloud/ipfs/${ebook.cover}`}
                        alt={ebook.title}
                      />
                      <p className="text-gray-600">{ebook.title}</p>
                      </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-8 text-center">
                <button className="px-6 py-3 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition duration-300">
                    Create New Book
                </button>
            </div>
        </div>
        // </LampContainer >
    );
};

export default Profile;


/* Jumlah follower berapa
            Jumlah Following
            Book yang kamu upload berapa
            Jumlah kontribusi donasi (berapa kali)
            Settings (opsional)
            Pop-up create book
            Task for user
            Subscribtion book (specific artist) → kayak onlyfans untuk book */

// subscription button