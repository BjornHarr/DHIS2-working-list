import React, { useEffect, useState } from 'react';
import { useDataQuery } from "@dhis2/app-runtime";
import {
    Card,
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableCell,
    TableRow,
    TableBody
} from '@dhis2/ui';

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
            eventStatus: "SCHEDULE",
            eventStartDate: "2018-01-30",
            eventEndDate: "2020-10-26",
            pageSize: 1000,
            page: 1,
            totalPages: true,
        }
    }

}


const Workload = (props) => {
    const { loading, error, data } = useDataQuery(query)

    useEffect(() => {
        if (data) {
            const merged = data.indexWorkload.trackedEntityInstances.concat(data.contactWorkload.trackedEntityInstances)
            console.log(merged);
        }

    }, [data])

    return (
        <>
            <h1>Workload</h1>
            <div
                style={{
                    height: '358px',
                    width: '358px'
                }}
            >
                <Card dataTest="dhis2-uicore-card" />
            </div>
            {console.log("data", data)}

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

};

export default Workload;