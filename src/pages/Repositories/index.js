import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import PropTypes from 'prop-types';

import Header from '~/componentes/Header';

// import { Container } from './styles';

const Repositories = () => (
  <View>
    <Header title="Repositories" />
  </View>
);

const TabIcon = ({ tintColor }) => <Icon name="repo" color={tintColor} size={20} />;

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Repositories.navigationOptions = {
  tabBarIcon: TabIcon,
};

export default Repositories;
