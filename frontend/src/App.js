import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { DefaultThemes } from './assets/themes/Themes';
import ThemeContext from './contexts/ThemeContext';
import UserContext from './contexts/UserContext';
import { Background } from './layouts/layouts';
import { OAuth } from './pages/Authentication/OAuth';
import { BackpackManager } from './pages/Dashboard/Backpack/Backpack';
import { CharactersManager } from './pages/Dashboard/Characters/Characters';
import { HomeManager } from './pages/Dashboard/Home/Home';
import { ProfileManager } from './pages/Dashboard/Profile/Profile';
import { TasksManager } from './pages/Dashboard/Tasks/Tasks';
import { Dashboard, LandingPage, Login, SignUp } from './pages/pages';

export default function App() {
  const token = localStorage.getItem('token');
  const usedTheme = JSON.parse(localStorage.getItem('theme'));
  const [userTheme, setUserTheme] = useState(usedTheme);
  const [userToken, setUserToken] = useState(token);

  useEffect(() => {
    if (!usedTheme) {
      const availableThemes = DefaultThemes;
      localStorage.setItem('theme', JSON.stringify(availableThemes[0]));
      setUserTheme(availableThemes[0]);
    }
  }, [userTheme]);

  useEffect(() => {
    if (!userTheme) {
      const availableThemes = DefaultThemes;
      setUserTheme(availableThemes[0]);
    }

    const items = localStorage.getItem('items');
    if (items) {
      localStorage.removeItem('items');
    }
  }, []);

  if (userTheme) {
    return (
      <>
        <ToastContainer />
        <Background colors={userTheme.palette}>
          <ThemeContext.Provider value={{ userTheme, setUserTheme }}>
            <UserContext.Provider value={{ userToken, setUserToken }}>
              <Router>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/OAuth" element={<OAuth />} />

                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    }
                  >
                    <Route path="profile" element={<ProfileManager />} />
                    <Route path="home" element={<HomeManager />} />
                    <Route path="characters" element={<CharactersManager />} />
                    <Route path="backpack" element={<BackpackManager />} />
                    <Route path="tasks" element={<TasksManager />} />
                    <Route index path="*" element={<Navigate to="/dashboard/home" />} />
                  </Route>
                </Routes>
              </Router>
            </UserContext.Provider>
          </ThemeContext.Provider>
        </Background>
      </>
    );
  } else {
    return <></>;
  }
}

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
