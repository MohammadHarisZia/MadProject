import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

// local imports
import {Colors} from '../../../DesignSystem/Colors';
import {messages} from '../../../DummyData/messages';

const Message = props => {
  const background = props?.senderID !== props?.id ? '#eeeeee' : '#484848';
  const color = props?.senderID !== props?.id ? '#484848' : '#eeeeee';
  const align = props?.senderID === props?.id ? 'flex-end' : 'flex-start';

  // console.log(background, color, align);
  // console.log('current user', props?.senderID);
  // console.log('message id', props?.id);
  // console.log('bool', props?.senderID === props?.id);

  return (
    <View style={[styles.container, {justifyContent: align}]} key={props.id}>
      <Text
        style={[styles.message, {backgroundColor: background, color: color}]}>
        {props?.message ? props?.message : 'Lorem dolor velit ex ea.'}
      </Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    margin: 10,
    flexDirection: 'row',
  },

  message: {
    maxWidth: '70%',
    fontSize: 12,
    fontFamily: 'Roboto',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
});
