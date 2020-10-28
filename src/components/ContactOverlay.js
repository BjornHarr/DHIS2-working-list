import React, { useEffect, useState } from 'react';
import { useDataQuery } from "@dhis2/app-runtime";
import {Table,TableHead,TableRowHead,TableCellHead,TableCell,TableRow,TableBody,Button,DropdownButton} from '@dhis2/ui';
import {Modal, ModalContent, ModalTitle} from '@dhis2/ui';

const ContactOverlay = () => {

  //OBS! MÅ FÅ TIL EN BRA GREIE FOR ONCLOSE

  return (
    <Modal
      dataTest="dhis2-uicore-modal"

      position="top"
    >
      <ModalTitle dataTest="dhis2-uicore-modaltitle">
        Contact cases
      </ModalTitle>
      <ModalContent dataTest="dhis2-uicore-modalcontent">
        <Table>
          <TableHead>
            <TableRowHead>
              <TableCellHead>
                First name
              </TableCellHead>
              <TableCellHead>
                Surname
              </TableCellHead>
              <TableCellHead>
                Phone number
              </TableCellHead>
              <TableCellHead>
                Details
              </TableCellHead>
            </TableRowHead>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell dataTest="details-first-name">
                eksempeldata
              </TableCell>
              <TableCell dataTest="details-first-name">
                eksempeldata
              </TableCell>
              <TableCell dataTest="details-first-name">
                eksempeldata
              </TableCell>
              <TableCell dataTest="details-first-name">
                <a href={'https://www.google.com/'}>
                    <Button
                        dataTest="dhis2-uicore-button"
                        name="Primary button"
                        primary
                        type="button"
                        value="default"
                    >
                        Details
                    </Button>
                </a>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ModalContent>
    </Modal>
  )
}

export default ContactOverlay;
