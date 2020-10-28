import React, { useEffect, useState } from 'react';
import { useDataQuery } from "@dhis2/app-runtime"
import './DetailView.css';

import {
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableCell,
    TableRow,
    TableBody,
    Button,
    DropdownButton
} from '@dhis2/ui';
import DropdownMenu from './DropdownMenu';

const DetailView = (props) => {
    const { data } = props
    const [entityInstances, setEntityInstances] = useState()
    const [entityValues, setEntityValues] = useState([])
    const [dropdownValue, setDropdownValue] = useState("Index cases")

    const programMapping = {
        uYjxkTbwRNf: "Index Case",
        DM9n1bUw8W8: "Contact Case"
    }

    useEffect(() => {
        console.log("entityInstances: ", entityInstances)
        if (entityInstances !== undefined) {
            reconstructAttributes(entityInstances)
        }

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

    const populateBoth = () => {
        const merged = data.indexCases.trackedEntityInstances.concat(data.contactCases.trackedEntityInstances)
        return merged
    }


    const dropdownCallback = (event) => {
        setDropdownValue(event.value)
        switch (event.value) {
            case "Index cases":
                setEntityInstances(data.indexCases.trackedEntityInstances)
                break;
            case "Contact cases":
                setEntityInstances(data.contactCases.trackedEntityInstances)
                break;
            case "Both":
                setEntityInstances(populateBoth)
                break;
            default:
                console.log("Unable to parse dropdown value");
        }
    }

    return (
        <>
            <DropdownButton
                component={<DropdownMenu callback={dropdownCallback} />}
                dataTest="dhis2-uicore-dropdownbutton"
                name="default"
                secondary
                large
                value={dropdownValue}
                className='dropDown'
            >
                {dropdownValue}
            </DropdownButton>
            {entityValues && (
                <Table className='detailViewTable'>
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
                            <TableRow>
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
                                    <a href={`http://localhost:9999/dhis-web-tracker-capture/index.html#/dashboard?tei=${entity.trackedEntityInstance}&program=${entity.program}&ou=iVgNipWEgvE`}>
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
            )}

        </>
    )

};

export default DetailView;
