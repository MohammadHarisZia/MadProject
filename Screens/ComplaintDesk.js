import React, {useState, useEffect, useRef} from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/Colors';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Touchable,
} from 'react-native';
import Modal from 'react-native-modal';
import {Picker} from '@react-native-picker/picker';

import Heading from '../Components/Heading';
import ComplaintDeskBar from '../Components/ComplaintDeskBar';
import AddMoreBtn from '../Components/AddMoreBtn';

import DropDown from '../assets/Icons/DropDown.svg';
import SearchIcon from '../assets/Icons/Search.svg';

import ComplaintCart from '../Components/ComplaintCart';

const ComplaintDesk = (props, {navigation, route}) => {
  const [complaintModal, setComplaintModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState('java');
  const [complaint, setComplaint] = useState('');

  return (
    <View style={styles.container}>
      <Heading></Heading>
      <ComplaintDeskBar></ComplaintDeskBar>
      <AddMoreBtn
        click={() => {
          setComplaintModal(true);
        }}></AddMoreBtn>
      <ComplaintCart
        ticketID={10}
        complaint="I lost my dog and i hate it here"
        status="On Hold"></ComplaintCart>
      <ComplaintCart
        ticketID={10}
        complaint="I lost my dog and i hate it here"
        status="Reviewed"></ComplaintCart>
      <ComplaintCart
        ticketID={10}
        complaint="I lost my dog and i hate it here"
        status="In Progress"></ComplaintCart>
      <Modal
        isVisible={complaintModal}
        onBackdropPress={() => {
          setComplaintModal(false);
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            height: 500,
          }}>
          <Text
            style={[
              Typography.Header_24pt,
              {color: 'black', textAlign: 'center', marginTop: 20},
            ]}>
            Create Ticket
          </Text>
          <Text
            style={[
              Typography.Header_16pt,
              {color: 'black', marginTop: 20, marginLeft: 20},
            ]}>
            Subject
          </Text>

          <View style={styles.text}>
            <Picker
              selectedValue={selectedValue}
              dropdownIconColor={Colors.MonochromeBlue1000}
              color={Colors.MonochromeBlue1000}
              style={{
                color: 'black',
              }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>

          <Text
            style={[
              Typography.Header_16pt,
              {color: 'black', marginTop: 20, marginLeft: 20},
            ]}>
            Complaint
          </Text>
          <TextInput
            style={[
              styles.text,
              {height: 150, padding: 25, textAlignVertical: 'top'},
            ]}
            multiline={true}
            numberOfLines={4}
            value={complaint}
            onChangeText={setComplaint}
          />
          <Text
            style={[
              Typography.Header_16pt,
              {color: 'black', marginTop: 20, marginLeft: 20},
            ]}>
            Complainee
          </Text>
          <View style={styles.text}>
            <Picker
              selectedValue={selectedValue}
              dropdownIconColor={Colors.MonochromeBlue1000}
              color={Colors.MonochromeBlue1000}
              style={{
                color: 'black',
              }}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    color: Colors.MonochromeBlue1000,
    marginRight: 90,
    marginBottom: 6,
  },
  touch: {
    backgroundColor: Colors.MonochromeBlue300,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  bar: {
    marginLeft: 10,
    width: 340,
  },
  text: {
    marginVertical: 10,
    marginHorizontal: 20,
    width: 300,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.MonochromeGreen500,
    backgroundColor: 'white',
    color: Colors.MonochromeBlue1000,
  },
});

export default ComplaintDesk;
