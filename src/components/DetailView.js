import React from 'react';
import { useDataQuery } from "@dhis2/app-runtime"

import {
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableCell,
    TableRow,
    TableBody,
    CircularLoader
} from '@dhis2/ui';


const DetailView = (props) => {
    const { orgUnit } = props
    const query = {
        entityInstances: {
            resource: "trackedEntityInstances",
            params: {
                ou: orgUnit.id
            }
        },
    }

    const { loading, error, data } = useDataQuery(query)


    return (
        <>
            {loading ? (
                <CircularLoader dataTest="dhis2-uicore-circularloader" />

            ) : (
                    <Table>
                        <TableHead>
                            <TableRowHead>
                                <TableCellHead>
                                    Key
      </TableCellHead>
                                <TableCellHead>
                                    Value
      </TableCellHead>
                            </TableRowHead>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    id
                    </TableCell>
                                <TableCell dataTest="details-id">
                                    {data.id}
                                    {console.log(data)}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    name
                    </TableCell>
                                <TableCell dataTest="details-name">
                                    {data.name}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    created
                    </TableCell>
                                <TableCell dataTest="details-created">
                                    {data.created}
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                )}
        </>
    )

};

export default DetailView;