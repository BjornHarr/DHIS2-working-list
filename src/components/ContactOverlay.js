import React, { useEffect, useState } from 'react';
import { useDataQuery } from "@dhis2/app-runtime";
import { Table, TableHead, TableRowHead, TableCellHead, TableCell, TableRow, TableBody, Button, DropdownButton } from '@dhis2/ui';
import { Modal, ModalContent, ModalTitle } from '@dhis2/ui';


const ContactOverlay = (props) => {
  const { relationships } = props

  const programMapping = {
    uYjxkTbwRNf: "Index Case",
    DM9n1bUw8W8: "Contact Case",
    indexCase: "uYjxkTbwRNf",
    contactCase: "DM9n1bUw8W8"
  }

  return (
    <Modal
      dataTest="dhis2-uicore-modal"

      position="top"
    >
      {console.log("REL: ", relationships)}
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
                Case type
      </TableCellHead>
              <TableCellHead>
                Details
      </TableCellHead>
              <TableCellHead>
              </TableCellHead>
            </TableRowHead>

          </TableHead>
          <TableBody>
            {relationships.map(relationship => (
              <TableRow>
                <TableCell dataTest="details-first-name">
                  {relationship.first_name}
                </TableCell>
                <TableCell dataTest="details-first-name">
                  {relationship.surname}
                </TableCell>
                <TableCell dataTest="details-first-name">
                  {relationship.phone_local ? relationship.phone_local : relationship.parent_telephone}
                </TableCell>
                <TableCell dataTest="details-first-name">
                  {programMapping[relationship.program]}
                </TableCell>
                <TableCell dataTest="details-first-name">
                  <a href={`http://localhost:9999/dhis-web-tracker-capture/index.html#/dashboard?tei=${relationship.trackedEntityInstance}&program=${relationship.program}&ou=iVgNipWEgvE`}>
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

                {programMapping[relationship.program] == "Index Case" && (
                  <TableCell dataTest="deta-first-name">
                    <Button
                      dataTest="dhis2-uicore-button"
                      name="Basic button"
                      onClick={(event) => displayOverlay(event)}
                      type="button"
                      value={relationship.relationships}
                    >
                      Contact cases
                                        </Button>
                  </TableCell>
                )}
              </TableRow>
            ))
            }
          </TableBody>
        </Table>
      </ModalContent>
    </Modal>
  )
}

export default ContactOverlay;
