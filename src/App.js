import React, { useState, useEffect } from 'react'
import { useDataQuery } from "@dhis2/app-runtime"
import { Menu, MenuItem, MenuSectionHeader, CircularLoader } from '@dhis2/ui';
import i18n from '@dhis2/d2-i18n'
import styles from './App.module.css';
import ListSection from './components/ListSection';
import DetailView from './components/DetailView';


const query = {
    indexCases: {
        resource: "trackedEntityInstances",
        params: {
            fields: "*",
            program: "uYjxkTbwRNf",
            ou: "iVgNipWEgvE",
        }
    },
    contactCases: {
        resource: "trackedEntityInstances",
        params: {
            fields: "*",
            program: "DM9n1bUw8W8",
            ou: "iVgNipWEgvE",
        }
    }
}

//nIWQO2FoYZO

const MyApp = () => {
    const { loading, error, data } = useDataQuery(query)
    const [selected, setSelected] = useState()
    const [populateBoth, setPopulateBoth] = useState()

    const populate = () => {
        const merged = data.indexCases.trackedEntityInstances.concat(data.contactCases.trackedEntityInstances)
        setPopulateBoth(merged)
    }

    return (
        <div className={styles.container}>
            {loading ? (
                <CircularLoader dataTest="dhis2-uicore-circularloader" />

            ) : (
                    <>
                        {console.log(data)}
                        <nav className={styles.menu} data-test-id="menu">
                            <MenuSectionHeader label={i18n.t('Menu')} />
                            <Menu>
                                <MenuItem label={i18n.t('Cases')} dataTest="menu-cases" onClick={() => populate()} />
                            </Menu>
                        </nav>
                        <main className={styles.main}>
                            {populateBoth && (
                                <DetailView entityInstances={populateBoth} />
                            )}
                        </main>
                    </>
                )}

        </div>
    )
}

export default MyApp
