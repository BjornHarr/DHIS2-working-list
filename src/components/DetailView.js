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
    const { entityInstances, program } = props
    const [entityValues, setEntityValues] = useState([])
    const dataType = Object.keys(entityInstances)

    useEffect(() => {
        reconstructAttributes(entityInstances)
    }, [entityInstances])

    const reconstructAttributes = (entityInstances) => {
        let entities = []
        let tmp = {}
        entityInstances[dataType].map(instance => {
            instance.attributes.map(attribute => {
                tmp[attribute.code] = attribute.value
            })
            tmp.trackedEntityInstance = instance.trackedEntityInstance
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
                        Date of birth
      </TableCellHead>
                    <TableCellHead>
                        Sex
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
                            {entity.patinfo_ageonsetunit}
                        </TableCell>
                        <TableCell dataTest="details-first-name">
                            {entity.patinfo_sex}
                        </TableCell>
                        <TableCell dataTest="details-first-name">
                            <a href={`http://localhost:9999/hmis/dhis-web-tracker-capture/index.html#/dashboard?tei=${entity.trackedEntityInstance}&program=${program}&ou=iVgNipWEgvE`}>
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