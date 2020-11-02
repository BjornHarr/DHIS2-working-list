import React, { useEffect, useState } from 'react';
import { useDataQuery } from "@dhis2/app-runtime"
import './Cases.css';

import {
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableCell,
    TableRow,
    TableBody,
    Button,
    DropdownButton,
    Divider
} from '@dhis2/ui';
import DropdownMenu from './DropdownMenu';
import ContactOverlay from './ContactOverlay';

const Cases = (props) => {
    const { data } = props
    const [entityInstances, setEntityInstances] = useState()
    const [entityValues, setEntityValues] = useState([])
    const [dropdownValue, setDropdownValue] = useState("Index cases")
    const [showOverlay, setShowOverlay] = useState(false)
    const [relationships, setRelationships] = useState()

    const programMapping = {
        uYjxkTbwRNf: "Index Case",
        DM9n1bUw8W8: "Contact Case",
        indexCase: "uYjxkTbwRNf",
        contactCase: "DM9n1bUw8W8"
    }

    useEffect(() => {
        console.log("entityInstances: ", entityInstances)
        if (entityInstances !== undefined) {
            const reconstructedEntities = reconstructAttributes(entityInstances)
            setEntityValues(reconstructedEntities)
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
            tmp.relationships = entity.relationships.map(relationship => relationship.from.trackedEntityInstance.trackedEntityInstance)
            entities.push(tmp)
            tmp = {}
        })
        return entities

    }

    const mergeCases = () => {
        const merged = data.indexCases.trackedEntityInstances.concat(data.contactCases.trackedEntityInstances)
        return merged
    }

    const displayOverlay = (event) => {
        findRelationships(event.value)
        setShowOverlay(true)
    }

    const findRelationships = (entityIds) => {
        const merged = mergeCases()
        const tmp = []
        entityIds.map(id => {
            const relatedEntities = merged.filter(entity => entity.trackedEntityInstance === id)
            console.log("RE: ", relatedEntities);
            tmp.push(relatedEntities)

        })

        console.log("flat: ", tmp.flat(1));

        const reconstructedEntities = reconstructAttributes(tmp.flat(1))
        setRelationships(reconstructedEntities)
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
                setEntityInstances(mergeCases)
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
                className='drop-down'
            >
                {dropdownValue}
            </DropdownButton>

            {showOverlay && (
                <ContactOverlay relationships={relationships} />
            )}

            {entityValues && (
                <Table className='detail-view-table'>
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

                                {programMapping[entity.program] == "Index Case" && (
                                    <TableCell dataTest="deta-first-name">
                                        <Button
                                            dataTest="dhis2-uicore-button"
                                            name="Basic button"
                                            onClick={(event) => displayOverlay(event)}
                                            type="button"
                                            value={entity.relationships}
                                        >
                                            Contact cases
                                        </Button>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table >
            )}

        </>
    )

};

export default Cases;
