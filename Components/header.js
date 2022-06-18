import React from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/Colors';
import LightTheme from '../DesignSystem/LightTheme';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PakMedicLogo from '../assets/Icons/PakMedicLogo';
import Icon from 'react-native-vector-icons/FontAwesome';

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
      <Icon name="user" size={30} color={Colors.MonochromeBlue900} style={{marginRight:10}}/>
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
  header: {
    backgroundColor: Colors.Primary1,
    paddingVertical: 10,
    height: 60,
  },
});

export default Header;
