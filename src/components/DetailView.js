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
    CircularLoader
} from '@dhis2/ui';


const DetailView = (props) => {
    const { entityInstances } = props
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
                {console.log(entityValues)}
                {entityValues.map(entity => (
                    <TableRow>
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
                            Button
                        </TableCell>
                    </TableRow>

                ))
                }
            </TableBody>
        </Table >

    )

};

export default DetailView;