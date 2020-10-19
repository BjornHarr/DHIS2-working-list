import React, { useEffect, useState } from 'react';
import { useDataQuery } from "@dhis2/app-runtime"

import {
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableCell,
    TableRow,
    TableBody,
    Button
} from '@dhis2/ui';

const DetailView = (props) => {
    const { entityInstances } = props
    const [entityValues, setEntityValues] = useState([])

    const programMapping = {
        uYjxkTbwRNf: "Index Case",
        DM9n1bUw8W8: "Contact Case"
    }

    useEffect(() => {
        console.log("entityInstances: ", entityInstances)
        reconstructAttributes(entityInstances)
    }, [entityInstances])

    const reconstructAttributes = (entityInstances) => {
        let entities = []
        let tmp = {}
        entityInstances.map(entity => {
            entity.attributes.map(attribute => {
                tmp[attribute.code] = attribute.value
            })
            tmp.trackedEntityInstance = entity.trackedEntityInstance
            tmp.program = entity.programOwners[0].program
            entities.push(tmp)
            tmp = []
        })
        setEntityValues(entities)
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
                </TableRowHead>
            </TableHead>
            <TableBody>
                {entityValues.map(entity => (
                    <TableRow onClick={() => console.log("CLICKED")}>
                        <TableCell dataTest="details-first-name">
                            {entity.first_name}
                        </TableCell>
                        <TableCell dataTest="details-first-name">
                            {entity.surname}
                        </TableCell>
                        <TableCell dataTest="details-first-name">
                            {entity.phone_local ? entity.phone_local : entity.parent_telephone}
                        </TableCell>
                        <TableCell dataTest="details-first-name">
                            {programMapping[entity.program]}
                        </TableCell>
                        <TableCell dataTest="details-first-name">
                            <a href={`http://localhost:9999/hmis/dhis-web-tracker-capture/index.html#/dashboard?tei=${entity.trackedEntityInstance}&program=${entity.program}&ou=iVgNipWEgvE`}>
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
                    </TableRow>
                ))
                }
            </TableBody>
        </Table >

    )

};

export default DetailView;