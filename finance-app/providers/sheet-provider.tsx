"use client"

import { useMountedState } from "react-use"

import { NewAccontSheet } from "@/components/new-account-sheet"

import { EditAccontSheet } from "@/components/edit-account-sheet"

import { EditCategorySheet } from "@/features/categories/components/edit-category-sheet"
import { NewCategorySheet } from "@/features/categories/components/new-category-sheet"
import { NewTransactionSheet } from "@/features/transactions/components/new-transaction-sheet"
import { EditTransactionSheet } from "@/features/transactions/components/edit-transaction-sheet"



export const SheetProvider = () => {
    const isMounted = useMountedState();
    if(!isMounted) return null;
    
    return (
        <>
        <NewAccontSheet />
        <EditAccontSheet /> 
        <NewCategorySheet />
        <EditCategorySheet />

        <NewTransactionSheet />
        <EditTransactionSheet />
        </>
    )
}