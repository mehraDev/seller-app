import { lazy } from 'react';
import IShops from '../interfaces/shopsInterface';

const shopViewer: IShops = {
    food: lazy(() => import('./Food/ViewerFood')),
  };

export default shopViewer;