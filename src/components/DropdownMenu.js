import React from 'react'
import {
    FlyoutMenu,
    MenuItem
} from '@dhis2/ui';

const DropdownMenu = ({ callback }) => {

    return (
        <FlyoutMenu
            dataTest="dhis2-uicore-menu"
            maxHeight="auto"
            maxWidth="380px"
        >
            <MenuItem
                dataTest="dhis2-uicore-menuitem"
                label="Index cases"
                value="Index cases"
                onClick={(event) => callback(event)}
            />
            <MenuItem
                dataTest="dhis2-uicore-menuitem"
                label="Contact cases"
                value="Contact cases"
                onClick={(event) => callback(event)}
            />
            <MenuItem
                dataTest="dhis2-uicore-menuitem"
                label="Both"
                value="Both"
                onClick={(event) => callback(event)}
            />
        </FlyoutMenu>
    )
}

export default DropdownMenu