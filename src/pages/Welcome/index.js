import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

import api from '~/services/api';

import styles from './styles';

const Welcome = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const checkUserExists = async () => {
    const user = await api.get(`/users/${username}`);

    return user;
  };

  const saveUser = async () => {
    AsyncStorage.setItem('@Githuber:username', username);
  };

  const signIn = async () => {
    setLoading(true);

    try {
      await checkUserExists(username);
      await saveUser(username);

      navigation.navigate('User');
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.text}>To continue, please insert your github username</Text>

      {error && <Text style={styles.error}>User not found</Text>}

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Insert your username"
          underlineColorAndroid="transparent"
          value={username}
          onChangeText={text => setUsername(text)}
        />

        <TouchableOpacity style={styles.button} onPress={signIn}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Enter</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

Welcome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Welcome;
