import {StyleSheet, TextInput, View, Button} from 'react-native';
import React, {useState} from 'react';

export default function Login({navigation}) {
  const [id, setId] = useState(0);

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
          navigation.navigate('History', {uID: id});
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
