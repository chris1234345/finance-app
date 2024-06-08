import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {client} from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.subscriptions.checkout["$post"], 200>;

export const useCheckoutSubscription = () => {

    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            const response = await client.api.subscriptions.checkout.$post();
            if(!response.ok){
                throw Error("failed to create URL")
            }
            return await response.json();
        },
        onSuccess: ({data}) => {
            if (typeof data === 'string') {
                // If data is a string, we can safely assign it
                window.location.href = data;
            } else {
                // If data is an object, we need to use the string property 'portalUrl'
                window.location.href = data.portalUrl;
            }
        },
        onError: () => {
            toast.error("failed to create URL")
        }
    });
    return mutation;
}