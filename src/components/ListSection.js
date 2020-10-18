import React, { useState } from 'react';
import i18n from '@dhis2/d2-i18n';
import { Menu, MenuItem } from '@dhis2/ui';
import DetailView from './DetailView';
import styles from '../App.module.css';


const ListSection = (props) => {
    let { data } = props
    const dataType = Object.keys(data)
    console.log("DATATYPE: ", dataType);
    const [selected, setSelected] = useState()


    /*
        Tracked entity attribute structure:
        attributes = [
            {displaName: "Sex", value: "Female"}
            {displaName: "Date of birth", value: "1976-03-09"}
            {displaName: "First Name", value: "Alina"}
            {displaName: "Surname", value: "Huggbugg"}
        ]
    */

    return (
        <div className={styles.container}>
            <div>
                <h2>List</h2>
                <Menu>
                    {data[dataType].map(el => (
                        <MenuItem label={i18n.t(el.attributes[0].value)} dataTest={`list-${dataType.slice(0, -1)}-${el.id}`} onClick={() => setSelected(el)} />
                    ))}
                </Menu >
            </div>
            <div>
                <h2>Details</h2>
                {selected && (
                    <DetailView orgUnit={selected} />
                )}
            </div>
        </div>
    )

};

export default ListSection;