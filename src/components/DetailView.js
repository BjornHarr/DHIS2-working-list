import React from 'react';
import {
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableCell,
    TableRow,
    TableBody
} from '@dhis2/ui';


const DetailView = (props) => {
    const { data } = props

    return (
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
    )

};

export default DetailView;