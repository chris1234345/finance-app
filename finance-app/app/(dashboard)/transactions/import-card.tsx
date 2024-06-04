const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd"

const requiredOptions = [
    "amount",
    "date",
    "payee",
];

import {format, parse} from 'date-fns';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
  
  } from '@/components/ui/card'

  import { Button } from '@/components/ui/button'
import { useState } from 'react';
import { ImportTable } from './import-table';
import { convertAmountToMiliunits } from '@/lib/utils';


interface SelectedColumnsState {
    [key:string] : string | null;
}

type Props = {
    data: string[][];
    onCancel: () => void;
    onSumbit: (data:any) => void;
}


export const ImportCard = ({data, onCancel, onSumbit} :Props) => {

     const [selectedColumns, setselectedColumns] = useState<SelectedColumnsState>({});

    const headers = data[0];
    const body = data.slice(1);

    const onTableHeadSelectChange = (
        columnIndex: number,
        value: string | null
    ) => {
        setselectedColumns((prev) => {
            const newSelectedColumns = {...prev};

            for (const key in newSelectedColumns) {
                if (newSelectedColumns[key] === value) {
                    newSelectedColumns[key] = null;
                }
            }

            if(value === "skip") {
                value = null;
            }

            newSelectedColumns[`column_${columnIndex}`] = value;  
            return newSelectedColumns;  
        })
    }

    const progress = Object.values(selectedColumns).filter(Boolean).length;

    const handleContinue = () => {
        const getColumnIndex = (column: string) => {
            return column.split("_")[1]
        };

        const mappedData = {
            headers: headers.map((_header, index) => {
                const columnIndex = getColumnIndex(`column_${index}`);
                return selectedColumns[`column_${columnIndex}`] || null;
            }),
            body: body.map((row) => {
                const transformedRow = row.map((cell, index) => {
                    const columnIndex = getColumnIndex(`column_${index}`);
                    return selectedColumns[`column_${columnIndex}`] ? cell : null;
                });

                return transformedRow.every((item) => item === null)
                ? []
                : transformedRow;
            }).filter((row) => row.length > 0)
        }

       
        const arrayOfData = mappedData.body.map((row) => {
            
            return row.reduce((acc: any, cell, index) => {
                const header = mappedData.headers[index];
                if (header !== null) {
                    acc[header] = cell;
                }
                return acc;
            }, {})
        })

        const formatteData = arrayOfData.map((item) => ({
            ...item,
            amount: convertAmountToMiliunits(parseFloat(item.amount)),
            date: format(parse(item.date, dateFormat, new Date()),outputFormat)
        }))

        onSumbit(formatteData);
    };


    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 bg-white rounded">
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          <CardTitle className='text-xl line-clamp-1'>
        Import Transaction
          </CardTitle>
          <div className='flex flex-col lg:flex-row gap-y-2 items-center gap-x-2'>
          <Button onClick={onCancel} className='bg-black text-white hover:bg-black hover:text-white rounded w-full lg:w-auto' size="sm">
            Cancel
        </Button>
          <Button disabled={progress < requiredOptions.length}
          onClick={handleContinue}
          size="sm"
          className='w-full lg:w-auto bg-black text-white rounded'
          >
            Continue ({progress} / {requiredOptions.length})
          </Button>
          </div>
        </CardHeader>
        <CardContent className='bg-white'>
            <ImportTable 
            headers={headers}
            body={body}
            selectedColumns={selectedColumns}
            onTableHeadSelectChange={onTableHeadSelectChange}

            />
         </CardContent>
         </Card>
         </div>
    )
}