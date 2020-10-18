import React, { useState, useEffect } from 'react'
import { useDataQuery } from "@dhis2/app-runtime"
import { Menu, MenuItem, MenuSectionHeader, CircularLoader } from '@dhis2/ui';
import i18n from '@dhis2/d2-i18n'
import styles from './App.module.css';
import ListSection from './components/ListSection';
import DetailView from './components/DetailView';


const query = {
    entityAttributes: {
        resource: "trackedEntityAttributes",
    },
    indexCases: {
        resource: "trackedEntityInstances",
        params: ({ indexCases }) => ({
            ou: "iVgNipWEgvE",
            program: indexCases
        })
    },
    contacts: {
        resource: "trackedEntityInstances",
        params: ({ contacts }) => ({
            ou: "iVgNipWEgvE",
            program: contacts
        })
    }
}

const MyApp = () => {
    const programs = {
        indexCases: "uYjxkTbwRNf",
        contacts: "DM9n1bUw8W8"
    }
    const { loading, error, data } = useDataQuery(query, {
        variables: {
            indexCases: programs.indexCases,
            contacts: programs.contacts
        },
    })
    const [selected, setSelected] = useState()


    return (
        <div className={styles.container}>
            {loading ? (
                <CircularLoader dataTest="dhis2-uicore-circularloader" />

            ) : (
                    <>
                        <nav className={styles.menu} data-test-id="menu">
                            <MenuSectionHeader label={i18n.t('Menu')} />
                            <Menu>
                                <MenuItem label={i18n.t('Index Cases')} dataTest="menu-cases" onClick={() => setSelected({ entityInstances: data.indexCases, program: programs.indexCases })} />
                                <MenuItem label={i18n.t('Contacts')} dataTest="menu-contacts" onClick={() => setSelected({ entityInstances: data.contacts, program: programs.contacts })} />
                            </Menu>
                        </nav>
                        <main className={styles.main}>
                            {selected && (
                                <DetailView entityInstances={selected.entityInstances} program={selected.program} />
                            )}
                        </main>
                    </>
                )}
        </div>
    )
}

export default MyApp
