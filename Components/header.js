import React from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/Colors';
import LightTheme from '../DesignSystem/LightTheme';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PakMedicLogo from '../assets/Icons/PakMedicLogo';

const Header = () => {
  return (
    <View style={[styles.header, styles.flex]}>
      <View style={[styles.flex]}>
        <PakMedicLogo
          width={40}
          height={40}
          style={{
            marginLeft: 20,
            marginRight: 20,
            borderRadius: 20,
          }}
        />
        <Text style={[Typography.Header_20pt, {color: 'white'}]}>
          Pak Medic
        </Text>
      </View>
      <TouchableOpacity>
        <Image
          style={{
            width: 45,
            height: 45,
            marginRight: 10,
            borderRadius: 30,
          }}
          source={{uri: 'https://avatars.githubusercontent.com/u/63912301?v=4'}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    padding: 20,
    margin: 10,
    borderWidth: 1,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: Colors.Primary1,
    paddingVertical: 10,
    height: 60,
  },
});

export default Header;
