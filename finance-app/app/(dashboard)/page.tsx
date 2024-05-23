import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import { UserButton, useUser } from "@clerk/nextjs"
import Image from "next/image"



export default function Home() {
  return (
<div>
      
      <Sidebar />
      <Header />
</div>

  )
}
