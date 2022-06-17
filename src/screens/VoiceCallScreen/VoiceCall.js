import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const VoiceCall = props => {
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);

  return (
    <View style={styles.container}>
      {/* back btn */}
      <TouchableOpacity style={styles.backBtn}>
        <Ionicons name="chevron-back" size={30} color={'#484848'} />
      </TouchableOpacity>

      {/* username and time */}
      <View style={styles.userInfo}>
        <Text style={styles.username}>
          {props?.username ? props?.username : 'Default user'}
        </Text>
        <Text style={styles.time}>12:22</Text>
      </View>

      {/* controls */}
      <View style={styles.callControlsContainer}>
        {/* icons row 1 */}
        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.smallIcon}>
            <Material name="message" size={20} color={'#fff'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallIcon}>
            <Ionicons name="videocam" size={20} color={'#fff'} />
          </TouchableOpacity>
        </View>

        {/* icons row 2 */}
        <View style={styles.controlsRow}>
          <TouchableOpacity
            style={[
              styles.smallIcon,
              {backgroundColor: `${isMuted ? '#808080' : '#eeeeee'}`},
            ]}
            onPress={() => {
              setIsMuted(prevState => !prevState);
            }}>
            <FontAwesome name="microphone-slash" size={20} color={'#fff'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.hangup}>
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
            <AntDesign name="sound" size={20} color={'#fff'} />
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
  },
});
