"use client"

import Dashboard from "@/components/Dashboard"
import Header from "@/components/Header"
import { DataGrid } from "@/components/datagrid"
import { Button } from "@/components/ui/button"
import { useNewAccount } from "@/features/accounts/hooks/use-new-account"
import { UserButton, useUser } from "@clerk/nextjs"
import Image from "next/image"



export default function Home() {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 ">
      <DataGrid />
      <DataCharts />
    </div>
   )
  }
  