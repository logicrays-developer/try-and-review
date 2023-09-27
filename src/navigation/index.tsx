import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {TStateData} from '../typings/SliceData';
import {Auth} from './Auth';
import { Main } from './Main';
import {setExistingUser} from '../redux/slice';
import {Loader} from '../components';
import * as Keychain from 'react-native-keychain';
import { UserCredentials } from 'react-native-keychain';

const AppRouter = () => {
  
  // import global state by useSelector
  const {isExistingUser} = useSelector((state: TStateData) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // check for user already logged in
    getUserFromLocal();
  }, []);

  const getUserFromLocal = async () => {
    let dataStored : false | UserCredentials = await Keychain.getGenericPassword();
    const username: string = dataStored ? dataStored.username : "";
    let user = username ? JSON.parse(username) : null;
    if (user) {
      dispatch(setExistingUser(true));
    }
    setLoading(false);
  };

  return (
    <NavigationContainer>
      {loading ? <Loader /> : isExistingUser ? <Main /> : <Auth />}
    </NavigationContainer>
  );
};

export default AppRouter;
