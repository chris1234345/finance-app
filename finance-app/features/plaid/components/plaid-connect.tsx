"use client"

import { useMount } from "react-use"
import { useState } from "react"
import {usePlaidLink} from "react-plaid-link"
import { Button } from "@/components/ui/button"
import { useCreateLinkToken } from "../api/use-create-link-token"
import { useExchangePubliToken } from "../api/use-exchange-pubic-token"

export const PlaidConnect = () => {

    const [token, setToken] = useState<string | null>(null)

    const createLinkToken = useCreateLinkToken()
    const exchangePublicToken = useExchangePubliToken()

    useMount(() => {
        createLinkToken.mutate(undefined, {
            onSuccess: ({data}) => {
                setToken(data)
            }
        })
    })

    const plaid = usePlaidLink({
        token: token,
        onSuccess: (publicToken) => {
            exchangePublicToken.mutate({
                publicToken
            })
        },
        env: "sandbox",
    })

    const onClick = () => {
        plaid.open()
    }

    const isDisabled = !plaid.ready || exchangePublicToken.isPending

    return (
        <Button
        onClick={onClick}
        disabled={isDisabled} className='rounded p-4 text-white hover:text-white' variant="ghost">
            Connect
        </Button>
    )
}