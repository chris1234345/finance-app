import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {client} from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.transactions["bulk-create"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.transactions["bulk-create"]["$post"]>["json"];

export const useBulkCreateTransaction = () => {
    const queryClient = useQueryClient();

    const sanitizeData = (data: RequestType): RequestType => {
        return data.map(transaction => {
            // Ensure the amount field is sanitized to an integer
            if (typeof transaction.amount === 'number') {
                transaction.amount = Math.floor(transaction.amount);
            }
            // Add other field checks and sanitizations as necessary
            return transaction;
        });
    };

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const sanitizedData = sanitizeData(json);
            const response = await client.api.transactions["bulk-create"]["$post"]({ json: sanitizedData });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Transaction created");
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
        },
        onError: () => {
            toast.error("Failed to create transactions");
        }
    });
    return mutation;
}