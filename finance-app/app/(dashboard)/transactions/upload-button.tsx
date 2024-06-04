import {useCSVReader} from "react-papaparse";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

type Props = {
    onUpload: (results: any) => void;
}

export const UploadButton = ({onUpload}: Props) => {
const {CSVReader} = useCSVReader();

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