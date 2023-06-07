import React, { lazy, useEffect, useState } from 'react';
import { User, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from 'firebaseServices/firebase';
import HostWrapper from './styles';

import {  AuthenticationPage, LoadingPage } from 'app/pages/Dashboard';
import { getFeatureComponents } from './services';
import { Feature } from './services/getComponentsFromFeatureList';


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
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const featureList = await getFeatureComponents();
            setFeatures(featureList);
            setUser(user);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching feature list:', error);
            setLoading(false);
          }
        }
    });
    
      return () => {
        unsubscribe();
      };
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
            <LoadingPage />
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

