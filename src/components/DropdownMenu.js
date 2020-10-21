import React, { useState } from 'react'
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
                label="Index Cases"
                onClick={() => callback("Index cases")}
            />
            <MenuItem
                dataTest="dhis2-uicore-menuitem"
                label="Contact Cases"
                onClick={() => callback("Contact cases")}
            />
            <MenuItem
                dataTest="dhis2-uicore-menuitem"
                label="Both"
                onClick={() => callback("Both")}
            />
        </FlyoutMenu>
    )
}

export default DropdownMenu