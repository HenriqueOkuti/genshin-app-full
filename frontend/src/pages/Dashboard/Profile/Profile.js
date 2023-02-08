import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import useToken from '../../../hooks/useToken';
import { getUser } from '../../../services/services';
import { ProfileMain, ProfileMobile } from './ProfileForms';
import { AuxContainer, ProfileFormsContainer, ProfileHeaders } from './ProfileStyles';

export function ProfileManager() {
  const [forceUpdate, setForceUpdate] = useOutletContext();
  const tokenHook = useToken();
  const [token, setToken] = useState(tokenHook);
  const [updatedData, setUpdatedData] = useState(false);
  const [userData, setUserData] = useState({
    id: 0,
    name: 'Loading Username',
    email: 'Loading email',
    image: 'https://giffiles.alphacoders.com/214/214140.gif',
  });

  if (!token) {
    setToken(localStorage.getItem('token'));
  }

  useEffect(async () => {
    if (token) {
      const response = await getUser(token);
      if (response.id) {
        setUserData({ ...response });
      }
    }
  }, [token, updatedData]);

  useEffect(() => {
    setForceUpdate(!forceUpdate);
  }, [updatedData]);

  if (window.innerWidth > 700) {
    if (userData?.name) {
      return (
        <AuxContainer>
          <ProfileHeaders>
            <div>Hello, {userData.name}</div>
          </ProfileHeaders>
          <ProfileFormsContainer>
            <ProfileMain userData={{ ...userData }} updatedData={updatedData} setUpdatedData={setUpdatedData} />
          </ProfileFormsContainer>
        </AuxContainer>
      );
    } else {
      return (
        <AuxContainer>
          <ProfileHeaders>
            <div>Hello...</div>
          </ProfileHeaders>
          <div>Loading data...</div>
        </AuxContainer>
      );
    }
  } else {
    if (userData?.name) {
      return (
        <AuxContainer>
          <ProfileHeaders>
            <div>Hello, {userData.name}</div>
          </ProfileHeaders>
          <ProfileFormsContainer>
            <ProfileMobile userData={{ ...userData }} updatedData={updatedData} setUpdatedData={setUpdatedData} />
          </ProfileFormsContainer>
        </AuxContainer>
      );
    } else {
      return (
        <AuxContainer>
          <ProfileHeaders>
            <div>Hello...</div>
          </ProfileHeaders>
          <div>Loading data...</div>
        </AuxContainer>
      );
    }
  }
}
