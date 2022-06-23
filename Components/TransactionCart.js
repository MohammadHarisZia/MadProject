import React, {useState, useEffect} from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/Colors';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import Transactions from '../assets/Icons/Transactions.svg';

const TransactionCart = props => {
  return (
    <View
      style={[
        styles.flex,
        {
          backgroundColor: Colors.MonochromeBlue100,
          borderColor: Colors.MonochromeBlue500,
          borderWidth: 1,
          borderRadius: 20,
          width: 350,
          height: 90,
          alignItems: 'center',
          marginLeft: 20,
          marginTop: 10,
        },
      ]}>
      <Image
        style={{
          width: 60,
          height: 60,
          borderRadius: 20,
        }}
        source={{
          uri: props.img,
        }}
      />
      <View style={{marginLeft: 10}}>
        <Text
          style={[
            Typography.Header_14pt,
            {color: Colors.MonochromeGreen1000, width: 110},
          ]}>
          {props.name}
        </Text>

        <Text
          style={[Typography.Text_14pt, {color: Colors.MonochromeGreen1000}]}>
          {props.date}
        </Text>
      </View>

      <View style={[styles.flex, {marginRight: 40}]}>
        <Transactions
          width={20}
          height={20}
          fill={Colors.MonochromeBlue500}
          style={{marginRight: -10}}></Transactions>
        <Text
          style={[
            Typography.Header_14pt,
            {color: Colors.MonochromeGreen1000, marginLeft: 20},
          ]}>
          {props.amount}
        </Text>
      </View>
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

export default TransactionCart;
