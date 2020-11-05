import React, { useEffect, useState } from 'react';
import './Cases.css';

import { DropdownButton } from '@dhis2/ui';
import DropdownMenu from './DropdownMenu';
import ContactOverlay from './ContactOverlay';
import CasesTable from './CasesTable';

const Cases = (props) => {
    const { data } = props
    const [entityInstances, setEntityInstances] = useState()
    const [entityValues, setEntityValues] = useState([])
    const [dropdownValue, setDropdownValue] = useState("Index cases")
    const [showOverlay, setShowOverlay] = useState(false)
    const [relationships, setRelationships] = useState()

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
        entityIds = JSON.parse(entityIds)
        const merged = mergeCases()
        const tmp = []
        entityIds.map(id => {
            const relatedEntities = merged.filter(entity => entity.trackedEntityInstance === id)
            tmp.push(relatedEntities)

        })

        const reconstructedEntities = reconstructAttributes(tmp.flat(1))
        console.log(reconstructedEntities)
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
                <ContactOverlay relationships={relationships} closeOverlay={() => setShowOverlay(false)} />
            )}

            {entityValues && (
                <CasesTable data={entityValues} displayOverlay={displayOverlay} />
            )}
        </>
    )

};

export default Cases;
