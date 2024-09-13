"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../components/ui/lamp";

const Profile = () => {
    return (
        <div>
            <LampContainer>
                <motion.h1
                    initial={{ opacity: 0.5, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
                >
                    Build lamps <br /> the right way
                </motion.h1>
            </LampContainer>
            PROFILE

            {/* Jumlah follower berapa
            Jumlah Following
            Book yang kamu upload berapa
            Jumlah kontribusi donasi (berapa kali)
            Reward yang udah didapatkan (bunga berapa, pesawat berapa, kapal berapa)
            Settings (opsional)
            Pop-up create book
            Task for user
            Subscribtion book (specific artist) → kayak onlyfans untuk book */}

            subscription button

        </div>
    )
}

export default Profile