import React, { useEffect, useState } from 'react';
import { useDataQuery } from "@dhis2/app-runtime"
import {
    Table,
    TableCell,
    TableRow,
    TableBody,
    Button
} from '@dhis2/ui';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Workload.css';

const query = {
    indexCases: {
        resource: "events",
        params: {
            fields: "*",
            program: "uYjxkTbwRNf",
            orgUnit: "iVgNipWEgvE",
            ouMode: "SELECTED",
            programStatus: "ACTIVE",
            status: "SCHEDULE",
            page: 1,
            totalPages: true
        }
    },
    contactCases: {
        resource: "events",
        params: {
            fields: "*",
            program: "uYjxkTbwRNf",
            orgUnit: "iVgNipWEgvE",
            ouMode: "SELECTED",
            programStatus: "ACTIVE",
            status: "SCHEDULE",
            page: 1,
            totalPages: true
        }
    }
}



const Workload = () => {
    const { loading, error, data } = useDataQuery(query)
    const [workload, setWorkload] = useState()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const onChange = dates => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };


    useEffect(() => {
        console.log(data);

    }, [data])

    const calculateWorkload = () => {
        const startEpoch = startDate.getTime()
        const endEpoch = endDate.getTime()
        const tmpWorkload = {
            indexCases: 0,
            contactCases: 0,
            total: 0
        }
        data.workload.events.map(event => {
            const dueDate = Date.parse(event.dueDate)
            if (dueDate >= startEpoch && dueDate <= endEpoch) {
                if (event.program == "uYjxkTbwRNf") {
                    tmpWorkload.indexCases++
                } else if (event.program == "DM9n1bUw8W8") {
                    tmpWorkload.contactCases++
                } else {
                    console.log("Program not recognized")
                }
                tmpWorkload.total++
            }
        })
        setWorkload(tmpWorkload)
    }

    return (
        <div id="workload-content">
            <div className="date-picker">
                <DatePicker
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                />
            </div>

            <Table suppressZebraStriping className="workload-table">
                <TableBody>
                    <TableRow>
                        <TableCell className="left-column">
                            Index Cases
                        </TableCell>
                        <TableCell className="right-column">
                            XXX
                        </TableCell>

                    </TableRow>
                    <TableRow>
                        <TableCell className="left-column">
                            Contacts
                        </TableCell>
                        <TableCell className="right-column">
                            XXX
                        </TableCell>
                            <TableCell dataTest="details-first-name">
                                {workload.indexCases}
                            </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="left-column">
                            Total
                        </TableCell>
                        <TableCell className="right-column">
                            XXX
                        </TableCell>
                            <TableCell dataTest="details-first-name">
                                {workload.total}
                            </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}

export default Workload;