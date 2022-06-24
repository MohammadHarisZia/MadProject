import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Voximplant} from 'react-native-voximplant';

// local imports
import {getCallSettings, showError} from '../../../Vox';

const VoiceCall = ({route, navigation}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);

  // getting the data from the params
  const user = route.params?.user;
  const loggedUser = route.params?.loggedUser;
  const isVideoCall = route.params?.isVideoCall;
  const call = route.params?.call;
  const callStatus = route.params?.callStatus;
  const setCallStatus = route.params?.setCallStatus;

  // creating a useRef states to store the call settings and endpoint
  const endpoint = useRef(null); //endpoint of the other user to be used for event subscriptions

  // componentDidMount function to handle the calling functionality including the subcriptions and unsubscriptions
  useEffect(() => {
    // setting the call settings
    const callSettings = getCallSettings(isVideoCall);

    // in case the user receives a call
    const answerCall = async () => {
      subscribeToCallEvents();
      endpoint.current = call.current.getEndpoints()[0];
      subscribeToEndpointEvent();
      call.current.answer(callSettings);
      if (isVideoCall) {
        navigation.navigate('VideoCall', {
          user,
          loggedUser,
          isIncomingCall,
          isVideoCall,
          call,
          callStatus,
          setCallStatus,
        });
        return;
      }
    };

    // function to hangup the call
    const onHangupPress = () => {
      call.current.hangup();
    };

    // call events that can occur on the caller endpoint
    const subscribeToCallEvents = () => {
      call.current.on(Voximplant.CallEvents.Failed, callEvent => {
        showError(callEvent.reason, navigation, loggedUser);
        onHangupPress();
      });
      call.current.on(Voximplant.CallEvents.ProgressToneStart, callEvent => {
        setCallStatus('Calling...');
      });
      call.current.on(Voximplant.CallEvents.Connected, callEvent => {
        setCallStatus('Connected');
      });
      call.current.on(Voximplant.CallEvents.Disconnected, callEvent => {
        navigation.navigate('History');
      });
      call.current.on(Voximplant.CallEvents.EndpointAdded, callEvent => {
        endpoint.current = callEvent.endpoint;
        subscribeToEndpointEvent();
      });
    };

    // call events that can occur on the receiver endpoint
    const subscribeToEndpointEvent = async () => {
      endpoint.current.on(
        Voximplant.EndpointEvents.RemoteVideoStreamAdded,
        endpointEvent => {
          setRemoteVideoStreamId(endpointEvent.videoStream.id);
        },
      );
    };

    // if the call is incoming then call the answer call method else call makeCall method
    answerCall();

    // onComponentUnbound event, all the callEvents will be unsubscribed
    return () => {
      call.current.off(Voximplant.CallEvents.Failed);
      call.current.off(Voximplant.CallEvents.ProgressToneStart);
      call.current.off(Voximplant.CallEvents.Connected);
      call.current.off(Voximplant.CallEvents.Disconnected);
    };
  }, [isVideoCall]);

  // function to hangup the call
  const onHangupPress = () => {
    call.current.hangup();
  };

  // function to toggle mute
  const toggleMute = () => {
    call.current.sendAudio(isMuted);
    setIsMuted(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
      {/* back btn */}
      <TouchableOpacity style={styles.backBtn}>
        <Ionicons name="chevron-back" size={30} color={'#484848'} />
      </TouchableOpacity>

      <View style={styles.userInfo}>
        <Text style={styles.username}>
          {user?.userName ? user?.userName : user}
        </Text>
        <Text style={styles.time}>{'In a call'}</Text>
      </View>

      {/* controls */}
      <View style={styles.callControlsContainer}>
        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={[
              styles.smallIcon,
              {backgroundColor: `${isMuted ? '#808080' : '#eeeeee'}`},
            ]}
            onPress={toggleMute}>
            <FontAwesome name="microphone-slash" size={20} color={'#fff'} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.bigIcon]} onPress={onHangupPress}>
            <Material name="call-end" size={30} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.smallIcon,
              {backgroundColor: `${isSpeaker ? '#808080' : '#eeeeee'}`},
            ]}
            onPress={() => {
              setIsSpeaker(prevState => !prevState);
            }}>
            <Ionicons name="videocam" size={20} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default VoiceCall;

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

  time: {
    color: '#808080',
    padding: 20,
    fontFamily: 'Inter',
    fontSize: 20,
  },

  callControlsContainer: {
    flex: 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  controlsRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  smallIcon: {
    padding: 15,
    backgroundColor: '#d0d0d0',
    borderRadius: 50,
  },

  bigIcon: {
    padding: 20,
    backgroundColor: '#990000',
    borderRadius: 50,
    zIndex: 2,
  },
});
