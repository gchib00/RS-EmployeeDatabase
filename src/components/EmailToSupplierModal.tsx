import React from 'react'
import { Form, Modal, TextArea } from 'semantic-ui-react'
import styled from 'styled-components'

//styling:
const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`
/////////

interface Props {
  emailModalStatus: boolean;
  setEmailModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EmailToSupplierModal = ({emailModalStatus, setEmailModalStatus}: Props) => {
  return (
    <Modal
      onClose={() => setEmailModalStatus(false)}
      onOpen={() => setEmailModalStatus(true)}
      // trigger={<Logout>Logout</Logout>}
      open={emailModalStatus}
      style={{width: 500, minHeight: 400}}
    >
    <FormContainer>
      <Form>
        <TextArea placeholder='Your Message...' style={{minHeight: 100}} />
      </Form>
    </FormContainer>
    </Modal>
  )
}
