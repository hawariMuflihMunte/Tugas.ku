import Dashboard from '../views/pages/dashboard';
import SplashScreen from '../views/pages/splashScreen';
import Details from '../views/pages/details';

const routes = {
  '/': SplashScreen,
  '/splash': SplashScreen,
  '/dashboard': Dashboard,
  '/details/:id': Details
};

export default routes;
