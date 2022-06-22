import React, {useState, useEffect} from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/Colors';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import Heading from '../Components/Heading';

const ViewComplaint = props => {
  const {ticketID} = props.route?.params || {};
  const {complainee} = props.route?.params || {};

  const [data, setData] = useState('');

  useEffect(() => {
    getComplaineeData();
  }, []);

  const getComplaineeData = async () => {
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/MohammadHarisZia/MadProject/main/complainees.json',
      );
      const json = await response.json();

      Object.values(json.complainees).forEach(value => {
        if (value.name == complainee) {
          setData(value);
          return;
        }
        console.log(data);
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View>
      <Heading
        title={`Ticket # ${ticketID}`}
        navigation={props.navigation}
        navigate="ComplaintDesk"></Heading>
      <Text style={{color: 'black'}}>{data.name}</Text>
      <Text style={{color: 'black'}}>{data.img}</Text>
      <Text style={{color: 'black'}}>{data.PhoneNo}</Text>
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

export default ViewComplaint;
