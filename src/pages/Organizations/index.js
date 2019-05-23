import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View } from 'react-native';

import Header from '~/componentes/Header';

// import { Container } from './styles';

const Organizations = () => (
  <View>
    <Header title="Organizations" />
  </View>
);

const TabIcon = ({ tintColor }) => <Icon name="building" color={tintColor} size={22} />;

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Organizations.navigationOptions = {
  tabBarIcon: TabIcon,
};

export default Organizations;
