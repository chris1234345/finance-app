import {useCSVReader} from "react-papaparse";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";

type Props = {
    onUpload: (results: any) => void;
}

export const UploadButton = ({onUpload}: Props) => {
const {CSVReader} = useCSVReader();

const {shouldBlock, triggerPaywall} = usePaywall();

if(shouldBlock) {
    return (

        <Button
        size="sm"
        className="w-full lg:w-auto bg-black text-white hover:bg-black-900 rounded"
        onClick={triggerPaywall}
        >
            <Upload className="size-4 mr-2"/>
            Import
            </Button>
            )
}

return (
    <CSVReader onUploadAccepted={onUpload}>
        {({getRootProps}:any) => (
            <Button
            size="sm"
            className="w-full lg:w-auto bg-black text-white hover:bg-black-900 rounded"
            {...getRootProps()}
            >
            <Upload className="size-4 mr-2"/>
            Import
            </Button>
        )}
    </CSVReader>
)
}