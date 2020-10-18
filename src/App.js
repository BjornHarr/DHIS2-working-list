import React, { useState } from 'react'
import { useDataQuery } from "@dhis2/app-runtime"
import { Menu, MenuItem, MenuSectionHeader, CircularLoader } from '@dhis2/ui';
import i18n from '@dhis2/d2-i18n'
import styles from './App.module.css';
import ListSection from './components/ListSection';
import DetailView from './components/DetailView';


const query = {
    entityInstances: {
        resource: "trackedEntityInstances",
        params: {
            ou: "iVgNipWEgvE",

        }
    },
    entityAttributes: {
        resource: "trackedEntityAttributes",
    },
}

const MyApp = () => {
    const [selected, setSelected] = useState()
    const { loading, error, data } = useDataQuery(query)

    return (
        <div className={styles.container}>
            {loading ? (
                <CircularLoader dataTest="dhis2-uicore-circularloader" />

            ) : (
                    <>
                        {console.log("ORGUNITES: ", data)}
                        <nav className={styles.menu} data-test-id="menu">
                            <MenuSectionHeader label={i18n.t('Menu')} />
                            <Menu>
                                <MenuItem label={i18n.t('Index Cases')} dataTest="menu-cases" onClick={() => setSelected(data.entityInstances)} />
                                <MenuItem label={i18n.t('Contacts')} dataTest="menu-contacts" onClick={() => setSelected(data.entityAttributes)} />
                            </Menu>
                        </nav>
                        <main className={styles.main}>
                            {selected && (
                                <DetailView entityInstances={selected} />
                            )}
                        </main>
                    </>
                )}
        </div>
    )
}

export default MyApp
