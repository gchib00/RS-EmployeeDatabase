import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Icon, Modal, Loader } from 'semantic-ui-react'
import styled from 'styled-components'
import { UserContext } from '../context/UserContext'

//styling:
const FormContainer = styled.form`
  width: 80%;
  height: 80%;
  border: 1px solid black;
  margin: 50px auto 20px auto;
  display: flex;
  justify-content: space-between;
  background-color: rgba(34,36,38,.1);
`
const UploadBtn = styled.label`
  border: 1px solid grey;
  background-color: rgb(23,158,18);
  padding: 15px;
  font-size: 1.2rem;
  transition: 500ms;
  cursor: pointer;
  &:hover {
    color: grey;
    background-color: #083f06
  }
`
const UploadedFile = styled.div`
  width: 60%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ImageContainer = styled.div`
  max-width: 80%;
  max-height: 80%;
  margin: 0px auto 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: contain;
`
const BtnContainer = styled.div`
  margin-top: 20px;
  width: 148px;
  display: flex;
  justify-content: space-between;
  margin: 0px auto 20px auto;
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
  cursor: pointer;
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
  cursor: pointer;
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
  activeOrder: string|undefined;
}

export const UploadImageModal = ({imageModalStatus, setImageModalStatus, activeOrder}: Props) => {
  const [uploadedFile, setUploadedFile] = useState<File|undefined>()
  const [image, setImage] = useState<string|undefined>()
  const [loader, setLoader] = useState<boolean>(false)
  const {user} = useContext(UserContext)

  const formData = new FormData()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setUploadedFile(e.target.files?.[0])
  } 
  const handleFormSubmit = async () => {
    if(!uploadedFile || !activeOrder) {return alert('image not found')}
    if(!user) {return alert('You are not logged in!')}
    formData.append('image', uploadedFile)
    formData.append('orderID', activeOrder)
    formData.append('emailSender', user.email)
    if(!image){return alert('Please upload an image')}
    try {
      setLoader(true) //starts loader animation while image is being processed
      const response = await axios.post('/email/artistToSupplier/image', formData, { headers: {'Content-Type': 'multipart/form-data' }})
      alert(response.data)
    } catch(err: unknown) {
      alert(err)
    }
    setImageModalStatus(false); setLoader(false); setImage(undefined); setUploadedFile(undefined);
  }
  useEffect(() => {
    //display the image inside the modal when user uploads it
    if(uploadedFile){
      const reader = new FileReader() //FileReader is necessary to extract the path of the file for the img element (in order to display it)
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result)
        }
      }
      reader.readAsDataURL(uploadedFile)
    }
  }, [uploadedFile])
  //show loader animation while email is being sent:
  if (loader) {return <Modal><Loader/></Modal>}
  return (
    <Modal
      onClose={() => {setImageModalStatus(false); setImage(undefined); setUploadedFile(undefined)}}
      onOpen={() => setImageModalStatus(true)}
      open={imageModalStatus}
      style={{width:600, minHeight: 170}}
    >
      <FormContainer>
        <UploadBtn htmlFor='upload-artist-img'>
          <Icon name='cloud upload'/>Upload Image
          <input type="file" name='upload-artist-img' id='upload-artist-img' accept="image/*" style={{display: 'none'}} onChange={(e) => handleFileUpload(e)} />
        </UploadBtn>
        <UploadedFile>
          <p>{uploadedFile?.name ? uploadedFile?.name : null}</p>
        </UploadedFile>
      </FormContainer>
      <ImageContainer style={image ? {display: 'flex'} : {display: 'none'}}>
        {image ? <img src={image} style={{height:'100%', width:'100%'}} /> : null}
      </ImageContainer>
      <BtnContainer>
          <CancelBtn type='button' onClick={() => {
            setImageModalStatus(false); setImage(undefined); setUploadedFile(undefined)}}>Cancel
          </CancelBtn>
          <SubmitBtn type='submit' onClick={handleFormSubmit}>Send</SubmitBtn> 
        </BtnContainer>
    </Modal>
  )
}