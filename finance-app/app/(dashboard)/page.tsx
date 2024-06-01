"use client"

import Dashboard from "@/components/Dashboard"
import Header from "@/components/Header"
import { Button } from "@/components/ui/button"
import { useNewAccount } from "@/features/accounts/hooks/use-new-account"
import { UserButton, useUser } from "@clerk/nextjs"
import Image from "next/image"



export default function Home() {
  const {onOpen} = useNewAccount()
  return (
    <div>
      <button onClick={onOpen}>
        Add an account
      </button>
    </div>
   )
  }
  