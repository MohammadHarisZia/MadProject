import {StyleSheet, TextInput, View, Button} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const storeData = async value => {
    try {
      await AsyncStorage.setItem('userID', JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  };

  const [id, setId] = useState(1);

  return (
    <View>
      <TextInput
        style={{
          width: '100%',
          height: 20,
          backgroundColor: 'green',
          color: 'white',
        }}
        onChangeText={text => {
          console.log(text);
          setId(text);
        }}
      />
      <Button
        title={'Enter'}
        onPress={() => {
          storeData(id ? id : 1);
          // navigation.navigate('History', {uID: id});
          navigation.navigate('History');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
