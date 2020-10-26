import React, { useEffect, useState } from 'react';
import { useDataQuery } from "@dhis2/app-runtime"
import {
    Table,
    TableCell,
    TableRow,
    TableBody
} from '@dhis2/ui';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




const Workload = () => {
  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(null);

  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
      <>
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
    />

        <Table suppressZebraStriping> 
                <TableBody>
                        <TableRow>
                            <TableCell dataTest="">
                                Index Cases
                            </TableCell>
                            <TableCell dataTest="details-first-name">
                                XXX
                            </TableCell>
                                                            
                        </TableRow>
                        <TableRow>
                            <TableCell dataTest="">
                                Contacts
                            </TableCell>
                            <TableCell dataTest="details-first-name">
                                XXX
                            </TableCell>
                                                            
                        </TableRow>
                        <TableRow>
                            <TableCell dataTest="">
                                Total
                            </TableCell>
                            <TableCell dataTest="details-first-name">
                                XXX
                            </TableCell>
                                                            
                        </TableRow>
                </TableBody>
            </Table >
            
         
        </>

  );
}

export default Workload;