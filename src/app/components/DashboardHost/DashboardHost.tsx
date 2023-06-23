import { lazy, useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from 'firebaseServices/firebase';
import HostWrapper from './styles';

import {  AuthenticationPage } from 'app/pages/Dashboard';

import { Feature } from './services/getComponentsFromFeatureList';
import LoadingAnimation from 'ui/LoadingAnimation/LoadingAnimation';
import { getFeatures } from './services';

const Dashboard = lazy(() => import('app/components/Dashboard/Dashboard'));

function DashboardHost() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState<Feature[] | []>([]);
  const [dashboardHeight, setDashboardHeight] = useState(window.innerHeight);
    useEffect(() => {
      const handleResize = () => {
        setDashboardHeight(window.innerHeight);
      };
  
      const handleOrientationChange = () => {
        setDashboardHeight(window.innerHeight);
      };
  
      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleOrientationChange);
  
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleOrientationChange);
      };
    }, []);

    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            try {
              setUser(user);
              localStorage.setItem('user', JSON.stringify(user.uid));
            } catch (error) {
              setLoading(false);
            }
          }
        });
    
        return () => {
          unsubscribe();
        };
      }
    }, []);
    
    useEffect(() => {
      if (user) {
        const fetchData = async () => {
          try {
            const updatedFeatureList = await getFeatures();
            setFeatures(updatedFeatureList);
            setLoading(false);
          } catch (error) {
          }
        };
        fetchData();
      }
    }, [user]);
    // useEffect(() => {
    //   if(user){
    //     const stopOnlineIndicator = onlineIndicator();
    
    //     return () => {
    //       stopOnlineIndicator(); 
    //     };
    //   }
      
    // }, [user]); 

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUser(null);
  };

  return (
    <HostWrapper height={dashboardHeight}>
      {user ? 
        <>
          {loading ? 
            <LoadingAnimation />
            : 
            <Dashboard features={features} onLogout={handleLogout} />}
        </>
      : 
      <AuthenticationPage />
      }
    </HostWrapper>
  );
}

export default DashboardHost;

