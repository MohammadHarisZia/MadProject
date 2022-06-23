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

import firestore from '@react-native-firebase/firestore';

const ComplaintDesk = props => {
  let complainees = [];
  let complaints = [];
  const [searchDB, setSearchDB] = useState(false);
  const [updateDB, setUpdateDB] = useState(true);
  const [filterDB, setFilterDB] = useState(false);
  const [selectedValue, setSelectedValue] = useState('java');
  const [complaint, setComplaint] = useState('');
  const [subject, setSubject] = useState('');
  const [key, setKey] = useState('');
  const [status, setStatus] = useState('');
  const [noOfComplaints, setNoOfComplaints] = useState(0);
  const [complaintArray, setComplaintArray] = useState([]);
  const [array, setArray] = useState([]);
  const [complaintModal, setComplaintModal] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
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
          setStatus('');
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
              {
                paddingHorizontal: 20,
                paddingVertical: 15,
                height: 50,
                textAlignVertical: 'top',
              },
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
              {
                height: 150,
                padding: 20,
                textAlignVertical: 'top',
              },
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
                setStatus('');
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
        status={item.value.status}
        subject={item.value.subject}
        complainee={item.value.complainee}
        delKey={item.key}
        modalmethod={setComplaintModal}
        isEditable={setIsEditable}
        setComplaint={setComplaint}
        setComplainee={setSelectedValue}
        setSubject={setSubject}
        setKey={setKey}
        setStatus={setStatus}
        setTicketID={setTicketID}
        navigation={props.navigation}
        route={props.route}
        setUpdateDB={setUpdateDB}
        setSearchDB={setSearchDB}></ComplaintCart>
    );
  };

  const getComplainees = async () => {
    complainees = [];
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/MohammadHarisZia/MadProject/main/complainees.json',
      );
      const json = await response.json();

      Object.values(json.complainees).forEach(value => {
        complainees.push(value.name);
      });

      setArray(complainees);
    } catch (error) {
      console.error(error);
    }
  };

  const getComplaints = async () => {
    complaints = [];
    await firestore()
      .collection('complaints')
      .orderBy('ticketID', 'asc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          complaints.push({
            key: documentSnapshot.id,
            value: documentSnapshot.data(),
          });
        });
        setComplaintArray(complaints);
        setNoOfComplaints(querySnapshot.size + 1);
      });
  };

  const addNewComplaint = async () => {
    const status = ['In Progress', 'On Hold', 'Reviewed'];
    const random = Math.floor(Math.random() * 10 + 1) % status.length;
    await firestore()
      .collection('complaints')
      .add({
        subject: subject,
        complaint: complaint,
        complainee: selectedValue,
        status: status[random],
        ticketID: noOfComplaints,
      })
      .then(() => {
        console.log('User Inserted!');
      });
    setNoOfComplaints(noOfComplaints + 1);
    setUpdateDB(true);
  };

  const updateComplaint = async () => {
    await firestore()
      .collection('complaints')
      .doc(key)
      .update({
        subject: subject,
        complaint: complaint,
        complainee: selectedValue,
        status: status,
        ticketID: ticketID,
      })
      .then(() => {
        console.log('User Updated!');
        setUpdateDB(true);
        setIsEditable(false);
      });
  };

  useEffect(() => {
    if (searchDB == false && updateDB == true && filterDB == false) {
      getComplainees();
      getComplaints();
      setUpdateDB(false);
    } else if (searchDB == true && updateDB == true && filterDB == false) {
      setSearchDB(false);
      setUpdateDB(false);
    } else if (searchDB == false && updateDB == true && filterDB == true) {
      setFilterDB(false);
      setUpdateDB(false);
    }
  }, [updateDB]);

  return (
    <View style={styles.container}>
      <Heading
        title="Complaint Desk"
        navigation={props.navigation}
        navigate="TextColors2"
        route={props.route}></Heading>
      <ComplaintDeskBar
        setComplaintArray={setComplaintArray}
        setSearchDB={setSearchDB}
        setUpdateDB={setUpdateDB}
        setFilterDB={setFilterDB}></ComplaintDeskBar>
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
