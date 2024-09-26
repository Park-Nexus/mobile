import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#128085',

    marginBottom: 42,
  },

  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FF5900',

    textAlign: 'center',
  },

  dividerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,

    marginBottom: 16,
    marginTop: 42,
  },
  dividerText: {
    fontSize: 14,
    fontWeight: '400',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#9F9C9C',
  },

  oauthButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
