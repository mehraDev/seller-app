import { lazy, Suspense, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import LoginPage from '../Welcome/Login/LoginPage';
import LoadingPage from '../Loading/LoadingPage';
import getFeatureListWithComponents from 'app/services/DashboardPage/getFeatueListWithComponents';
import { ComponentItemType } from 'app/services/DashboardPage/getComponentFromFeatureList';

const Dashboard = lazy(() => import('app/components/Dashboard/Dashboard'));

function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState<ComponentItemType[] | []>([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        try {
          const featureList = await getFeatureListWithComponents();
          setFeatures(featureList);
        } catch (error) {
          console.error('Error fetching feature list:', error);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Suspense fallback={<LoadingPage />}>
      {loading ? (
        <LoadingPage />
      ) : user ? (
        <Dashboard features={features} />
      ) : (
        <LoginPage />
      )}
    </Suspense>
  );
}

export default DashboardPage;
