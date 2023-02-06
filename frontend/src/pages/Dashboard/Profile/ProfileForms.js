import { TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import useToken from '../../../hooks/useToken';
import { putUser } from '../../../services/UserInfo/getUserInfoAPI';
import {
  ButtonContainer,
  ButtonContainerMobile,
  EmailField,
  ImageColumn,
  ImageUpdateField,
  InputColumn,
  NameField,
  ProfileFormsData,
  ProfileFormsDataMobile,
  UpdateDataButton,
} from './ProfileStyles';

export function ProfileMain({ userData, updatedData, setUpdatedData }) {
  //console.log(userData);
  const tokenHook = useToken();
  const [token, setToken] = useState(tokenHook);
  const [newUserData, setNewUserData] = useState({ ...userData });
  const [validImage, setValidImage] = useState('original');
  const [imageURL, setImageURL] = useState('');
  const [validData, setValidData] = useState(false);

  useEffect(() => {
    if (!token) {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  useEffect(async () => {
    if (imageURL === '') {
      setValidImage('original');
      setNewUserData({ ...newUserData, image: userData.image });
    }

    const urlRegex =
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    if (imageURL && !imageURL.match(urlRegex)) {
      setValidImage('invalid');
      setNewUserData({ ...newUserData, image: 'https://media.tenor.com/-jKFU5c-fXgAAAAC/genshin-paimon.gif' });
    }

    if (imageURL !== userData.image && imageURL) {
      const imageIsValid = await verifyURL(imageURL);
      if (imageIsValid) {
        setValidImage('valid');
        setNewUserData({ ...newUserData, image: imageURL });
      } else {
        setValidImage('invalid');
        setNewUserData({ ...newUserData, image: 'https://media.tenor.com/-jKFU5c-fXgAAAAC/genshin-paimon.gif' });
      }
    } else {
      setValidImage('original');
      setNewUserData({ ...newUserData, image: userData.image });
    }
  }, [imageURL]);

  useEffect(() => {
    setNewUserData({ ...userData });
  }, [userData]);

  useEffect(() => {
    if (imageURL.length === 0) {
      setNewUserData({ ...newUserData, image: userData.image });
    }
  }, [imageURL]);

  useEffect(() => {
    setValidData(verifyData(newUserData, userData, validImage));
  }, [userData, newUserData, validImage]);

  const borderDetails = {
    original: 'none',
    valid: '5px solid green',
    invalid: '5px solid red',
  };

  return (
    <>
      <div>
        <ProfileFormsData>
          <ImageColumn border={borderDetails[validImage]}>
            <div>
              <img src={newUserData.image} alt={`${newUserData.name}`} />
            </div>
          </ImageColumn>
          <InputColumn>
            <NameField>Name:</NameField>
            <TextField
              onChange={(e) => setNewUserData({ ...userData, name: e.target.value })}
              fullWidth
              key={userData.name}
              defaultValue={userData.name}
              disabled={false}
              id="outlined-required"
            />
            <EmailField>Email:</EmailField>
            <TextField
              fullWidth
              disabled={true}
              key={userData.email}
              defaultValue={userData.email}
              id="outlined-required"
            />
          </InputColumn>
        </ProfileFormsData>
        <ImageUpdateField>
          <div>Avatar:</div>
          <div>
            <TextField
              onChange={(e) => setImageURL(e.target.value)}
              fullWidth
              disabled={false}
              key={userData.image}
              defaultValue={userData.image}
              id="outlined-required"
            />
          </div>
        </ImageUpdateField>
        <ButtonContainer>
          <UpdateDataButton
            onClick={() => {
              if (validData) {
                const response = modifyData(token, newUserData);
                if (response) {
                  setUpdatedData(!updatedData);
                }
              }
            }}
            colors={validData}
          >
            Update
          </UpdateDataButton>
        </ButtonContainer>
      </div>
    </>
  );
}

export function ProfileMobile({ userData, updatedData, setUpdatedData }) {
  //console.log(userData);
  const [newUserData, setNewUserData] = useState({ ...userData });
  const [validImage, setValidImage] = useState('original');
  const [imageURL, setImageURL] = useState('');
  const [validData, setValidData] = useState(false);
  //
  useEffect(async () => {
    if (imageURL !== userData.image && imageURL) {
      const imageIsValid = await verifyURL(imageURL);
      if (imageIsValid) {
        setValidImage('valid');
        setNewUserData({ ...newUserData, image: imageURL });
      } else {
        setValidImage('invalid');
        setNewUserData({ ...newUserData, image: 'https://media.tenor.com/-jKFU5c-fXgAAAAC/genshin-paimon.gif' });
      }
    } else {
      setValidImage('original');
    }
  }, [imageURL]);

  useEffect(() => {
    setNewUserData({ ...userData });
  }, [userData]);

  useEffect(() => {
    if (imageURL.length === 0) {
      setNewUserData({ ...newUserData, image: userData.image });
    }
  }, [imageURL]);

  useEffect(() => {
    setValidData(verifyData(newUserData, userData, validImage));
  }, [userData, newUserData, validImage]);

  const borderDetails = {
    original: 'none',
    valid: '5px solid green',
    invalid: '5px solid red',
  };

  return (
    <>
      <div>
        <ProfileFormsDataMobile>
          <ImageColumn border={borderDetails[validImage]}>
            <div>
              <img src={newUserData.image} alt={`${newUserData.name}`} />
            </div>
          </ImageColumn>
        </ProfileFormsDataMobile>
        <InputColumn>
          <NameField>Name:</NameField>
          <TextField
            onChange={(e) => setNewUserData({ ...userData, name: e.target.value })}
            fullWidth
            key={newUserData.name}
            defaultValue={newUserData.name}
            disabled={false}
            id="outlined-required"
          />
          <EmailField>Email:</EmailField>
          <TextField
            fullWidth
            disabled={true}
            key={newUserData.email}
            defaultValue={newUserData.email}
            id="outlined-required"
          />
        </InputColumn>
        <ImageUpdateField>
          <div>Avatar:</div>
          <div>
            <TextField
              onChange={(e) => setImageURL(e.target.value)}
              fullWidth
              disabled={false}
              key={userData.image}
              defaultValue={userData.image}
              id="outlined-required"
            />
          </div>
        </ImageUpdateField>
        <ButtonContainerMobile>
          <UpdateDataButton color={validData}>Update</UpdateDataButton>
        </ButtonContainerMobile>
      </div>
    </>
  );
}

async function verifyURL(url) {
  const img = new Image();
  img.src = url;
  return new Promise((resolve) => {
    img.onerror = () => resolve(false);
    img.onload = () => resolve(true);
  });
}

function verifyData(newData, oldData, validImage) {
  if (validImage === 'invalid') {
    return false;
  }
  if (newData.name.length === 0) {
    return false;
  }
  if (newData.image.length === 0) {
    return false;
  }
  if (newData.email.length === 0) {
    return false;
  }
  if (newData.email === oldData.email && newData.image === oldData.image && newData.name === oldData.name) {
    return false;
  }

  return true;
}

async function modifyData(token, userData) {
  const response = await putUser(token, userData);
  if (response.name) {
    return false;
  }

  return true;
}
