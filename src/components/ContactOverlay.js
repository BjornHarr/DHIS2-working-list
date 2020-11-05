import React from 'react';
import CasesTable from './CasesTable'
import { Modal, ModalContent, ModalTitle } from '@dhis2/ui';


const ContactOverlay = (props) => {
  const { relationships, closeOverlay } = props

  return (
    <Modal
      dataTest="dhis2-uicore-modal"
      onClose={closeOverlay}
      position="top"
    >
      <ModalTitle dataTest="dhis2-uicore-modaltitle">
        Contact cases
      </ModalTitle>
      <ModalContent dataTest="dhis2-uicore-modalcontent">
        <CasesTable viewContext={"Contact cases"} data={relationships} />
      </ModalContent>
    </Modal>
  )
}

export default ContactOverlay;
