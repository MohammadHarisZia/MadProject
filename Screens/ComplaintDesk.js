import React, {useState, useEffect, useRef} from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/Colors';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import {Picker} from '@react-native-picker/picker';

import Heading from '../Components/Heading';
import ComplaintDeskBar from '../Components/ComplaintDeskBar';
import AddMoreBtn from '../Components/AddMoreBtn';

import ComplaintCart from '../Components/ComplaintCart';

import {db} from '../Firebase';
import {ref, onValue, push, update, remove, query} from 'firebase/database';

const ComplaintDesk = props => {
  let complainees = [];
  let complaints = [];
  const [noOfComplaints, setNoOfComplaints] = useState(0);
  const [complaintArray, setComplaintArray] = useState([]);
  const [array, setArray] = useState([]);
  const [complaintModal, setComplaintModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState('java');
  const [complaint, setComplaint] = useState('');
  const [subject, setSubject] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [key, setKey] = useState('');
  const [ticketID, setTicketID] = useState('');

  const modal = title => {
    return (
      <Modal
        isVisible={complaintModal}
        onBackdropPress={() => {
          setComplaintModal(false);
          setSubject('');
          setSelectedValue('');
          setComplaint('');
          setIsEditable(false);
          setKey('');
          setTicketID('');
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            height: 570,
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

          <TextInput
            style={[
              styles.text,
              {padding: 15, height: 50, textAlignVertical: 'top'},
            ]}
            value={subject}
            onChangeText={setSubject}
          />

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
          <View style={[styles.text, {height: 50}]}>
            <Picker
              selectedValue={selectedValue}
              dropdownIconColor={Colors.MonochromeBlue1000}
              color={Colors.MonochromeBlue1000}
              style={{
                color: 'black',
              }}
              onValueChange={itemValue => setSelectedValue(itemValue)}>
              <Picker.Item
                value={'Select a Complainee'}
                label={'Select a Complainee'}
                key={0}
              />
              {array.map(item => {
                return <Picker.Item value={item} label={item} key={item} />;
              })}
            </Picker>
          </View>
          <View
            style={{
              marginLeft: 25,
              width: 300,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={{
                marginTop: 10,
                color: Colors.MonochromeBlue1000,
                width: 130,
                padding: 10,
                borderRadius: 20,
              }}
              onPress={() => {
                setComplaintModal(false);
                setSubject('');
                setSelectedValue('');
                setComplaint('');
                setTicketID('');
                setIsEditable(false);
                setTicketID('');
                setKey('');
              }}>
              <Text
                style={[
                  {color: Colors.MonochromeBlue1000, textAlign: 'center'},
                  Typography.Header_14pt,
                ]}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                marginTop: 10,
                color: Colors.MonochromeBlue1000,
                backgroundColor: Colors.Primary3,
                width: 130,
                padding: 10,
                borderRadius: 20,
              }}
              onPress={() => {
                if (
                  subject === '' ||
                  complaint === '' ||
                  selectedValue === '' ||
                  selectedValue === 'Select a Complainee'
                )
                  alert('Fields must not be empty, Insertion Failed');
                else if (!isEditable) {
                  addNewComplaint();
                  setComplaintModal(false);
                  setSubject('');
                  setSelectedValue('');
                  setComplaint('');
                  setKey('');
                  setTicketID('');
                } else if (isEditable) {
                  updateComplaint();
                  setComplaintModal(false);
                  setSubject('');
                  setSelectedValue('');
                  setComplaint('');
                  setKey('');
                  setTicketID('');
                }
              }}>
              <Text
                style={[
                  {color: Colors.MonochromeBlue1000, textAlign: 'center'},
                  Typography.Header_14pt,
                ]}>
                {title}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const renderItem = ({item}) => {
    return (
      <ComplaintCart
        ticketID={item.value.ticketID}
        complaint={item.value.complaint}
        status={item.value.Status}
        subject={item.value.subject}
        complainee={item.value.complainee}
        delKey={item.key}
        modalmethod={setComplaintModal}
        isEditable={setIsEditable}
        setComplaint={setComplaint}
        setComplainee={setSelectedValue}
        setSubject={setSubject}
        setKey={setKey}
        setTicketID={setTicketID}
        navigation={props.navigation}
        route={props.route}></ComplaintCart>
    );
  };

  function addNewComplaint() {
    push(ref(db, '/complaints'), {
      subject: subject,
      complaint: complaint,
      complainee: selectedValue,
      Status: 'In Progress',
      ticketID: noOfComplaints,
    });
    setNoOfComplaints(noOfComplaints + 1);
    console.log('inserted');
  }

  const updateComplaint = () => {
    console.log(key);
    update(ref(db, `/complaints/`), {
      [key]: {
        subject: subject,
        complaint: complaint,
        complainee: selectedValue,
        Status: 'In Progress',
        ticketID: ticketID,
      },
    });
    setIsEditable(false);
  };

  useEffect(() => {
    onValue(ref(db, '/complainees'), querySnapShot => {
      let data = querySnapShot.val() || {};
      Object.values(data).forEach(value => {
        complainees.push(value.name);
      });
      setArray(complainees);
    });

    onValue(ref(db, '/complaints'), querySnapShot => {
      complaints = [];
      let data = querySnapShot.val() || {};
      for (var key in data) {
        complaints.push({key: key, value: data[key]});
      }
      setComplaintArray(complaints);
      setNoOfComplaints(Object.values(data).length + 1);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Heading
        title="Complaint Desk"
        navigation={props.navigation}
        navigate="TextColors2"
        route={props.route}></Heading>
      <ComplaintDeskBar></ComplaintDeskBar>
      {array.length !== 0 && (
        <AddMoreBtn
          click={() => {
            setComplaintModal(true);
          }}></AddMoreBtn>
      )}
      {complaintArray.length !== 0 && (
        <FlatList
          style={{height: 450}}
          data={complaintArray}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />
      )}
      {(!isEditable && modal((title = 'Submit'))) ||
        (isEditable && modal((title = 'Update')))}
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
    height: 40,
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.MonochromeGreen500,
    backgroundColor: 'white',
    color: Colors.MonochromeBlue1000,
  },
});

export default ComplaintDesk;
