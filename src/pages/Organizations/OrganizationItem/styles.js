import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    padding: metrics.basePadding,
    marginTop: metrics.baseMargin,
    alignItems: 'center',
    maxWidth: (metrics.screenWidth - 60) / 2,
    // 60 = 20 (marginLeft) + 20 (marginRight) + 20 between items
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: metrics.baseRadius,
  },

  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.darker,
    marginTop: metrics.baseMargin,
  },
});

export default styles;
