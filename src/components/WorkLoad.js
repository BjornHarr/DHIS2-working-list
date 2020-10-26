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

const WorkLoad = (props) => {
    const { data } = props

    return(
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