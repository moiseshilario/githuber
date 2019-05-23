import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import '~/config/ReactotronConfig';
import '~/config/DevtoolsConfig';

import createNavigator from './routes';

const App = () => {
  const [userChecked, setUserChecked] = useState(false);
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const username = await AsyncStorage.getItem('@Githuber:username');
      setUserChecked(true);
      setUserLogged(!!username);
    };

    getUser();
  }, []);

  if (!userChecked) return null;

  const Routes = createNavigator(userLogged);

  return <Routes />;
};

export default App;
