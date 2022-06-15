import React from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/Colors';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const TextColors2 = ({navigation, route}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.flex}
        onPress={() => {
          navigation.navigate('TextColors');
        }}>
        <Text style={[Typography.Header_24pt, {color: Colors.Primary1}]}>
          Hello
        </Text>
        <Text style={[Typography.Header_24pt, {color: Colors.Primary2}]}>
          Hello
        </Text>
        <Text style={[Typography.Header_24pt, {color: Colors.Primary3}]}>
          Hello
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
});

export default TextColors2;
