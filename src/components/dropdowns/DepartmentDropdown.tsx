import React, { useContext, useEffect, useState } from 'react'
import { Dropdown } from 'semantic-ui-react'
import { StandardEmployeeType } from '../../types'
import { EmployeesContext } from '../../context/EmployeesContext'

const departmentOptions = [
  {
    key: 'Any',
    text: 'Any',
    value: 'any'
  },
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
  setFilteredByDep: React.Dispatch<React.SetStateAction<StandardEmployeeType[]>>;
}

const DepartmentDropdown = ({setFilteredByDep}: Props) => {
  const [department, setDepartment] = useState('')
  const {employeesData} = useContext(EmployeesContext)

  const filterByDepartment = () => {
    let arr = employeesData
    if (department && department !== 'any'){
      arr = arr.filter(employee => {
        return employee.department === department
      })
    }
    setFilteredByDep(arr)
  }

  useEffect(() => {
    filterByDepartment()
  }, [department])

  return (
    <Dropdown
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={(e, {value}: any) => setDepartment(value)}
      options={departmentOptions}
      placeholder='Select Department'
      selection
      value={department}
    />
  )
}

export default DepartmentDropdown
