import React, { lazy, useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from 'firebaseServices/firebase';

import LoadingScreen from 'app/pages/dashboard/LoadingScreen';
import Auth from 'app/pages/dashboard/auth';
import HostWrapper from './styles';
import getFeatureComponents from 'app/services/dashboardPage/dashboardHost/getFeatureComponents';
import { ComponentItemType } from 'app/services/dashboardPage/dashboardHost/getComponentsFromFeatureList';
import {default as onlineIndicator} from 'app/services/dashboardPage/dashboardHost/Pulse';

const Dashboard = lazy(() => import('app/components/Dashboard/Dashboard'));

function Host() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState<ComponentItemType[] | []>([]);
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
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        setUser(user);
        if (user) {
          try {
            const featureList = await getFeatureComponents();
            setFeatures(featureList);
            
          } catch (error) {
            console.error('Error fetching feature list:', error);
            setLoading(false);
          }
        }
        setLoading(false);
    });
    
      return () => {
        unsubscribe();
      };
    }, []);

    useEffect(() => {
      if(user){
        const stopOnlineIndicator = onlineIndicator();
    
        return () => {
          stopOnlineIndicator(); 
        };
      }
      
    }, [user]); 

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
            <LoadingScreen />
            : 
            <Dashboard features={features} onLogout={handleLogout} />}
        </>
      : 
      <Auth />
      }
    </HostWrapper>
  );
}

export default Host;

