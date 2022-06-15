import {View, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

// local imports
import {Colors} from '../../../DesignSystem/Colors';

const ChatHeader = () => {
  return (
    <View style={styles.container}>
      {/* Back icon */}

      <TouchableOpacity style={styles.backBtn}>
        <Ionicons name="chevron-back" size={30} color={'#484848'} />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={() => {}}
          placeholder={'Search...'}
          style={styles.search}
          placeholderTextColor={Colors.Primary3}
        />
        <TouchableOpacity style={styles.searchIconContainer}>
          <Ionicons name="search" size={20} color={'#484848'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.Primary3,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 150 / 2,
    width: 200,
    backgroundColor: Colors.Secondary3,
  },
  searchIconContainer: {
    padding: 5,
    // backgroundColor: Colors.,
  },
});

export default ChatHeader;
