import React, { useEffect, useState } from 'react';
import { useDataQuery } from "@dhis2/app-runtime"
import {
    NoticeBox,
    Table,
    TableCell,
    TableRow,
    TableBody,
    Button,
    SwitchField
} from '@dhis2/ui';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Workload.css';

const query = {
    indexCases: {
        resource: "events",
        params: {
            fields: "*",
            program: "uYjxkTbwRNf",
            orgUnit: "iVgNipWEgvE",
            ouMode: "SELECTED",
            programStatus: "ACTIVE",
            status: "ACTIVE",
            page: 1,
            totalPages: true
        }
    },
    contactCases: {
        resource: "events",
        params: {
            fields: "*",
            program: "DM9n1bUw8W8",
            orgUnit: "iVgNipWEgvE",
            ouMode: "SELECTED",
            programStatus: "ACTIVE",
            status: "ACTIVE",
            page: 1,
            totalPages: true
        }
    }
}



const Workload = () => {
    const [tglSwitch, setTglSwitch] = useState({
        indexcases: true,
        contacts: false,
    });
    const { loading, error, data } = useDataQuery(query)
    const [workload, setWorkload] = useState()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [typeError, setTypeError] = useState(false)

    const onChange = dates => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const switchChange = (event) => {
        setTglSwitch({ ...tglSwitch, [event.name]: event.checked })
        //console.log(event);
    }

    useEffect(() => {
        //console.log(data);

    }, [data])

    const calculateWorkload = () => {
        const startEpoch = startDate.getTime()

        //Sjekker at endDate ikke er null
        try {
            const endEpoch = endDate.getTime()

            const merged = data.indexCases.events.concat(data.contactCases.events)

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
        <div id="workload-content">
            <h1>Workload</h1>
            

            {!typeError &&
                <p>Velg startdato og sluttdato for når du ønsker å vite arbeidsmengden</p>
            }
            {typeError &&
                <NoticeBox className="notice-box"
                    dataTest="dhis2-uicore-noticebox"
                    title="Velg en sluttdato"
                    warning
                >
                    Husk å velg en sluttdato. Nå er det bare valgt en startdato.
            </NoticeBox>
            }

            <section className="infoTable">
            <div className="date-picker">
                <DatePicker
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
        </div>
    );
}

export default Workload;