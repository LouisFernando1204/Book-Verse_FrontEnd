"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../components/ui/lamp";

const Profile = () => {
    const dummyData = {
        followers: 1200,
        following: 150,
        booksUploaded: 24,
        donations: 5,
        rewards: {
            flowers: 10,
            planes: 3,
            ships: 1,
        },
        tasks: [
            { title: "Finish writing Chapter 1", completed: false },
            { title: "Update profile bio", completed: true },
        ],
    };

    return (

        // <LampContainer>
        <div className="max-w-4xl mx-auto p-5 bg-white shadow-md rounded-lg relative z-10">
            <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-8">
                <div className="w-32 h-32">
                    <img
                        src="https://avatars.githubusercontent.com/u/114904516?v=4"
                        alt="Profile Picture"
                        className="rounded-full object-cover shadow-lg w-full h-full"
                    />
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-semibold">NyahojaLover3000</h1>
                    <p className="text-gray-600">Penghuni UC Library</p>
                    <button className="mt-2 px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300">
                        Subscribe
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="text-center p-4 bg-gray-100 rounded-md shadow">
                    <h2 className="text-2xl font-bold">{dummyData.followers}</h2>
                    <p className="text-gray-600">Followers</p>
                </div>
                <div className="text-center p-4 bg-gray-100 rounded-md shadow">
                    <h2 className="text-2xl font-bold">{dummyData.following}</h2>
                    <p className="text-gray-600">Following</p>
                </div>
                <div className="text-center p-4 bg-gray-100 rounded-md shadow">
                    <h2 className="text-2xl font-bold">{dummyData.booksUploaded}</h2>
                    <p className="text-gray-600">Books Uploaded</p>
                </div>
                <div className="text-center p-4 bg-gray-100 rounded-md shadow">
                    <h2 className="text-2xl font-bold">{dummyData.donations}</h2>
                    <p className="text-gray-600">Donations</p>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold">Rewards</h3>
                <div className="flex space-x-4 mt-4">
                    <div className="text-center p-4 bg-green-100 rounded-md shadow">
                        <h2 className="text-2xl font-bold">{dummyData.rewards.flowers}</h2>
                        <p className="text-gray-600">Flowers</p>
                    </div>
                    <div className="text-center p-4 bg-blue-100 rounded-md shadow">
                        <h2 className="text-2xl font-bold">{dummyData.rewards.planes}</h2>
                        <p className="text-gray-600">Planes</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-100 rounded-md shadow">
                        <h2 className="text-2xl font-bold">{dummyData.rewards.ships}</h2>
                        <p className="text-gray-600">Ships</p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold">Tasks</h3>
                <ul className="mt-4 space-y-2">
                    {dummyData.tasks.map((task, index) => (
                        <li key={index} className={`p-4 rounded-md ${task.completed ? 'bg-green-100' : 'bg-red-100'} shadow`}>
                            {task.title}
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
            Reward yang udah didapatkan (bunga berapa, pesawat berapa, kapal berapa)
            Settings (opsional)
            Pop-up create book
            Task for user
            Subscribtion book (specific artist) → kayak onlyfans untuk book */

// subscription button