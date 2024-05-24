"use client"

import { useUser } from "@clerk/nextjs"
import Image from "next/image";

export const WelcomeMsg = () => {
    const {user, isLoaded} = useUser();

    return (
        <div className="space-y-2 mb-4 flex justify-between">
            <div>
                <p className="text-sm uppercase tracking-wide text-white">Invest in your future</p>
                <h2 className="text-3xl text-white">Saving & <br /> investing are <br/> made <span className="text-[#49ff9b]">simple</span></h2>
            </div>
            <div>

            <h2 className="text-2xl lg;text-4xl text-white font-medium">
                Welcome Back {isLoaded ? user?.fullName : 'User'}
            </h2>
            <p className="text-sm lg:text-base text-[#49ff9b]">
              This is your Financial Overview Report  
            </p>
            </div>
        </div>

    )
}