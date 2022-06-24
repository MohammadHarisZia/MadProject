import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Voximplant} from 'react-native-voximplant';

// local imports
import {getCallSettings, showError} from '../../../Vox';

const VideoCall = ({route, navigation}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideo, setIsVideo] = useState(true);

  // getting the data from the params
  const user = route.params?.user;
  const loggedUser = route.params?.loggedUser;
  const isVideoCall = route.params?.isVideoCall;
  const call = route.params?.call;
  const callStatus = route.params?.callStatus;
  const setCallStatus = route.params?.setCallStatus;
  const endpoint = useRef(null); //endpoint of the other user to be used for event subscriptions

  // hooks
  const [localVideoStreamId, setLocalVideoStreamId] = useState(); //hook that will contain the id to the local video stream
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState(); //hook that will contain the id to the remove video stream

  // componentDidMount function to handle the calling functionality including the subcriptions and unsubscriptions
  useEffect(() => {
    // setting the call settings
    const callSettings = getCallSettings(isVideoCall);

    // in case the user receives a call and he accepts it
    const answerCall = async () => {
      subscribeToCallEvents();
      endpoint.current = call.current.getEndpoints()[0];
      subscribeToEndpointEvent();
      call.current.answer(callSettings);
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
        console.log(loggedUser);
        navigation.navigate('History');
      });
      call.current.on(
        Voximplant.CallEvents.LocalVideoStreamAdded,
        callEvent => {
          setLocalVideoStreamId(callEvent.videoStream.id);
          console.log('local video id', callEvent.videoStream.id);

          console.log(localVideoStreamId);
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
          console.log('remote video id', endpointEvent.videoStream.id);
          console.log(remoteVideoStreamId);
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
  }, []);

  // function to hangup the call
  const onHangupPress = () => {
    call.current.hangup();
  };

  // function to toggle mute
  const toggleMute = () => {
    call.current.sendAudio(isMuted);
    setIsMuted(prevState => !prevState);
  };

  // function to toggle video
  const toggleVideo = () => {
    call.current.sendVideo(isVideo);
    setIsVideo(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
      {/* back btn */}
      <TouchableOpacity style={styles.backBtn}>
        <Ionicons name="chevron-back" size={30} color={'#484848'} />
      </TouchableOpacity>

      {/* Callee cam */}
      <Voximplant.VideoView
        videoStreamId={remoteVideoStreamId}
        style={styles.remoteVideo}
      />

      {/* Caller cam */}
      {isVideo && (
        <Voximplant.VideoView
          videoStreamId={localVideoStreamId}
          style={styles.localVideo}
        />
      )}

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[
            styles.smallIcon,
            {backgroundColor: `${isMuted ? '#808080' : '#eeeeee'}`},
          ]}
          onPress={toggleMute}>
          <FontAwesome name="microphone-slash" size={20} color={'#fff'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bigIcon} onPress={onHangupPress}>
          <Material name="call-end" size={30} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.smallIcon,
            {backgroundColor: `${isVideo ? '#808080' : '#eeeeee'}`},
          ]}
          onPress={toggleVideo}>
          <Ionicons name="videocam" size={20} color={'#fff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoCall;

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

  localVideo: {
    width: 100,
    height: 150,
    backgroundColor: '#ffff6e',
    borderRadius: 10,
    position: 'absolute',
    right: 10,
    top: 100,
  },
  remoteVideo: {
    backgroundColor: '#7b4e80',
    borderRadius: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 100,
  },
  controls: {
    width: '100%',
    flexDirection: 'row',
    height: '10%',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: '#eee',
    position: 'absolute',
    bottom: 40,
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
