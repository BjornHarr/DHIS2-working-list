import React, { useEffect, useState } from 'react';
import ContactOverlay from './ContactOverlay';
import CasesTable from './CasesTable';

const Cases = (props) => {
    const { data, viewContext } = props
    const [entityValues, setEntityValues] = useState([])
    const [showOverlay, setShowOverlay] = useState(false)
    const [relationships, setRelationships] = useState()

    useEffect(() => {
        console.log("DATA: ", data)
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
        console.log("RELATIONSHIPS:: ", data, entityIds);
        const tmp = []
        entityIds.map(id => {
            const relatedEntities = data.filter(entity => entity.trackedEntityInstance === id)
            tmp.push(relatedEntities)

        })

        const reconstructedEntities = reconstructAttributes(tmp.flat(1))
        console.log(reconstructedEntities)
        setRelationships(reconstructedEntities)
    }

    return (
        <>
            {data.length < 1 ? (
                <h1>No values</h1>
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
