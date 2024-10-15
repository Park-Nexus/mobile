import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    height: 220,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    paddingTop: 0,
  },

  pill: {
    backgroundColor: '#d7d7d7',
    width: 50,
    height: 4,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 8,
  },

  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleItemWrapper: {
    flexDirection: 'column',
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
  },
  subTitleText: {
    color: '#5A5555',
    fontSize: 14,
    fontWeight: '400',
    maxWidth: 180,
  },
});
