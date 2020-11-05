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
import enGb from 'date-fns/locale/en-GB';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Workload.css';
import { DropdownButton } from '@dhis2/ui';
import DropdownMenu from './DropdownMenu';




const Workload = () => {






    return (
        <div id="workload-content">
            <h1>Workload</h1>
            {/* {console.log(data)} */}

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
                component={<DropdownMenu callback={dropdownCallback} />}
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
    );
}

export default Workload;
