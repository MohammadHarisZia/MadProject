import React, {useState, useEffect} from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/Colors';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Heading from '../Components/Heading';

import Options from '../assets/Icons/Options';

import Modal from 'react-native-modal';

import BottomModalOptions from '../Components/BottomModalOptions';

import MobileChip from '../assets/Icons/MobileChip';

import firestore from '@react-native-firebase/firestore';

const WalletManagement = props => {
  const [account, setAccount] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [visible, setVisible] = useState(false);
  const [addCard, setAddCard] = useState(false);
  const [addAccount, setAddAccount] = useState(false);
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [cardNo, setCardNo] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [easyPaisa, setEasyPaisa] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [updateDB, setUpdateDB] = useState(false);

  useEffect(() => {
    getEasyPaisa();
    getCreditCard();
    setUpdateDB(false);
  }, [updateDB]);

  const getCreditCard = async () => {
    setCreditCard('');
    await firestore()
      .collection('creditCard')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          setCreditCard(documentSnapshot.data());
        });
      });
  };

  const getEasyPaisa = async () => {
    setEasyPaisa('');
    await firestore()
      .collection('easypaisa')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          setEasyPaisa(documentSnapshot.data());
        });
      });
  };

  const deleteCreditCard = async () => {
    await firestore()
      .collection('creditCard')
      .doc('1234')
      .delete()
      .then(() => {
        console.log('Card deleted!');
        setUpdateDB(true);
      });
  };

  const deleteEasyPaisa = async () => {
    await firestore()
      .collection('easypaisa')
      .doc('1234')
      .delete()
      .then(() => {
        console.log('Easy Paisa deleted!');
        setUpdateDB(true);
      });
  };

  const addCreditCard = async () => {
    await firestore()
      .collection('creditCard')
      .doc('1234')
      .set({
        name: name,
        cardNo: cardNo,
        expDate: expDate,
        cvv: cvv,
      })
      .then(() => {
        console.log('Credit Card Added Successfully');
        setUpdateDB(true);
      });
  };

  const addEasyPaisa = async () => {
    await firestore()
      .collection('easypaisa')
      .doc('1234')
      .set({
        name: name,
        phoneNo: phoneNo,
      })
      .then(() => {
        console.log('Credit Card Added Successfully');
        setUpdateDB(true);
      });
  };

  const updateCreditCard = async () => {
    await firestore()
      .collection('creditCard')
      .doc('1234')
      .update({
        name: name,
        cardNo: cardNo,
        expDate: expDate,
        cvv: cvv,
      })
      .then(() => {
        console.log('User Updated!');
        console.log('Credit Card Updated Successfully');
        setUpdateDB(true);
        setIsEditable(false);
      });
  };

  const updateEasyPaisa = async () => {
    await firestore()
      .collection('easypaisa')
      .doc('1234')
      .update({
        name: name,
        phoneNo: phoneNo,
      })
      .then(() => {
        console.log('User Updated!');
        console.log('Credit Card Updated Successfully');
        setUpdateDB(true);
        setIsEditable(false);
      });
  };

  const addCardModal = () => {
    return (
      <Modal
        isVisible={addCard}
        onBackdropPress={() => {
          setAddCard(false);
          setName('');
          setCvv('');
          setCardNo('');
          setExpDate('');
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
              {
                color: 'black',
                textAlign: 'center',
                marginTop: 20,
                marginLeft: 20,
                marginBottom: 30,
              },
            ]}>
            Card Management
          </Text>

          <Text
            style={[
              Typography.Header_16pt,
              {color: 'black', marginTop: 20, marginLeft: 20},
            ]}>
            Name on Card
          </Text>
          <TextInput
            placeholder="Enter Name"
            placeholderTextColor="black"
            style={[
              styles.text,
              {
                marginTop: 10,
                paddingHorizontal: 20,
                paddingVertical: 15,
                height: 50,
                textAlignVertical: 'top',
              },
            ]}
            value={name}
            onChangeText={setName}
          />

          <Text
            style={[
              Typography.Header_16pt,
              {color: 'black', marginTop: 20, marginLeft: 20},
            ]}>
            Card Number
          </Text>

          <TextInput
            placeholder="Enter Card Number"
            placeholderTextColor="black"
            maxLength={16}
            style={[
              styles.text,
              {
                paddingHorizontal: 20,
                paddingVertical: 15,
                height: 50,
                textAlignVertical: 'top',
              },
            ]}
            value={cardNo}
            onChangeText={setCardNo}
            keyboardType="numeric"
          />

          <View style={[styles.flex, {width: 260}]}>
            <Text
              style={[
                Typography.Header_16pt,
                {color: 'black', marginTop: 20, marginLeft: 20},
              ]}>
              Expiry Date
            </Text>
            <Text
              style={[
                Typography.Header_16pt,
                {color: 'black', marginTop: 20, marginLeft: 20},
              ]}>
              CVV
            </Text>
          </View>

          <View style={[styles.flex]}>
            <TextInput
              placeholder="Enter Expiry Date"
              placeholderTextColor="black"
              style={[
                styles.text,
                {
                  width: 160,
                  paddingHorizontal: 20,
                  paddingVertical: 15,
                  height: 50,
                  textAlignVertical: 'top',
                },
              ]}
              value={expDate}
              onChangeText={setExpDate}
            />

            <TextInput
              maxLength={3}
              placeholder="Enter CVV"
              placeholderTextColor="black"
              style={[
                styles.text,
                {
                  width: 110,
                  paddingHorizontal: 20,
                  paddingVertical: 15,
                  height: 50,
                  textAlignVertical: 'top',
                },
              ]}
              value={cvv}
              onChangeText={setCvv}
              keyboardType="numeric"
            />
          </View>

          <View
            style={[styles.flex, {width: 270, marginLeft: 40, marginTop: 30}]}>
            <TouchableOpacity
              onPress={() => {
                setAddCard(false);
                setName('');
                setCvv('');
                setCardNo('');
                setExpDate('');
              }}>
              <Text
                style={[
                  {
                    color: Colors.MonochromeBlue1000,
                    width: 130,
                    padding: 10,
                    borderRadius: 20,
                    textAlign: 'center',
                  },
                  Typography.Header_14pt,
                ]}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (
                  !isEditable &&
                  name != '' &&
                  cvv != '' &&
                  cardNo != '' &&
                  expDate != ''
                ) {
                  addCreditCard();
                  setName('');
                  setCvv('');
                  setCardNo('');
                  setExpDate('');
                  setAddCard(false);
                } else if (
                  isEditable &&
                  name != '' &&
                  cvv != '' &&
                  cardNo != '' &&
                  expDate != ''
                ) {
                  updateCreditCard();
                  setName('');
                  setCvv('');
                  setCardNo('');
                  setExpDate('');
                  setAddCard(false);
                } else alert('Fields Cant be empty');
              }}>
              <Text
                style={[
                  {
                    color: Colors.MonochromeBlue1000,
                    backgroundColor: Colors.Primary3,
                    width: 130,
                    padding: 10,
                    borderRadius: 20,
                    textAlign: 'center',
                  },
                  Typography.Header_14pt,
                ]}>
                {(!isEditable && 'Submit') || (isEditable && 'Update')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const addAccountModal = () => {
    return (
      <Modal
        isVisible={addAccount}
        onBackdropPress={() => {
          setAddAccount(false);
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            height: 400,
          }}>
          <Text
            style={[
              Typography.Header_24pt,
              {
                color: 'black',
                textAlign: 'center',
                marginTop: 20,
                marginLeft: 20,
                marginBottom: 30,
              },
            ]}>
            Account Management
          </Text>

          <Text
            style={[
              Typography.Header_16pt,
              {color: 'black', marginTop: 20, marginLeft: 20},
            ]}>
            Name on EasyPaisa
          </Text>
          <TextInput
            placeholder="Enter Name"
            placeholderTextColor="black"
            style={[
              styles.text,
              {
                marginTop: 10,
                paddingHorizontal: 20,
                paddingVertical: 15,
                height: 50,
                textAlignVertical: 'top',
              },
            ]}
            value={name}
            onChangeText={setName}
          />

          <Text
            style={[
              Typography.Header_16pt,
              {color: 'black', marginTop: 20, marginLeft: 20},
            ]}>
            Phone Number
          </Text>

          <TextInput
            placeholder="Enter Phone Number"
            placeholderTextColor="black"
            maxLength={11}
            style={[
              styles.text,
              {
                paddingHorizontal: 20,
                paddingVertical: 15,
                height: 50,
                textAlignVertical: 'top',
              },
            ]}
            value={phoneNo}
            onChangeText={setPhoneNo}
            keyboardType="numeric"
          />

          <View
            style={[styles.flex, {width: 270, marginLeft: 40, marginTop: 30}]}>
            <TouchableOpacity
              onPress={() => {
                setAddAccount(false);
                setName('');
                setPhoneNo('');
              }}>
              <Text
                style={[
                  {
                    color: Colors.MonochromeBlue1000,
                    width: 130,
                    padding: 10,
                    borderRadius: 20,
                    textAlign: 'center',
                  },
                  Typography.Header_14pt,
                ]}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (!isEditable && name != '' && phoneNo != '') {
                  addEasyPaisa();
                  setName('');
                  setPhoneNo('');
                  setAddAccount(false);
                } else if (isEditable && name != '' && phoneNo != '') {
                  updateEasyPaisa();
                  setName('');
                  setPhoneNo('');
                  setAddAccount(false);
                } else alert('Fields Cant be empty');
              }}>
              <Text
                style={[
                  {
                    color: Colors.MonochromeBlue1000,
                    backgroundColor: Colors.Primary3,
                    width: 130,
                    padding: 10,
                    borderRadius: 20,
                    textAlign: 'center',
                  },
                  Typography.Header_14pt,
                ]}>
                {(!isEditable && 'Submit') || (isEditable && 'Update')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const creditCardComp = () => {
    return (
      <View>
        <View style={styles.container}>
          <View
            style={[
              styles.flex,
              {
                width: 330,
                marginTop: 40,
                marginLeft: 30,
                backgroundColor: Colors.MonochromeBlue100,
                padding: 10,
                borderRadius: 50,
              },
            ]}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.MonochromeBlue300,
                width: 150,
                height: 45,
                padding: 10,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: Colors.MonochromeBlue700,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setAccount(false);
              }}>
              <Text
                style={[
                  Typography.Header_18pt,
                  {color: Colors.MonochromeBlue1000},
                ]}>
                Cards
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: 150,
                height: 45,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setAccount(true);
              }}>
              <Text
                style={[
                  Typography.Header_18pt,
                  {color: Colors.MonochromeBlue1000},
                ]}>
                Accounts
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              {
                borderWidth: 1,
                borderRadius: 20,
                marginTop: 30,
                width: 350,
                height: 200,
                marginLeft: 20,
                backgroundColor: 'white',
              },
            ]}>
            <TouchableOpacity>
              <Options
                width={60}
                height={60}
                fill={Colors.MonochromeBlue1000}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  marginRight: -5,
                  transform: [{rotate: '90deg'}],
                }}
                onPress={() => {
                  setVisible(true);
                }}></Options>
            </TouchableOpacity>
            <View
              style={[
                styles.flex,
                {
                  marginTop: 45,
                  marginHorizontal: 30,
                  width: 280,
                  alignItems: 'center',
                },
              ]}>
              <Text
                style={[
                  Typography.Header_18pt,
                  {color: Colors.MonochromeBlue1000},
                ]}>
                Debit Card
              </Text>

              <Text
                style={[
                  Typography.Header_14pt,
                  {color: Colors.MonochromeBlue1000},
                ]}>
                Visa
              </Text>
            </View>
            <MobileChip
              width={25}
              height={25}
              style={{marginLeft: 30, marginTop: 10}}></MobileChip>

            <View
              style={[
                styles.flex,
                {marginHorizontal: 30, marginTop: 15, width: 290},
              ]}>
              <Text
                style={[
                  Typography.Header_18pt,
                  {color: Colors.MonochromeBlue1000},
                ]}>
                ****
              </Text>
              <Text
                style={[
                  Typography.Header_18pt,
                  {color: Colors.MonochromeBlue1000},
                ]}>
                ****
              </Text>
              <Text
                style={[
                  Typography.Header_18pt,
                  {color: Colors.MonochromeBlue1000},
                ]}>
                ****
              </Text>
              <Text
                style={[
                  Typography.Header_18pt,
                  {color: Colors.MonochromeBlue1000},
                ]}>
                {(creditCard != '' && creditCard.cardNo.slice(-4)) ||
                  (creditCard == '' && '####')}
              </Text>
            </View>

            <View
              style={[styles.flex, {width: 290, marginTop: 5, marginLeft: 30}]}>
              <Text
                style={[
                  Typography.Text_14pt,
                  {color: Colors.MonochromeBlue1000, fontWeight: 'bold'},
                ]}>
                {(creditCard != '' && creditCard.name) ||
                  (creditCard == '' && 'Default Name')}
              </Text>

              <Text
                style={[
                  Typography.Text_14pt,
                  {color: Colors.MonochromeBlue1000, fontWeight: 'bold'},
                ]}>
                {(creditCard != '' && creditCard.expDate) ||
                  (creditCard == '' && 'Exp Date')}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              if (creditCard != '') {
                alert('Currently we only support one Credit Card');
              } else {
                setAddCard(true);
              }
            }}>
            <Text
              style={[
                Typography.Header_18pt,
                {
                  color: Colors.MonochromeBlue1000,
                  marginLeft: 30,
                  marginTop: 30,
                },
              ]}>
              Add A Debit Card
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              color: Colors.MonochromeBlue1000,
              width: 300,
              marginLeft: 30,
              marginTop: 15,
            }}>
            This card must be connected to a bank account to your name
          </Text>
        </View>
        <Modal
          isVisible={visible}
          onBackdropPress={() => {
            setVisible(false);
          }}
          style={{margin: 0, justifyContent: 'flex-end'}}>
          <View
            style={{
              height: 150,
              backgroundColor: 'white',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}>
            <BottomModalOptions
              title="Edit"
              onPress={() => {
                if (creditCard == '') {
                  alert('No Card Found');
                  setVisible(false);
                } else {
                  setIsEditable(true);
                  setVisible(false);
                  setAddCard(true);
                  setName(creditCard.name);
                  setExpDate(creditCard.expDate);
                  setCardNo(creditCard.cardNo);
                  setCvv(creditCard.cvv);
                }
              }}
            />
            <BottomModalOptions
              title="Delete"
              onPress={() => {
                if (creditCard == '') {
                  alert('No Card Found');
                  setVisible(false);
                } else {
                  deleteCreditCard();
                  setVisible(false);
                }
              }}
            />
          </View>
        </Modal>
      </View>
    );
  };

  const accountCardComp = () => {
    return (
      <View>
        <View style={styles.container}>
          <View
            style={[
              styles.flex,
              {
                width: 330,
                marginTop: 40,
                marginLeft: 30,
                backgroundColor: Colors.MonochromeBlue100,
                padding: 10,
                borderRadius: 50,
              },
            ]}>
            <TouchableOpacity
              style={{
                width: 150,
                height: 45,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setAccount(false);
              }}>
              <Text
                style={[
                  Typography.Header_18pt,
                  {color: Colors.MonochromeBlue1000},
                ]}>
                Cards
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: Colors.MonochromeBlue300,
                width: 150,
                height: 45,
                padding: 10,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: Colors.MonochromeBlue700,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  Typography.Header_18pt,
                  {color: Colors.MonochromeBlue1000},
                ]}>
                Accounts
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              {
                borderWidth: 1,
                borderRadius: 20,
                marginTop: 30,
                width: 350,
                height: 200,
                marginLeft: 20,
                backgroundColor: 'white',
              },
            ]}>
            <TouchableOpacity>
              <Options
                width={60}
                height={60}
                fill={Colors.MonochromeBlue1000}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  marginRight: -5,
                  transform: [{rotate: '90deg'}],
                }}
                onPress={() => {
                  setVisible(true);
                }}></Options>
            </TouchableOpacity>
            <View
              style={[
                styles.flex,
                {
                  marginTop: 45,
                  marginHorizontal: 30,
                  width: 280,
                  alignItems: 'center',
                },
              ]}>
              <Text
                style={[
                  Typography.Header_18pt,
                  {color: Colors.MonochromeBlue1000},
                ]}>
                Account
              </Text>

              <Text
                style={[
                  Typography.Header_14pt,
                  {color: Colors.MonochromeBlue1000},
                ]}>
                EasyPaisa
              </Text>
            </View>

            <Text
              style={[
                Typography.Header_18pt,
                {
                  color: Colors.MonochromeBlue1000,
                  marginLeft: 30,
                  marginTop: 20,
                },
              ]}>
              Phone No
            </Text>

            <View
              style={[
                styles.flex,
                {marginHorizontal: 30, marginTop: 10, width: 180},
              ]}>
              <Text
                style={[
                  Typography.Header_16pt,
                  {color: Colors.MonochromeBlue1000},
                ]}>
                +92
              </Text>
              <Text
                style={[
                  Typography.Header_16pt,
                  {color: Colors.MonochromeBlue1000},
                ]}>
                -
              </Text>
              <Text
                style={[
                  Typography.Header_16pt,
                  {color: Colors.MonochromeBlue1000},
                ]}>
                {(easyPaisa != '' && easyPaisa.phoneNo.slice(1)) ||
                  (easyPaisa == '' && '##########')}
              </Text>
            </View>

            <View
              style={[styles.flex, {width: 290, marginTop: 5, marginLeft: 30}]}>
              <Text
                style={[
                  Typography.Text_14pt,
                  {color: Colors.MonochromeBlue1000, fontWeight: 'bold'},
                ]}>
                {(easyPaisa != '' && easyPaisa.name) ||
                  (easyPaisa == '' && 'Default Name')}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              if (creditCard != '') {
                alert('Currently we only support one Credit Card');
              } else {
                setAddAccount(true);
              }
            }}>
            <Text
              style={[
                Typography.Header_18pt,
                {
                  color: Colors.MonochromeBlue1000,
                  marginLeft: 30,
                  marginTop: 30,
                },
              ]}>
              Add An EasyPaisa Account
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              color: Colors.MonochromeBlue1000,
              width: 300,
              marginLeft: 30,
              marginTop: 15,
            }}>
            This card must be connected to an EasyPaisa Vendor
          </Text>
        </View>
        <Modal
          isVisible={visible}
          onBackdropPress={() => {
            setVisible(false);
          }}
          style={{margin: 0, justifyContent: 'flex-end'}}>
          <View
            style={{
              height: 150,
              backgroundColor: 'white',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}>
            <BottomModalOptions
              title="Edit"
              onPress={() => {
                if (easyPaisa == '') {
                  alert('No Card Found');
                  setVisible(false);
                } else {
                  setIsEditable(true);
                  setVisible(false);
                  setAddAccount(true);
                  setName(easyPaisa.name);
                  setPhoneNo(easyPaisa.phoneNo);
                }
              }}
            />
            <BottomModalOptions
              title="Delete"
              onPress={() => {
                if (easyPaisa == '') {
                  alert('No Card Found');
                  setVisible(false);
                } else {
                  deleteEasyPaisa();
                  setVisible(false);
                }
              }}
            />
          </View>
        </Modal>
      </View>
    );
  };

  return (
    <View>
      <Heading
        title="Connect Wallet"
        navigation={props.navigation}
        navigate="Finance"
        route={props.route}></Heading>

      {(!account && creditCardComp()) || (account && accountCardComp())}

      {addCardModal()}
      {addAccountModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    backgroundColor: Colors.MonochromeGreen200,
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    marginVertical: 5,
    marginHorizontal: 20,
    width: 320,
    height: 40,
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colors.MonochromeGreen500,
    backgroundColor: 'white',
    color: Colors.MonochromeBlue1000,
  },
});

export default WalletManagement;
