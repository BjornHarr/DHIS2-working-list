import React, { useEffect, useState } from 'react';
import ContactOverlay from './ContactOverlay';
import CasesTable from './CasesTable';

const Cases = (props) => {
    const { data, viewContext, contacts } = props
    const [entityValues, setEntityValues] = useState([])
    const [showOverlay, setShowOverlay] = useState(false)
    const [relationships, setRelationships] = useState()

    useEffect(() => {
        if (data) {
            const reconstructedEntities = reconstructAttributes(data)
            setEntityValues(reconstructedEntities)
        }

    }, [data])

    const reconstructAttributes = (entityInstances) => {
        let entities = []
        let tmp = {}
        entityInstances.map(entity => {
            entity.attributes.map(attribute => {
                tmp[attribute.code] = attribute.value
            })
            tmp.trackedEntityInstance = entity.trackedEntityInstance
            tmp.program = entity.programOwners[0].program
            let eventsLength = entity.enrollments[0].events.length
            tmp.dueDate = entity.enrollments[0].events[eventsLength - 1].dueDate
            tmp.relationships = entity.relationships.map(relationship => relationship.from.trackedEntityInstance.trackedEntityInstance)
            entities.push(tmp)
            tmp = {}
        })
        return entities

    }

    const displayOverlay = (event) => {
        findRelationships(event.value)
        setShowOverlay(true)
    }

    const findRelationships = (entityIds) => {
        entityIds = JSON.parse(entityIds)
        const tmp = []
        entityIds.map(id => {
            const relatedEntities = contacts.filter(entity => entity.trackedEntityInstance === id)
            tmp.push(...relatedEntities)
        })

        const reconstructedEntities = reconstructAttributes(tmp)
        setRelationships(reconstructedEntities)
    }

    return (
        <>
            {data.length < 1 ? (
                <>
                    <h2>No cases</h2>
                    <p>There's no cases due for the specified date.</p>
                </>
            ) : (
                    entityValues && (
                        <CasesTable viewContext={viewContext} data={entityValues} displayOverlay={displayOverlay} />
                    )
                )}
            {showOverlay && (
                <ContactOverlay relationships={relationships} closeOverlay={() => setShowOverlay(false)} />
            )}
        </>
    )

};

export default Cases;
