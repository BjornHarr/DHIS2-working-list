import React, { useState } from 'react'
import { useDataQuery } from "@dhis2/app-runtime"
import { Menu, MenuItem, MenuSectionHeader, CircularLoader } from '@dhis2/ui';
import i18n from '@dhis2/d2-i18n'
import styles from './App.module.css';
import Cases from './components/Cases';
import Workload from './components/Workload';
import {
    NoticeBox,
    Table,
    TableCell,
    TableRow,
    TableBody,
    Button,
    SwitchField
} from '@dhis2/ui';
import enGb from 'date-fns/locale/en-GB';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const query = {
    indexCases: {
        resource: "trackedEntityInstances",
        params: {
            fields: "*",
            program: "uYjxkTbwRNf",
            ouMode: "SELECTED",
            ou: "iVgNipWEgvE",
            programStatus: "ACTIVE"
        }
    },
    contactCases: {
        resource: "trackedEntityInstances",
        params: {
            fields: "*",
            program: "DM9n1bUw8W8",
            ou: "iVgNipWEgvE",
            ouMode: "SELECTED",
        }
    }
}

const MyApp = () => {
    const { loading, error, data } = useDataQuery(query)
    const [selected, setSelected] = useState("Cases")


    return (
        <div className={styles.container}>
            {loading ? (
                <CircularLoader dataTest="dhis2-uicore-circularloader" />

            ) : (
                    <>
                        <nav className={styles.menu} data-test-id="menu">
                        <Workload />

                        </nav>
                        <main className={styles.main}>
                            {selected && (
                                selected == "Cases" ? (
                                    <Cases data={data} />
                                ) : (
                                        <Workload />
                                    )
                            )}
                        </main>
                    </>
                )
            }

        </div >
    )
}

export default MyApp
