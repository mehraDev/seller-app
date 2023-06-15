import { lazy } from 'react';
import IShops from '../interfaces/shopsInterface';

const shopViewer: IShops = {
    food: lazy(() => import('./Food/Viewer')),
  };

export default shopViewer;