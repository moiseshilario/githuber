import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';

import {
  View, Text, ActivityIndicator, FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Header from '~/componentes/Header';
import OrganizationItem from './OrganizationItem/index';

import api from '~/services/api';
import styles from './styles';

const TabIcon = ({ tintColor }) => <Icon name="building" color={tintColor} size={22} />;

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

const renderListItem = ({ item }) => <OrganizationItem org={item} />;

renderListItem.propTypes = {
  item: PropTypes.shape({
    full_name: PropTypes.string.isRequired,
    stargazers_count: PropTypes.number.isRequired,
    forks_count: PropTypes.number.isRequired,
    watchers_count: PropTypes.number.isRequired,
  }).isRequired,
};

const Organizations = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadOrganizations();
  }, []);

  const loadOrganizations = async () => {
    setRefreshing(true);
    const username = await AsyncStorage.getItem('@Githuber:username');
    const { data } = await api.get(`/users/${username}/orgs`);

    setRepos(data);
    setLoading(false);
    setRefreshing(false);
  };

  const renderList = () => (
    <FlatList
      data={repos}
      onRefresh={loadOrganizations}
      refreshing={refreshing}
      keyExtractor={item => String(item.id)}
      renderItem={renderListItem}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
    />
  );

  return (
    <View style={styles.container}>
      <Header title="Organizations" />
      {loading ? <ActivityIndicator style={styles.loading} size="large" /> : renderList()}
      <Text />
    </View>
  );
};

Organizations.navigationOptions = {
  tabBarIcon: TabIcon,
};

export default Organizations;
