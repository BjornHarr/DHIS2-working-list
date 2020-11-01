import React, { useEffect, useState } from 'react';
import { useDataQuery } from "@dhis2/app-runtime"
import {
    Table,
    TableCell,
    TableRow,
    TableBody
} from '@dhis2/ui';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Workload.css';

const query = {
    contactWorkload: {
        resource: "trackedEntityInstances",
        params: {
            fields: "*",
            program: "DM9n1bUw8W8",
            ou: "iVgNipWEgvE",
            order: "created:desc",
            ouMode: "SELECTED",
            programStatus: "ACTIVE",
            eventStatus: "OVERDUE",
            eventStartDate: "2018-01-30",
            eventEndDate: "2020-10-26",
            pageSize: 1000,
            page: 1,
            totalPages: true,
        }
    },
    indexWorkload: {
        resource: "trackedEntityInstances",
        params: {
            fields: "*",
            program: "uYjxkTbwRNf",
            ou: "iVgNipWEgvE",
            order: "created:desc",
            ouMode: "SELECTED",
            programStatus: "ACTIVE",
            eventStartDate: "2018-01-30",
            eventEndDate: "2020-10-26",
            pageSize: 1000,
            page: 1,
            totalPages: true,
        }
    }
}


const Workload = () => {
    const { loading, error, data } = useDataQuery(query)
    const [startDate, setStartDate] = useState(new Date());

    const [endDate, setEndDate] = useState(null);

    const onChange = dates => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };


    useEffect(() => {
        if (data) {
            const merged = data.indexWorkload.trackedEntityInstances.concat(data.contactWorkload.trackedEntityInstances)
            console.log(merged);
        }

    }, [data])

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

                    </TableRow>
                    <TableRow>
                        <TableCell className="left-column">
                            Total
                        </TableCell>
                        <TableCell className="right-column">
                            XXX
                        </TableCell>

                    </TableRow>
                </TableBody>
            </Table >
        </div>
    );
}

export default Workload;