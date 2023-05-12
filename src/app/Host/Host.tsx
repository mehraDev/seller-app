import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { User, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import WelcomePage from 'app/pages/Welcome/Welcome';
import DashboardPage from 'app/pages/Dashboard/Dashboard';

function Host() {
  const [user, setUser] = React.useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigate('/');
  };

  return (
    <>
      {user ? (
        <>
          <DashboardPage />
        </>
      ) : (
        <WelcomePage />
      )}
    </>
  );
}

export default Host;
