import React from 'react'
import { Table, TableHead, TableRowHead, TableCellHead, TableCell, TableRow, TableBody, Button, DropdownButton } from '@dhis2/ui';


const CasesTable = (props) => {
    const { data, displayOverlay } = props

    const programMapping = {
        uYjxkTbwRNf: "Index Case",
        DM9n1bUw8W8: "Contact Case",
    }

    return (
        <Table>
            <TableHead>
                <TableRowHead>
                    <TableCellHead>
                        First name
</TableCellHead>
                    <TableCellHead>
                        Surname
</TableCellHead>
                    <TableCellHead>
                        Phone number
</TableCellHead>
                    <TableCellHead>
                        Case type
</TableCellHead>
                    <TableCellHead>
                        Details
</TableCellHead>
                    <TableCellHead>
                    </TableCellHead>
                </TableRowHead>

            </TableHead>
            <TableBody>
                {data.map(el => (
                    <TableRow>
                        <TableCell dataTest="details-first-name">
                            {el.first_name}
                        </TableCell>
                        <TableCell dataTest="details-first-name">
                            {el.surname}
                        </TableCell>
                        <TableCell dataTest="details-first-name">
                            {el.phone_local ? el.phone_local : el.parent_telephone}
                        </TableCell>
                        <TableCell dataTest="details-first-name">
                            {programMapping[el.program]}
                        </TableCell>
                        <TableCell dataTest="details-first-name">
                            <a href={`http://localhost:9999/dhis-web-tracker-capture/index.html#/dashboard?tei=${el.trackedEntityInstance}&program=${el.program}&ou=iVgNipWEgvE`}>
                                <Button
                                    dataTest="dhis2-uicore-button"
                                    name="Primary button"
                                    primary
                                    type="button"
                                    value="default"
                                >
                                    Details
                                  </Button>
                            </a>
                        </TableCell>

                        {programMapping[el.program] == "Index Case" && (
                            <TableCell dataTest="deta-first-name">
                                <Button
                                    dataTest="dhis2-uicore-button"
                                    name="Basic button"
                                    onClick={(event) => displayOverlay(event)}
                                    type="button"
                                    value={el.relationships}
                                >
                                    Contact cases
                                  </Button>
                            </TableCell>
                        )}
                    </TableRow>
                ))
                }
            </TableBody>
        </Table>
    )
}

export default CasesTable
