import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';

import {
  View, Text, ActivityIndicator, FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

import Header from '~/componentes/Header';
import RepositoryItem from './RepositoryItem/index';

import api from '~/services/api';
import styles from './styles';

const TabIcon = ({ tintColor }) => <Icon name="repo" color={tintColor} size={22} />;

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

const renderListItem = ({ item }) => <RepositoryItem repo={item} />;

renderListItem.propTypes = {
  item: PropTypes.shape({
    full_name: PropTypes.string.isRequired,
    stargazers_count: PropTypes.number.isRequired,
    forks_count: PropTypes.number.isRequired,
    watchers_count: PropTypes.number.isRequired,
  }).isRequired,
};

const Repositories = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadRepositories();
  }, []);

  const loadRepositories = async () => {
    setRefreshing(true);
    const username = await AsyncStorage.getItem('@Githuber:username');
    const { data } = await api.get(`/users/${username}/repos`);

    setRepos(data);
    setLoading(false);
    setRefreshing(false);
  };

  const renderList = () => (
    <FlatList
      data={repos}
      onRefresh={loadRepositories}
      refreshing={refreshing}
      keyExtractor={item => String(item.id)}
      renderItem={renderListItem}
    />
  );

  return (
    <View style={styles.container}>
      <Header title="Repositories" />
      {loading ? <ActivityIndicator style={styles.loading} size="large" /> : renderList()}
      <Text />
    </View>
  );
};

Repositories.navigationOptions = {
  tabBarIcon: TabIcon,
};

export default Repositories;
