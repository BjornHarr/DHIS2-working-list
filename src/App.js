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
    SwitchField,
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

    const [tglSwitch, setTglSwitch] = useState({
        indexcases: true,
        contacts: false,
    });
    const [workload, setWorkload] = useState()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [typeError, setTypeError] = useState(false)
    const [entityInstances, setEntityInstances] = useState()
    const [dropdownValue, setDropdownValue] = useState("Index cases")

    useEffect(() => {
        console.log("DATA: ", data);
    }, [data])


    useEffect(() => {
        console.log("WORKLOAD: ", workload);
    }, [workload])

    const onChange = dates => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const switchChange = (event) => {
        setTglSwitch({ ...tglSwitch, [event.name]: event.checked })

    }

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

    //Setter mandag som første dag i uka
    registerLocale('en-gb', enGb);



    return (
        <div className={styles.container}>
            {loading ? (
                <CircularLoader dataTest="dhis2-uicore-circularloader" />

            ) : (
                    <>
                        <nav className={styles.menu} data-test-id="menu">
                            <div id="workload-content">
                                <h1>Workload</h1>

                                {!typeError &&
                                    <p>Velg startdato og sluttdato for når {'\n'} du ønsker å vite arbeidsmengden</p>
                                }
                                {typeError &&
                                    <NoticeBox className="notice-box"
                                        dataTest="dhis2-uicore-noticebox"
                                        title="Velg en sluttdato"
                                        warning
                                    >
                                        Husk å velg en sluttdato. {'\n'} Nå er det bare valgt en startdato.
            </NoticeBox>
                                }

                                <section className="infoTable">
                                    <div className="date-picker">
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
                                    <div className="submit-group">

                                        <section className="switches">
                                            <>
                                                <SwitchField
                                                    checked={tglSwitch.indexcases}
                                                    dataTest="dhis2-uiwidgets-switchfield"
                                                    label="Index cases"
                                                    name="indexcases"
                                                    onChange={switchChange}
                                                    value="checked"
                                                />
                                                <SwitchField
                                                    checked={tglSwitch.contacts}
                                                    dataTest="dhis2-uiwidgets-switchfield"
                                                    label="Contacts"
                                                    name="contacts"
                                                    onChange={switchChange}
                                                    value="unchecked"
                                                />
                                            </>
                                        </section>
                                        <Button className="submit-button"
                                            dataTest="dhis2-uicore-button"
                                            name="Primary button"
                                            primary
                                            type="button"
                                            value="default"
                                            onClick={calculateWorkload}
                                        >
                                            Submit
                </Button>
                                    </div>
                                    {workload && (

                                        <Table suppressZebraStriping className="workload-table">
                                            <TableBody>
                                                {tglSwitch.indexcases &&
                                                    <TableRow>
                                                        <TableCell className="left-column">
                                                            Index Cases
                        </TableCell>
                                                        <TableCell className="right-column">
                                                            {workload.indexCases}
                                                        </TableCell>
                                                    </TableRow>
                                                }
                                                {tglSwitch.contacts &&
                                                    <TableRow>
                                                        <TableCell className="left-column">
                                                            Contacts
                        </TableCell>
                                                        <TableCell className="right-column">
                                                            {workload.contactCases}
                                                        </TableCell>

                                                    </TableRow>
                                                }
                                                {(tglSwitch.indexcases && tglSwitch.contacts) &&
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

                                <DropdownButton
                                    component={<DropdownMenu callback={(event) => setDropdownValue(event.value)} />}
                                    dataTest="dhis2-uicore-dropdownbutton"
                                    name="default"
                                    secondary
                                    large
                                    value={dropdownValue}
                                    className='drop-down'
                                >
                                    {dropdownValue}
                                </DropdownButton>

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
