import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import {Voximplant} from 'react-native-voximplant';

// local imports
import {voximplant, getCallSettings, showError, login} from '../../../Vox';

const Calling = ({route, navigation}) => {
  // getting the data from the params
  const user = route.params?.user;
  const loggedUser = route.params?.loggedUser;
  const isIncomingCall = route.params?.isIncomingCall;
  const isVideoCall = route.params?.isVideoCall;
  const incomingCall = route.params?.call;
  // hooks
  const [localVideoStreamId, setLocalVideoStreamId] = useState(''); //hook that will contain the id to the local video stream
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState(''); //hook that will contain the id to the remove video stream

  console.log('CALLINGSCREEN', isVideoCall);

  // creating a useRef states to store the call settings and endpoint
  const call = useRef(incomingCall); //call object to store the call properties and used for event subscriptions
  const endpoint = useRef(null); //endpoint of the other user to be used for event subscriptions

  // hooks
  const [callStatus, setCallStatus] = useState('Initializing...'); //hook that will show the current status of the call

  // componentDidMount function to handle the calling functionality including the subcriptions and unsubscriptions
  useEffect(() => {
    // setting the call settings
    const callSettings = getCallSettings(isVideoCall);

    // creating a makeCall async function to call the callee
    const makeCall = async () => {
      call.current = await voximplant.call(user.userName, callSettings);
      subscribeToCallEvents();
    };

    // in case the user receives a call and he accepts it
    const answerCall = async () => {
      if (!isVideoCall) {
        navigation.navigate('VoiceCall', {
          user,
          loggedUser,
          isIncomingCall,
          isVideoCall,
          call,
          callStatus,
          setCallStatus,
        });
      } else {
        navigation.navigate('VideoCall', {
          user,
          loggedUser,
          isIncomingCall,
          isVideoCall,
          call,
          callStatus,
          setCallStatus,
        });
      }
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
        if (!isVideoCall) {
          navigation.navigate('VoiceCall', {
            user,
            loggedUser,
            isIncomingCall,
            isVideoCall,
            call,
            callStatus,
            setCallStatus,
          });
        } else {
          navigation.navigate('VideoCall', {
            user,
            loggedUser,
            isIncomingCall,
            isVideoCall,
            call,
            callStatus,
            setCallStatus,
            localVideoStreamId,
            remoteVideoStreamId,
          });
        }
      });
      call.current.on(Voximplant.CallEvents.Disconnected, callEvent => {
        console.log(loggedUser);
        // navigation.navigate('History', {uID: loggedUser?.id});
        navigation.navigate('History');
      });
      call.current.on(
        Voximplant.CallEvents.LocalVideoStreamAdded,
        callEvent => {
          setLocalVideoStreamId(callEvent.videoStream.id);
        },
      );
      call.current.on(Voximplant.CallEvents.EndpointAdded, callEvent => {
        endpoint.current = callEvent.endpoint;
        subscribeToEndpointEvent();
      });
      call.current.on(Voximplant.CallEvents.NOT_LOGGED_IN, callEvent => {
        login(loggedUser.username, loggedUser.password, navigation);
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
    isIncomingCall ? answerCall() : makeCall();

    // onComponentUnbound event, all the callEvents will be unsubscribed
    return () => {
      call.current.off(Voximplant.CallEvents.Failed);
      call.current.off(Voximplant.CallEvents.ProgressToneStart);
      call.current.off(Voximplant.CallEvents.Connected);
      call.current.off(Voximplant.CallEvents.Disconnected);
    };
  }, []);

  // function to hangup the call
  const onHangupPress = () => {
    call.current.hangup();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn}>
        <Ionicons name="chevron-back" size={30} color={'#484848'} />
      </TouchableOpacity>
      <View style={styles.userInfo}>
        <Text style={styles.username}>
          {user?.userName ? user?.userName : user}
        </Text>
        <Text style={styles.ringing}>{callStatus}</Text>
      </View>
      <View style={styles.hangupContainer}>
        <TouchableOpacity style={styles.hangup}>
          <Material name="call-end" size={30} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Calling;

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

  ringing: {
    color: 'transparent',
    padding: 20,
    fontFamily: 'Inter',
    fontSize: 20,
  },

  hangupContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  hangup: {
    padding: 20,
    backgroundColor: '#990000',
    borderRadius: 50,
  },
});
