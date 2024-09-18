"use client";
import React, { useEffect, useState, Suspense } from "react";
import { LampContainer } from "../components/ui/lamp";
import Card from "../components/ui/card-home";

const Profile = () => {
    const dummyData = {
        booksUploaded: 24,
        donationCount: 3,
        pointGain: 235,
        pointDonation: 437,
        tasks: [
            { title: "Donate a total of 500 points", completed: false, points: 50 },
            { title: "Update profile bio", completed: true, points: 10 },
            { title: "Nggarahi Joren", completed: true, points: 20 },
            { title: "Minta ditraktir Joren", completed: true, points: 20 },
        ],
    };

    const copyToClipboard = () => {
        const username = document.getElementById('username').innerText;
        navigator.clipboard.writeText(username)
    };

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
                    <h1 id="username" className="text-3xl font-semibold">NyahojaLover3000</h1>
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
                    <h2 className="text-2xl font-bold">{dummyData.booksUploaded}</h2>
                    <p className="text-gray-600">Books Uploaded</p>
                </div>
                <div className="text-center p-4 bg-gray-100 rounded-md shadow">
                    <h2 className="text-2xl font-bold">{dummyData.donationCount}</h2>
                    <p className="text-gray-600">Donation Count</p>
                </div>
                <div className="text-center p-4 bg-gray-100 rounded-md shadow">
                    <h2 className="text-2xl font-bold">{dummyData.pointGain}</h2>
                    <p className="text-gray-600">Points Gained</p>
                </div>
                <div className="text-center p-4 bg-gray-100 rounded-md shadow">
                    <h2 className="text-2xl font-bold">{dummyData.pointDonation}</h2>
                    <p className="text-gray-600">Points Donated</p>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold">Tasks</h3>
                <ul className="mt-4 space-y-2">
                    {dummyData.tasks.map((task, index) => (
                        <li key={index} className={`flex flex-row justify-between p-4 rounded-md ${task.completed ? 'bg-green-100' : 'bg-red-100'} shadow`}>
                            {task.title}
                            <p className="text-gray-600">+{task.points} pt</p>
                        </li>
                    ))}
                </ul>
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