import React,{useEffect,useState} from 'react';
import typo from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/AppColors';

import {View, Text, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';

import Slideshow from 'react-native-slideshow';

import Header from '../Components/Header';

const HomeScreen = ({navigation}) => {
  const [json, setJson] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getImages = async () => {
    try {
     const response = await fetch('https://raw.githubusercontent.com/Plasteredpeak/Porfolio/main/medical.json')
     const json = await response.json();
     setJson(json.Pictures)
   } catch (error) {
     console.error(error);
   } finally {
      setIsLoading(false);
    }
 }
  const dataSource=[
    { url:json[Math.floor(Math.random()*json.length)] },
    { url:json[Math.floor(Math.random()*json.length)]  },
    { url:json[Math.floor(Math.random()*json.length)]  }
]
useEffect(() => {
  getImages();
}, []);

if( isLoading ) {
  return(
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator size="large"/>
    </View>
  );
}
  return (
    <>
    <Header navigation={navigation}/>
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={[typo.Header_24pt,styles.header]}>Hello,Doctor</Text>
      </View>
      <View style={styles.slideshowContainer}>
      <Slideshow 
      dataSource={dataSource}/>
      </View>
    </View>
    </>
    )
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    zIndex:-10,
    height:"93%",
    backgroundColor: "#F2F3F4",
  },
  headerContainer: {
    margin:20,
    width: "100%",
  },
  header: {
    color: Colors.MonochromeBlue900,
    marginBottom: 10,
  },
  slideshowContainer: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 20,
  },

});

export default HomeScreen;
