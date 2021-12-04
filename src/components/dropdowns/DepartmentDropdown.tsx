import React, { useContext, useEffect } from 'react'
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
  selectedDepartment: string;
  setSelectedDepartment:React.Dispatch<React.SetStateAction<string>>;
  setFilteredByDep: React.Dispatch<React.SetStateAction<StandardEmployeeType[]>>;
}

const DepartmentDropdown = ({selectedDepartment, setSelectedDepartment, setFilteredByDep}: Props) => {
  const {employeesData} = useContext(EmployeesContext)

  const filterByDepartment = () => {
    let arr = employeesData
    if (selectedDepartment && selectedDepartment !== 'any'){
      arr = arr.filter(employee => {
        return employee.department === selectedDepartment
      })
    }
    setFilteredByDep(arr)
  }
  useEffect(() => {
    filterByDepartment()
  }, [selectedDepartment])

  return (
    <Dropdown
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={(e, {value}: any) => setSelectedDepartment(value)}
      options={departmentOptions}
      placeholder='Select Department'
      selection
      value={selectedDepartment}
    />
  )
}
export default DepartmentDropdown