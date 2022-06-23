import React, {useState, useEffect} from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/Colors';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import Heading from '../Components/Heading';
import Circle from '../assets/Icons/Circle';

const ViewComplaint = props => {
  const {ticketID, subject, status, complaint, complainee} =
    props.route?.params || {};

  const [data, setData] = useState('');

  let color = '';

  if (status === 'Reviewed') color = Colors.Primary1;
  if (status === 'In Progress') color = '#fcc419';
  if (status === 'On Hold') color = Colors.Ascent1;

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

      <View style={styles.flex}>
        <Text
          style={[
            Typography.Header_16pt,
            {color: 'black', marginTop: 20, marginLeft: 20},
          ]}>
          Subject
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}>
          <Circle
            width={10}
            height={10}
            fill={color}
            style={{marginRight: -10}}></Circle>
          <Text
            style={[
              Typography.Header_14pt,
              {color: Colors.MonochromeBlue1000, margin: 20},
            ]}>
            {status}
          </Text>
        </View>
      </View>

      <Text style={[Typography.Text_14pt, styles.text, {marginTop: 5}]}>
        {subject}
      </Text>

      <Text
        style={[
          Typography.Header_16pt,
          {color: 'black', marginTop: 20, marginLeft: 20},
        ]}>
        Complaint
      </Text>

      <Text style={[Typography.Text_14pt, styles.text]}>{complaint}</Text>

      <Text
        style={[
          Typography.Header_16pt,
          {color: 'black', marginTop: 20, marginLeft: 20},
        ]}>
        Complainee
      </Text>

      <TouchableOpacity
        style={[
          styles.flex,
          {
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Colors.Primary1,
            margin: 20,
            padding: 10,
            backgroundColor: Colors.MonochromeGreen100,
            height: 130,
          },
        ]}>
        <Image
          style={{width: 80, height: 80, borderRadius: 20, marginTop: 10}}
          source={{
            uri: data.img,
          }}
        />

        <View style={{margin: 10, marginRight: 40, marginTop: 15}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <Text
              style={[
                Typography.Header_14pt,
                {color: Colors.MonochromeBlue1000, marginRight: 10},
              ]}>
              Name:
            </Text>
            <Text
              style={[
                Typography.Text_14pt,
                {color: Colors.MonochromeBlue1000},
              ]}>
              {data.name}
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={[
                Typography.Header_14pt,
                {color: Colors.MonochromeBlue1000, marginRight: 10},
              ]}>
              Phone No:
            </Text>
            <Text
              style={[
                Typography.Text_14pt,
                {color: Colors.MonochromeBlue1000},
              ]}>
              {data.PhoneNo}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            color: Colors.MonochromeBlue1000,
            backgroundColor: Colors.Ascent3,
            borderRadius: 20,
            width: 150,
            height: 35,
            justifyContent: 'center',
            marginBottom: 10,
            marginRight: 20,
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}>
          <Text
            style={[
              {color: Colors.MonochromeBlue1000, textAlign: 'center'},
              Typography.Header_14pt,
            ]}>
            View Profile
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: Colors.MonochromeBlue1000,
    marginHorizontal: 20,
    marginVertical: 20,
  },
});

export default ViewComplaint;
