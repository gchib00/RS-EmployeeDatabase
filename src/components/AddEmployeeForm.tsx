import React, { useState } from 'react'
import { Dropdown, Form, Modal } from 'semantic-ui-react'
import StandardButton from './buttons/StandardButton'
import TeamsDropdownForForm from './dropdowns/TeamsDropdownForForm'

const departmentOptions = [
  {
    key: 'Editors',
    text: 'Editors',
    value: 'editing'
  },
  {
    key: 'CS',
    text: 'CS',
    value: 'cs'
  },
  {
    key: 'Operations',
    text: 'Operations',
    value: 'operations'
  }
]

interface Props {
  formModalStatus: boolean;
  setFormModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddEmployeeForm = ({formModalStatus, setFormModalStatus}: Props) => {
  const [selectedDepartment, setSelectedDepartment] = useState('')
  
  return (
    <div>
    <Modal
    style={{height: 500}}
      onClose={() => setFormModalStatus(false)}
      onOpen={() => setFormModalStatus(true)}
      open={formModalStatus}
    > 
    <Form style={{height: 500}}>
      <Form.Field>
        <label>Alias Name:</label>
        <input placeholder='Alias Name...' />
      </Form.Field>
      <Form.Field>
        <label>Department:</label>
        <Dropdown
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(e, {value}: any) => setSelectedDepartment(value)}
          options={departmentOptions}
          placeholder='Select Department'
          selection
          value={selectedDepartment}
        />
      </Form.Field>
      <Form.Field style={{height: 300}}>
        <label>Team / Sub-Department:</label>
        <TeamsDropdownForForm selectedDepartment={selectedDepartment} />
      </Form.Field>
      <StandardButton 
        type='button'
        color='grey'
        width='70px'
        height='30px'
        text='Cancel'
      />
      <StandardButton 
        type='submit'
        color='rgb(23, 158, 18)'
        width='70px'
        height='30px'
        text='Submit'
      />
    </Form>
    </Modal>
    </div>
  )
}

export default AddEmployeeForm
