import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, Image } from 'react-native';

import styles from './styles';

const OrganizationItem = ({ org }) => (
  <View style={styles.container}>
    <Image style={styles.avatar} source={{ url: org.avatar_url }} />
    <Text style={styles.title}>{org.login}</Text>
  </View>
);

OrganizationItem.propTypes = {
  org: PropTypes.shape({
    avatar_url: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrganizationItem;
