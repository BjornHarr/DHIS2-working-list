import React, { useState } from 'react';
import i18n from '@dhis2/d2-i18n';
import { Menu, MenuItem } from '@dhis2/ui';
import DetailView from './DetailView';
import styles from '../App.module.css';


const ListSection = (props) => {
    const { data } = props
    const dataType = Object.keys(data)
    console.log(data)
    console.log("DATATYPE: ", dataType);
    const [selected, setSelected] = useState()

    return (
        <div className={styles.container}>
            <div>
                <h2>List</h2>
                <Menu>
                    {data[dataType].map(el => (
                        <MenuItem label={i18n.t(el.displayName)} dataTest={`list-${dataType.slice(0, -1)}-${el.id}`} onClick={() => setSelected(el)} />
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