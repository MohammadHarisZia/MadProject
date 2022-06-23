import React, {useState, useEffect} from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/Colors';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import Heading from '../Components/Heading';

import DropDown from '../assets/Icons/DropDown.svg';
import SearchIcon from '../assets/Icons/Search.svg';

import {Picker} from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';

const ComplaintDeskBar = props => {
  const [search, setSearch] = useState('');
  const [sortValue, setSortValue] = useState('All');
  let sortArray = ['On Hold', 'Reviewed', 'In Progress'];
  let complaint = [];

  const searchbyName = async () => {
    complaint = [];
    await firestore()
      .collection('complaints')
      .where('complainee', '==', search)

      .get()
      .then(querySnapshot => {
        if (querySnapshot.size != 0) {
          querySnapshot.forEach(documentSnapshot => {
            complaint.push({
              key: documentSnapshot.id,
              value: documentSnapshot.data(),
            });
          });
          props.setComplaintArray(complaint);
          props.setSearchDB(true);
          props.setUpdateDB(true);
        } else alert('not found');
      });
  };

  const filterByStatus = async value => {
    complaint = [];
    if (value == 'All') {
      await firestore()
        .collection('complaints')
        .orderBy('ticketID', 'asc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            complaint.push({
              key: documentSnapshot.id,
              value: documentSnapshot.data(),
            });
          });
          props.setComplaintArray(complaint);
          props.setFilterDB(true);
          props.setUpdateDB(true);
        });
    } else {
      await firestore()
        .collection('complaints')
        .where('status', '==', value)
        .orderBy('ticketID', 'asc')
        .get()
        .then(querySnapshot => {
          if (querySnapshot.size != 0) {
            querySnapshot.forEach(documentSnapshot => {
              complaint.push({
                key: documentSnapshot.id,
                value: documentSnapshot.data(),
              });
            });
            props.setComplaintArray(complaint);
            props.setFilterDB(true);
            props.setUpdateDB(true);
          }
        });
    }
  };

  return (
    <View style={[styles.bar, styles.flex]}>
      <View
        style={[
          {
            backgroundColor: Colors.MonochromeBlue300,
            width: 170,
            height: 40,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: Colors.MonochromeBlue500,
            justifyContent: 'center',
          },
        ]}>
        <Picker
          mode={'dropdown'}
          selectedValue={sortValue}
          dropdownIconColor={Colors.MonochromeBlue1000}
          color={Colors.MonochromeBlue1000}
          style={{
            color: 'black',
          }}
          onValueChange={itemValue => {
            setSortValue(itemValue);
            filterByStatus(itemValue);
          }}>
          <Picker.Item value={'All'} label={'All'} key={0} />
          {sortArray.map(item => {
            return <Picker.Item value={item} label={item} key={item} />;
          })}
        </Picker>
      </View>

      <View
        style={[
          styles.flex,
          {
            backgroundColor: Colors.MonochromeBlue300,
            width: 170,
            height: 40,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: Colors.MonochromeBlue500,
          },
        ]}>
        <TextInput
          style={[
            Typography.Text_14pt,
            {color: Colors.MonochromeBlue1000, marginLeft: 10, width: 130},
          ]}
          value={search}
          onChangeText={setSearch}
          placeholder="Search By Name"
          placeholderTextColor={Colors.MonochromeBlue1000}
          onSubmitEditing={() => {
            searchbyName();
            setSearch('');
          }}></TextInput>
        <SearchIcon
          width={15}
          height={15}
          fill={Colors.MonochromeBlue1000}
          style={{marginRight: 15}}></SearchIcon>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    borderWidth: 1,
    borderColor: Colors.MonochromeBlue500,
  },
  bar: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    width: '100%',
    backgroundColor: Colors.MonochromeGreen200,
  },
});

export default ComplaintDeskBar;
