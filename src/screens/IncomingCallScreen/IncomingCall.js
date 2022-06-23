import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import {Voximplant} from 'react-native-voximplant';

const IncomingCall = ({route, navigation}) => {
  const [caller, setCaller] = useState('');
  const {call, callee} = route.params;

  // onComponentDidMount hook to get the display name of the caller and add an event handler if the user decides to decline the call
  useEffect(() => {
    setCaller(call.getEndpoints()[0].displayName);

    call.on(Voximplant.CallEvents.Disconnected, callEvent => {
      navigation.navigate('History', {uID: callee.id});
    });
    return () => {
      call.off(Voximplant.CallEvents.Disconnected);
    };
  }, []);

  const onDecline = () => {
    call.decline();
  };

  const onAccept = () => {
    navigation.navigate('Calling', {
      callee: caller,
      call,
      isIncomingCall: true,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn}>
        <Ionicons name="chevron-back" size={30} color={'#484848'} />
      </TouchableOpacity>
      <View style={styles.userInfo}>
        <Text style={styles.username}>{caller ? caller : 'Default user'}</Text>
        <Text style={styles.incoming}>Incoming Call....</Text>
      </View>
      <View style={styles.callControlsContainer}>
        <TouchableOpacity style={styles.hangup} onPress={onDecline}>
          <Material name="call-end" size={30} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.answer} onPress={onAccept}>
          <Material name="call" size={30} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IncomingCall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 2,
  },

  userInfo: {
    backgroundColor: '#eeeeee',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  username: {
    color: '#484848',
    fontFamily: 'Inter',
    fontSize: 32,
    textAlign: 'center',
    // marginVertical: "auto"
  },

  incoming: {
    color: '#808080',
    padding: 20,
    fontFamily: 'Inter',
    fontSize: 20,
  },

  callControlsContainer: {
    flex: 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },

  hangup: {
    padding: 20,
    backgroundColor: '#990000',
    borderRadius: 50,
  },

  answer: {
    padding: 20,
    backgroundColor: '#009900',
    borderRadius: 50,
  },
});
