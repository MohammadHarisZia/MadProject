import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

// local imports
import {Colors} from '../../../DesignSystem/Colors';

const Options = props => {
  const activeCall = props.option === 'call' ? styles.active : {};
  const activeChat = props.option === 'chat' ? styles.active : {};

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          props.onPressChat();
        }}>
        <Text style={[styles.option, activeChat]}>Chats</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          props.onPressCall();
        }}>
        <Text style={[styles.option, activeCall]}>Calls</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#808080',
  },

  option: {
    color: '#484848',
    fontFamily: 'Inter',
    fontSize: 24,
  },

  active: {
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: Colors.Ascent1,
  },
});

export default Options;
