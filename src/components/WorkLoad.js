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
            eventStartDate: "2018-01-30",
            eventEndDate: "2020-10-26",
            pageSize: 1000,
            page: 1,
            totalPages: true,
        }
    }

    /*
        THIS_WEEK, LAST_WEEK, LAST_4_WEEKS, LAST_12_WEEKS, LAST_52_WEEKS,
        THIS_MONTH, LAST_MONTH, THIS_BIMONTH, LAST_BIMONTH, THIS_QUARTER, LAST_QUARTER,
        THIS_SIX_MONTH, LAST_SIX_MONTH, MONTHS_THIS_YEAR, QUARTERS_THIS_YEAR,
        THIS_YEAR, MONTHS_LAST_YEAR, QUARTERS_LAST_YEAR, LAST_YEAR, LAST_5_YEARS, LAST_12_MONTHS,
        LAST_3_MONTHS, LAST_6_BIMONTHS, LAST_4_QUARTERS, LAST_2_SIXMONTHS, THIS_FINANCIAL_YEAR,
        LAST_FINANCIAL_YEAR, LAST_5_FINANCIAL_YEARS
        */


}


const WorkLoad = (props) => {
    const { loading, error, data } = useDataQuery(query)

    useEffect(() => {

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

export default WorkLoad;