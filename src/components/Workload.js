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