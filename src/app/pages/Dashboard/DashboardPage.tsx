import Authentication from "app/components/Authentication";
import DashboardHost from "app/components/DashboardHost";
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from "firebaseServices/firebase";
import { useEffect, useState } from "react";
import { LoadingAnimation } from "ui/LoadingAnimation";
import { Box } from "ui/basic";

function DashboardPage() {
  const [initialLoad,setInitialLoad] =  useState(true);
  const [authId, setAuthId] = useState<string | null>(null);
  const [isNewUserAccountCreationInProgress,setIsNewUserAccountCreationInProgress] = useState(false);
  const [dashboardHeight, setDashboardHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setDashboardHeight(window.innerHeight);
    };

    const handleOrientationChange = () => {
      setDashboardHeight(window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    
     const unsubscribe = onAuthStateChanged(auth, (user) => {
       if (user) {
        if(!isNewUserAccountCreationInProgress) {
          setAuthId(user.uid);
        }
       } else {
         setAuthId(null);
       }
       setInitialLoad(false); 
     });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      unsubscribe();
    };
  }, [isNewUserAccountCreationInProgress]);

  const handleAuthentication = (flag: boolean) => {
    setIsNewUserAccountCreationInProgress(flag)
  }
  
  return (
    <Box h={`${dashboardHeight}px`}>
      {initialLoad 
        ? <LoadingAnimation />
        : authId 
        ? <DashboardHost />
        : <Authentication isNewUserAccountCreationInProgress={handleAuthentication}/>
      }
    </Box>
  );
}

export default DashboardPage;
