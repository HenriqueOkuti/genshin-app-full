//Layout for the Main Dashboard version (non-mobile)

import styled from 'styled-components';

export const PageContainer = styled.div`
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DashboardContainer = styled.div`
  height: 80%;
  width: 80%;

  display: flex;

  background: red;

  border-radius: 20px;
`;

export const SideMenuContainer = styled.div`
  height: 100%;
  width: 30%;
  max-width: 300px;
  background: ${(props) => props.colors.hex6};
  border-radius: 20px 0 0 20px;
`;

export const MainMenuContainer = styled.div`
  height: 100%;
  width: 100%;
  background: ${(props) => props.colors.hex5};
  border-radius: 0 20px 20px 0;
`;

export const ContentContainer = styled.div`
  margin: 7% 6% 8% 6%;
  height: 85%;
  width: 88%;
`;
