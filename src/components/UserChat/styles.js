import {StyleSheet} from 'react-native';

// local imports
import {Colors} from '../../../DesignSystem/Colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: Colors.Secondary3,
  },

  chatContainer: {
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  username: {
    fontSize: 24,
    marginBottom: 5,
    fontFamily: 'Inter',
    color: '#484848',
  },

  recentMessage: {fontFamily: 'Inter', fontSize: 10, color: '#808080'},

  time: {
    fontFamily: 'Inter',
    fontSize: 15,
    marginBottom: 12,
    color: '#808080',
  },

  notification: {
    width: 10,
    height: 10,
    borderRadius: 15,
    backgroundColor: Colors.Ascent1,
    alignSelf: 'flex-end',
  },
});
