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
    const [selected, setSelected] = useState("Cases")

    const [workload, setWorkload] = useState()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [typeError, setTypeError] = useState(false)
    const [entityInstances, setEntityInstances] = useState()
    const [dropdownValue, setDropdownValue] = useState("Index cases")
    //Setter mandag som første dag i uka i kalenderen
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
    }, [workload])

    const onChange = dates => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const calculateWorkload = () => {
        const startEpoch = startDate.getTime()

        //Sjekker at endDate ikke er null
        try {
            const endEpoch = endDate.getTime()

            const merged = data.indexEvents.events.concat(data.contactEvents.events)
            const tmpWorkload = {
                indexCases: 0,
                contactCases: 0,
                total: 0
            }
            merged.map(event => {

                const dueDate = Date.parse(event.dueDate)
                if (dueDate >= startEpoch && dueDate <= endEpoch) {
                    if (event.program == "uYjxkTbwRNf") {
                        tmpWorkload.indexCases++
                    } else if (event.program == "DM9n1bUw8W8") {
                        tmpWorkload.contactCases++
                    } else {
                        console.log("Program not recognized")
                    }
                    tmpWorkload.total++
                }
            })
            setWorkload(tmpWorkload), setTypeError(false)
        }
        catch (e) {
            //Treng berre ein av desse kanskje?
            if (e instanceof TypeError && endDate === null) {
                setTypeError(true);
                //bedre med metode enn state?
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
                                            {console.log("wl",workload)}
                                            <TableBody>
                                                
                                                {(dropdownValue == "Index cases" || dropdownValue == "Both") &&
                                                    <TableRow>
                                                        <TableCell className="left-column">
                                                            Index Cases
                        </TableCell>
                                                        <TableCell className="right-column">
                                                            {workload.indexCases}
                                                        </TableCell>
                                                    </TableRow>
                                                }
                                                {(dropdownValue == "Contact cases" || dropdownValue == "Both") &&
                                                    <TableRow>
                                                        <TableCell className="left-column">
                                                            Contacts
                        </TableCell>
                                                        <TableCell className="right-column">
                                                            {workload.contactCases}
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
                        <main className={styles.main}>
                            <Cases data={data} viewContext={dropdownValue} />
                        </main>
                    </>
                )
            }

        </div >
    )
}

export default MyApp
