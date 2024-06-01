"use client"
import { useNewAccount } from '@/features/accounts/hooks/use-new-account'
import React from 'react'
import { Button } from './ui/button'

const Dashboard = () => {
  const {onOpen} = useNewAccount()

 return (
  <div>
    <Button onClick={onOpen}> 
      Add an account
    </Button>
  </div>
 )
}

export default Dashboard