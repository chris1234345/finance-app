"use client"
import { useGetAccounts } from '@/features/accounts/api/use-get-accounts'
import { useNewAccount } from '@/features/accounts/hooks/use-new-account'
import React from 'react'
import { Button } from './ui/button'
import { useMountedState } from 'react-use'

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