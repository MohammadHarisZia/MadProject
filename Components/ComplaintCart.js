import React, {useState, useEffect} from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/Colors';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';

import {} from 'react-native-paper';

import Modal from 'react-native-modal';

import Options from '../assets/Icons/Options';
import Circle from '../assets/Icons/Circle';

const complaintCart = (props, {navigation, route}) => {
  const status = props.status;
  let height = 200;

  const [visible, setVisible] = useState(false);
  const [complaintModal, setComplaintModal] = useState(false);

  if (status === 'Reviewed') {
    height = 150;
  }

  return (
    <View>
      <TouchableOpacity View style={styles.container}>
        <TouchableOpacity>
          <Options
            width={50}
            height={50}
            fill={Colors.MonochromeBlue1000}
            style={{alignSelf: 'flex-end', marginTop: -20}}
            onPress={() => setVisible(true)}></Options>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={[styles.flex, {width: 180}]}>
            <Text
              style={[
                styles.text,
                Typography.Header_14pt,
                {margin: 5, marginTop: -20, width: 180},
              ]}>
              {props.complaint}
            </Text>
            <Text
              style={[
                Typography.Text_12pt,
                {color: Colors.MonochromeBlue1000, margin: 5},
              ]}>
              Ticket# {props.ticketID}
            </Text>
          </View>
          {props.status === 'On Hold' && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: -5,
              }}>
              <Circle
                width={10}
                height={10}
                fill={Colors.Ascent1}
                style={{marginRight: -10}}></Circle>
              <Text style={[styles.text, Typography.Header_14pt]}>
                {props.status}
              </Text>
            </View>
          )}

          {props.status === 'Reviewed' && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: -5,
              }}>
              <Circle
                width={10}
                height={10}
                fill={Colors.Primary1}
                style={{marginRight: -10}}></Circle>
              <Text style={[styles.text, Typography.Header_14pt]}>
                {props.status}
              </Text>
            </View>
          )}

          {props.status === 'In Progress' && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 15,
              }}>
              <Circle
                width={10}
                height={10}
                fill={'#fcc419'}
                style={{marginRight: -10}}></Circle>
              <Text style={[styles.text, Typography.Header_14pt]}>
                {props.status}
              </Text>
            </View>
          )}
          <Modal
            isVisible={visible}
            onBackdropPress={() => {
              setVisible(false);
            }}
            style={{margin: 0, justifyContent: 'flex-end'}}>
            <View
              style={{
                height: height,
                backgroundColor: 'white',
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
              }}>
              <TouchableOpacity>
                <Text
                  style={[
                    Typography.Header_20pt,
                    styles.text,
                    {textAlign: 'center'},
                  ]}>
                  View
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={[
                    Typography.Header_20pt,
                    styles.text,
                    {textAlign: 'center'},
                  ]}>
                  Edit
                </Text>
              </TouchableOpacity>
              {status !== 'Reviewed' && (
                <TouchableOpacity>
                  <Text
                    style={[
                      Typography.Header_20pt,
                      styles.text,
                      {textAlign: 'center'},
                    ]}>
                    Delete
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </Modal>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container: {
    backgroundColor: Colors.MonochromeGreen300,
    borderRadius: 5,
    width: 330,
    marginTop: 20,
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  text: {
    color: Colors.MonochromeBlue1000,
    margin: 20,
  },
});

export default complaintCart;
