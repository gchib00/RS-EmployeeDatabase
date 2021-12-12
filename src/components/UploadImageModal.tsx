import React, { useState } from 'react'
import { Icon, Modal } from 'semantic-ui-react'
import styled from 'styled-components'

//styling:
const FormContainer = styled.form`
  width: 80%;
  height: 80%;
  border: 1px solid black;
  margin: 60px auto 30px auto;
  display: flex;
  justify-content: space-between;
`
const UploadBtn = styled.label`
  border: 1px solid grey;
  background-color: green;
  padding: 15px;
  font-size: 1.2rem;
  cursor: pointer;
`
const UploadedFile = styled.div`
  width: 60%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
const BtnContainer = styled.div`
  margin-top: 20px;
  width: 148px;
  display: flex;
  justify-content: space-between;
  margin: auto;
`
const SubmitBtn = styled.button`
  transition: 650ms;
  width: 70px;
  height: 30px;
  background-color: rgb(23, 158, 18);
  color: white;
  border-radius: 2px;
  border: 1px solid rgb(23, 158, 18);
  font-family: 'Montserrat', sans-serif;
  &:hover {
    transition: 650ms;
    background-color: rgba(0, 0, 0, 0);
    color: rgb(23, 158, 18);
  }
  &:active {
    opacity: 0.25;
  }
`
const CancelBtn = styled.button`
  transition: 650ms;
  width: 70px;
  height: 30px;
  background-color: grey;
  color: white;
  border-radius: 2px;
  border: 1px solid grey;
  font-family: 'Montserrat', sans-serif;
  &:hover {
    transition: 650ms;
    background-color: rgba(0, 0, 0, 0);
    color: grey;
  }
  &:active {
    opacity: 0.25;
  }
` 
/////////

interface Props {
  imageModalStatus: boolean;
  setImageModalStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UploadImageModal = ({imageModalStatus, setImageModalStatus}: Props) => {
  const [uploadedFile, setUploadedFile] = useState<any>({})

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileUpload = (e: any) => {
    setUploadedFile(e.target.files[0])
  }
  const handleFormSubmit = () => {
    console.log(uploadedFile)
  }

  return (
    <Modal
      onClose={() => setImageModalStatus(false)}
      onOpen={() => setImageModalStatus(true)}
      open={imageModalStatus}
      style={{width:600, minHeight: 300}}
    >
      <FormContainer>
        <UploadBtn htmlFor='upload-artist-img'>
          <Icon name='cloud upload'/>Upload Image
          <input type="file" id='upload-artist-img' accept="image/*" style={{display: 'none'}} onChange={(e) => handleFileUpload(e)} />
        </UploadBtn>
        <UploadedFile>
          <p>{uploadedFile.name ? uploadedFile.name : null}</p>
        </UploadedFile>
      </FormContainer>
      <BtnContainer>
          <CancelBtn type='button' onClick={() => {setImageModalStatus(false)}}>Cancel</CancelBtn>
          <SubmitBtn type='submit' onClick={handleFormSubmit}>Send</SubmitBtn> 
        </BtnContainer>
    </Modal>
  )
}