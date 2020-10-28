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

import './Workload.css';


const Workload = () => {
    const [startDate, setStartDate] = useState(new Date());

    const [endDate, setEndDate] = useState(null);

    const onChange = dates => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <div id='workloadContent'>
            <div className='datePicker'>
                <DatePicker
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                />
            </div>
            <Table suppressZebraStriping className='workLoadTable'>
                <TableBody>
                    <TableRow>
                        <TableCell dataTest="" className='leftColumn'>
                            Index Cases
                            </TableCell>
                        <TableCell dataTest="details-first-name" className='rightColumn'>
                            XXX
                            </TableCell>

                    </TableRow>
                    <TableRow>
                        <TableCell dataTest="" className='leftColumn'>
                            Contacts
                            </TableCell>
                        <TableCell dataTest="details-first-name" className='rightColumn'>
                            XXX
                            </TableCell>

                    </TableRow>
                    <TableRow>
                        <TableCell dataTest="" className='leftColumn'>
                            Total
                            </TableCell>
                        <TableCell dataTest="details-first-name" className='rightColumn'>
                            XXX
                            </TableCell>

                    </TableRow>
                </TableBody>
            </Table >


        </div>

    );
}

export default Workload;