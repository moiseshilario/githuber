import React from 'react';
import PropTypes from 'prop-types';

import {
  View, Text, TouchableOpacity, StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from 'react-navigation';

import styles from './styles';

const Header = ({ title, navigation }) => {
  const signOut = async () => {
    await AsyncStorage.clear();

    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.left} />
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={signOut}>
        <Icon style={styles.icon} name="exit-to-app" />
      </TouchableOpacity>
    </View>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(Header);
