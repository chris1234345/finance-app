"use client"

import { useMountedState } from "react-use"

import { NewAccontSheet } from "@/components/new-account-sheet"

export const SheetProvider = () => {
    const isMounted = useMountedState();
    if(!isMounted()) return null;

    return (
        <>
        <NewAccontSheet />
        </>
    )
}