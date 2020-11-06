import React, { useState, useEffect } from 'react'
import { useDataQuery } from "@dhis2/app-runtime"
import styles from './App.module.css';
import Cases from './components/Cases';
import {
    NoticeBox,
    Table,
    TableCell,
    TableRow,
    TableBody,
    Button,
    CircularLoader,
    DropdownButton
} from '@dhis2/ui';
import enGb from 'date-fns/locale/en-GB';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './components/Workload.css';
import DropdownMenu from './components/DropdownMenu';

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
    },
    contactEvents: {
        resource: "events",
        params: {
            fields: "*",
            orgUnit: "iVgNipWEgvE",
            ouMode: "SELECTED",
            programStatus: "ACTIVE",
            programStage: "sAV9jAajr8x",
            status: "SCHEDULE",
            page: 1,
            totalPages: true
        }
    },
    indexEvents: {
        resource: "events",
        params: {
            fields: "*",
            orgUnit: "iVgNipWEgvE",
            ouMode: "SELECTED",
            programStatus: "ACTIVE",
            programStage: "oqsk2Jv4k3s",
            status: "SCHEDULE",
            page: 1,
            totalPages: true
        }
    }
}

/*
follow up: sAV9jAajr8x
health status: oqsk2Jv4k3s
*/

const MyApp = () => {
    const { loading, data } = useDataQuery(query)
    const [workload, setWorkload] = useState()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [typeError, setTypeError] = useState(false)
    const [tableData, setTableData] = useState()
    const [dropdownValue, setDropdownValue] = useState("Index cases")
    registerLocale('en-gb', enGb);

    useEffect(() => {
        console.log("DATA: ", data);
    }, [data])

    useEffect(() => {
        calculateWorkload()
        console.log("enddate: ", endDate);
    }, [endDate])

    useEffect(() => {
        console.log("WORKLOAD: ", workload);
        if (workload) {
            const teiMatches = []
            const teiFilter = workload.indexCases.concat(workload.contactCases)
            let indexMatches
            let contactMatces
            teiFilter.map(tei => {
                console.log("DROPDOWNVALUE:: ", dropdownValue);
                switch (dropdownValue) {
                    case "Index cases":
                        indexMatches = data.indexCases.trackedEntityInstances.filter(entity => entity.trackedEntityInstance === tei)
                        teiMatches.push(...indexMatches)
                        break;
                    case "Contact cases":
                        contactMatces = data.contactCases.trackedEntityInstances.filter(entity => entity.trackedEntityInstance === tei)
                        teiMatches.push(...contactMatces)
                        break;
                    case "Both":
                        indexMatches = data.indexCases.trackedEntityInstances.filter(entity => entity.trackedEntityInstance === tei)
                        contactMatces = data.contactCases.trackedEntityInstances.filter(entity => entity.trackedEntityInstance === tei)
                        teiMatches.push(...indexMatches, ...contactMatces)
                }
            })
            setTableData(teiMatches)
        }

    }, [workload, dropdownValue])

    const onChange = dates => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const calculateWorkload = () => {
        const startEpoch = startDate.getTime()

        try {
            const endEpoch = endDate.getTime()

            const merged = data.indexEvents.events.concat(data.contactEvents.events)
            const tmpWorkload = {
                indexCases: [],
                contactCases: [],
                total: 0,
            }
            merged.map(event => {

                const dueDate = Date.parse(event.dueDate)
                if (dueDate >= startEpoch && dueDate <= endEpoch) {
                    if (event.program == "uYjxkTbwRNf") {
                        tmpWorkload.indexCases.push(event.trackedEntityInstance)
                    } else if (event.program == "DM9n1bUw8W8") {
                        tmpWorkload.contactCases.push(event.trackedEntityInstance)
                    } else {
                        console.log("Program not recognized")
                    }
                    tmpWorkload.total++
                }
            })
            setWorkload(tmpWorkload)
            setTypeError(false)
        }
        catch (e) {
            if (e instanceof TypeError && endDate === null) {
                setTypeError(true);
            }
        }
    }

    return (
        <div className={styles.container}>
            {loading ? (
                <CircularLoader dataTest="dhis2-uicore-circularloader" />

            ) : (
                    <>
                        <nav className={styles.menu} data-test-id="menu">
                            <div className={styles.workloadContent}>
                                <h1>Covid-19</h1>
                                {!typeError &&
                                    <div className={styles.wrapperP}>
                                        <h4>Workload</h4>
                                        <p>Choose a start-end and end-date {'\n'} to get the workload</p>
                                    </div>
                                }
                                {typeError &&
                                    <NoticeBox className={styles.noticeBox}
                                        dataTest="dhis2-uicore-noticebox"
                                        title="Velg en sluttdato"
                                        warning
                                    >
                                        Remember to choose a start and end date. {'\n'} Now there's just a start date.
                                 </NoticeBox>
                                }

                                <section className={styles.infoTable}>
                                    <div className={styles.datePicker}>
                                        <DatePicker
                                            locale="en-gb"
                                            selected={startDate}
                                            onChange={onChange}
                                            startDate={startDate}
                                            endDate={endDate}
                                            selectsRange
                                            inline

                                        />
                                    </div>

                                    <DropdownButton
                                        component={<DropdownMenu callback={(event) =>
                                            setDropdownValue(event.value)
                                        } />}
                                        dataTest="dhis2-uicore-dropdownbutton"
                                        name="default"
                                        secondary
                                        large
                                        value={dropdownValue}
                                        className={styles.dropDown}
                                    >
                                        {dropdownValue}
                                    </DropdownButton>

                                    {workload && (

                                        <Table suppressZebraStriping className={styles.workloadTable}>
                                            {console.log("wl", workload)}
                                            <TableBody>

                                                {(dropdownValue == "Index cases" || dropdownValue == "Both") &&
                                                    <TableRow>
                                                        <TableCell className="left-column">
                                                            Index Cases
                        </TableCell>
                                                        <TableCell className="right-column">
                                                            {workload.indexCases.length}
                                                        </TableCell>
                                                    </TableRow>
                                                }
                                                {(dropdownValue == "Contact cases" || dropdownValue == "Both") &&
                                                    <TableRow>
                                                        <TableCell className="left-column">
                                                            Contacts
                        </TableCell>
                                                        <TableCell className="right-column">
                                                            {workload.contactCases.length}
                                                        </TableCell>

                                                    </TableRow>
                                                }
                                                {dropdownValue == "Both" &&
                                                    <TableRow>
                                                        <TableCell className="left-column">
                                                            Total
                        </TableCell>
                                                        <TableCell className="right-column">
                                                            {workload.total}
                                                        </TableCell>
                                                    </TableRow>
                                                }
                                            </TableBody>
                                        </Table >
                                    )}
                                </section>

                            </div>

                        </nav>
                        {tableData && (
                            <main className={styles.main}>
                                <Cases data={tableData} viewContext={dropdownValue} />
                            </main>
                        )}
                    </>
                )
            }

        </div >
    )
}

export default MyApp
