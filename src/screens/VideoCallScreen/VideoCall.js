import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const VideoCall = props => {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);
  return (
    <View style={styles.container}>
      {/* back btn */}
      <TouchableOpacity style={styles.backBtn}>
        <Ionicons name="chevron-back" size={30} color={'#484848'} />
      </TouchableOpacity>

      {/* Caller cam */}
      <View style={styles.callerCam}></View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[
            styles.control,
            {backgroundColor: `${isMuted ? '#808080' : '#eee'}`},
          ]}
          onPress={() => {
            setIsMuted(prevState => !prevState);
          }}>
          <FontAwesome name="microphone-slash" size={30} color={'#fff'} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.hangup}>
          <Material name="call-end" size={30} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.control,
            {backgroundColor: `${isSpeaker ? '#808080' : '#eeeeee'}`},
          ]}
          onPress={() => {
            setIsSpeaker(prevState => !prevState);
          }}>
          <AntDesign name="sound" size={20} color={'#fff'} />
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

  callerCam: {
    width: 150,
    height: 200,
    backgroundColor: '#484848',
    position: 'absolute',
    right: 20,
    bottom: 300,
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

  control: {
    padding: 20,
    borderRadius: 50,
  },

  hangup: {
    padding: 20,
    backgroundColor: '#990000',
    borderRadius: 50,
  },
});
