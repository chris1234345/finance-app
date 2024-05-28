"use client"

import { useMountedState } from "react-use"

import { NewAccontSheet } from "@/components/new-account-sheet"

import { EditAccontSheet } from "@/components/edit-account-sheet"

import { NewCategorySheet } from "@/features/accounts copy/components/new-category-sheet copy"
import { EditCategorySheet } from "@/features/accounts copy/components/edit-category-sheet"

export const SheetProvider = () => {
    const isMounted = useMountedState();
    if(!isMounted()) return null;

    return (
        <>
        <NewAccontSheet />
        <EditAccontSheet /> 
        <NewCategorySheet />
        <EditCategorySheet />
        </>
    )
}