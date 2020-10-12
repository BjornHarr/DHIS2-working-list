import React, { useState } from 'react'
import { useDataQuery } from "@dhis2/app-runtime"
import { Menu, MenuItem, MenuSectionHeader, CircularLoader } from '@dhis2/ui';
import i18n from '@dhis2/d2-i18n'
import styles from './App.module.css';
import ListSection from './components/ListSection';


const query = {
    me: {
        resource: 'me',
    },
    orgUnits: {
        resource: "organisationUnits",
        params: {
            paging: false
        }
    },
    entityAttributes: {
        resource: "trackedEntityAttributes",
    },
    entityInstances: {
        resource: "trackedEntityInstances",
        params: {
            ou: "m4tOAthk6uT"
        }
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
                        {console.log("ORGUNITES: ", data.orgUnits)}
                        <nav className={styles.menu} data-test-id="menu">
                            <MenuSectionHeader label={i18n.t('Menu')} />
                            <Menu>
                                <MenuItem label={i18n.t('Organisation Units')} dataTest="menu-org-units" onClick={() => setSelected(data.orgUnits)} />
                                <MenuItem label={i18n.t('Attributes')} dataTest="menu-attributes" onClick={() => setSelected(data.entityAttributes)} />
                            </Menu>
                        </nav>
                        <main className={styles.main}>
                            {selected && (
                                <ListSection data={selected} />
                            )}
                        </main>
                    </>
                )}
        </div>
    )
}

export default MyApp
