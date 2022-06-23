import {Voximplant} from 'react-native-voximplant';
import {Alert, Platform, PermissionsAndroid} from 'react-native';
import {VOXIMPLANT_APP, VOXIMPLANT_ACCOUNT} from './src/constants/Constant';

// getting the voximplant instance
export const voximplant = Voximplant.getInstance();

// permissions to be granted for the android application
export const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA,
];

// video call settings

export const getCallSettings = isVideo => {
  const voiceCallSettings = {
    video: {
      sendVideo: false,
      receiveVideo: false,
    },
  };
  const videoCallSettings = {
    video: {
      sendVideo: true,
      receiveVideo: true,
    },
  };
  return isVideo ? videoCallSettings : voiceCallSettings;
};

// function to connect and login the user to the voximplant sdk
export const login = async (user, password, navigation) => {
  try {
    let clientState = await voximplant.getClientState();
    if (clientState === Voximplant.ClientState.DISCONNECTED) {
      await voximplant.connect();
      await voximplant.login(
        `${user}@${VOXIMPLANT_APP}.${VOXIMPLANT_ACCOUNT}.voximplant.com`,
        password,
      );
    }
    if (clientState === Voximplant.ClientState.CONNECTED) {
      await voximplant.login(
        `${user}@${VOXIMPLANT_APP}.${VOXIMPLANT_ACCOUNT}.voximplant.com`,
        password,
      );
    }
    // navigation.navigate('History');
  } catch (e) {
    let message;
    switch (e.name) {
      case Voximplant.ClientEvents.ConnectionFailed:
        message = 'Connection error, check your internet connection';
        break;
      case Voximplant.ClientEvents.AuthResult:
        message = convertCodeMessage(e.code);
        break;
      default:
        message = 'Unknown error. Try again';
    }
    showError(message);
  }
};

// requesting permissions from the android device to use the microphone and camera
export const requestPermissions = async isVideoCall => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      const recordAudioGranted =
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';
      const cameraGranted =
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';
      if (recordAudioGranted) {
        if (isVideoCall && !cameraGranted) {
          console.warn(
            'MainScreen: makeCall: camera permission is not granted',
          );
          return false;
        }
        return true;
      } else {
        console.warn(
          'MainScreen: makeCall: record audio permission is not granted',
        );
        return false;
      }
    }
  } catch (e) {
    console.warn(`MainScreen: makeCall failed: ${e}`);
  }
};

//function to convert the error code into a message
export function convertCodeMessage(code) {
  switch (code) {
    case 401:
      return 'Invalid password';
    case 404:
      return 'Invalid user';
    case 491:
      return 'Invalid state';
    default:
      return 'Try again later';
  }
}

// function to show the error on mobile
export function showError(message, navigation, user) {
  Alert.alert('Login error', message, [
    {
      text: 'OK',
      onPress: () => {
        if (navigation) {
          navigation.navigate('History', {uID: user.id});
        }
      },
    },
  ]);
}

// call events that can occur on the caller endpoint
export const subscribeToCallEvents = (
  call,
  navigation,
  setCallStatus,
  setLocalVideoStreamId,
  endpoint,
  setRemoteVideoStreamId,
) => {
  call.current.on(Voximplant.CallEvents.Failed, callEvent => {
    showError(callEvent.reason, navigation);
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
  call.current.on(Voximplant.CallEvents.LocalVideoStreamAdded, callEvent => {
    setLocalVideoStreamId(callEvent.videoStream.id);
  });
  call.current.on(Voximplant.CallEvents.EndpointAdded, callEvent => {
    endpoint.current = callEvent.endpoint;
    subscribeToEndpointEvent(endpoint, setRemoteVideoStreamId);
  });
};

// call events that can occur on the receiver endpoint
export const subscribeToEndpointEvent = async (
  endpoint,
  setRemoteVideoStreamId,
) => {
  endpoint.current.on(
    Voximplant.EndpointEvents.RemoteVideoStreamAdded,
    endpointEvent => {
      setRemoteVideoStreamId(endpointEvent.videoStream.id);
    },
  );
};

export const unsubscribeFromCallEvents = () => {
  call.current.off(Voximplant.CallEvents.Failed);
  call.current.off(Voximplant.CallEvents.ProgressToneStart);
  call.current.off(Voximplant.CallEvents.Connected);
  call.current.off(Voximplant.CallEvents.Disconnected);
};
