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

const query = {
    entityInstances: {
        resource: "trackedEntityInstances",
        params: {
            ou: "iVgNipWEgvE",
            program: "uYjxkTbwRNf"
        }
    },
}

const DetailView = (props) => {
    const { program } = props
    const reconstructAttributes = (entityInstances) => {
        let entities = []
        let tmp = {}
        entityInstances.trackedEntityInstances.map(instance => {
            instance.attributes.map(attribute => {
                tmp[attribute.code] = attribute.value
            })
            tmp.trackedEntityInstance = instance.trackedEntityInstance
            entities.push(tmp)
            tmp = {}
        })

        setEntityValues(entities)
    }
    const [entityValues, setEntityValues] = useState([])
    const { loading, error, data } = useDataQuery(query, {
        variables: {
            program: program
        },
        onComplete: (res) => reconstructAttributes(res.entityInstances),
    })




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
                {console.log("data: ", data)}
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
                            <a href={`http://localhost:9999/hmis/dhis-web-tracker-capture/index.html#/dashboard?tei=${entity.trackedEntityInstance}&program=uYjxkTbwRNf&ou=iVgNipWEgvE`}>
                                <Button
                                    dataTest="dhis2-uicore-button"
                                    name="Primary button"
                                    onClick={function logger(_ref) { var name = _ref.name, value = _ref.value; return console.info("".concat(name, ": ").concat(value)) }}
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