import React from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/AppColors';
import {BackHandler,View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import PakMedicLogo from '../assets/Icons/PakMedicLogo';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '../firebase'

import { AuthContext } from './context';

import { DefaultTheme, Menu, Divider, Provider } from 'react-native-paper';

const Header = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const { signOut } = React.useContext(AuthContext);


  return (
    <Provider theme={DefaultTheme}>
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
      <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Icon name="user" size={30} color={Colors.MonochromeBlue900} style={{marginRight:10}} onPress={openMenu}/>}>
          <Menu.Item onPress={() => {}} title="Profile" />
          <Divider />
          <Menu.Item onPress={() => {auth.signOut(); signOut()}} title="Logout" />
          <Divider />
          <Menu.Item onPress={() => {BackHandler.exitApp()}} title="Exit" />
        </Menu>
      
      </TouchableOpacity>
    </View>
    </Provider>
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
