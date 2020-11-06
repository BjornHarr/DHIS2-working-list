import React, { useEffect, useState } from 'react'
import { useConfig } from "@dhis2/app-runtime"
import { Table, TableHead, TableRowHead, TableCellHead, TableCell, TableRow, TableBody, Button } from '@dhis2/ui';


const CasesTable = (props) => {
    const { data, displayOverlay, viewContext } = props
    const [sortedData, setSortedDate] = useState()
    const { baseUrl } = useConfig()

    useEffect(() => {
        let tmpSorted = data.sort((a, b) => {
            const aDate = new Date(a.dueDate)
            const bDate = new Date(b.dueDate)
            return aDate - bDate
        })
        setSortedDate(tmpSorted)
    }, [data])

    const programMapping = {
        uYjxkTbwRNf: "Index Case",
        DM9n1bUw8W8: "Contact Case",
    }

    const formatDueDate = (dueDate) => {
        let tmpDate = dueDate.split('T')
        let newDate = tmpDate[0].toString()
        return newDate
    }

    return (
        <Table>
            <TableHead>
                <TableRowHead>
                    <TableCellHead>
                        Due date
</TableCellHead>
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
                        TCA
</TableCellHead>
                    {viewContext !== "Contact cases" && (
                        <TableCellHead>
                            Contacts
                        </TableCellHead>
                    )}
                </TableRowHead>

            </TableHead>
            <TableBody>
                {data.map(el => (
                    <TableRow key={el.trackedEntityInstance}>
                        <TableCell dataTest="details-due-date">
                            {formatDueDate(el.dueDate)}
                        </TableCell>
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
                            <a href={`${baseUrl}/dhis-web-tracker-capture/index.html#/dashboard?tei=${el.trackedEntityInstance}&program=${el.program}&ou=iVgNipWEgvE`} target="_blank">
                                <Button
                                    dataTest="dhis2-uicore-button"

                                    icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="external-link-alt" role="img" viewBox="0 0 512 512">
                                        <path fill="currentColor" d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z"></path>

                                    </svg>}
                                    name="Icon small button"
                                    small
                                    type="button"
                                    value="default"
                                >
                                </Button>

                            </a>
                        </TableCell>

                        {viewContext !== "Contact cases" && (
                            <TableCell dataTest="deta-first-name">
                                {programMapping[el.program] == "Contact Case" ?
                                    (
                                        "N/A"
                                    ) : (
                                        <Button
                                            dataTest="dhis2-uicore-button"
                                            icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-friends" role="img" viewBox="0 0 640 512">
                                                <path fill="currentColor" d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"></path>
                                            </svg>}
                                            name="Basic button"
                                            disabled={el.relationships.length > 0 ? false : true}
                                            onClick={(event) => displayOverlay(event)}
                                            type="button"
                                            value={JSON.stringify(el.relationships)}

                                        >
                                            {String(el.relationships.length)}
                                        </Button>
                                    )}
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
