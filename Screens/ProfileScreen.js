import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Header from "../Components/Header"
import Icon from "react-native-vector-icons/Ionicons"
import { Colors } from "../DesignSystem/AppColors"


const ProfileScreen = ({ navigation }) => {
    return (
        <>
        <Header/>
        <View style={styles.container}>

        <View style={styles.back}>
            <Icon name="arrow-back" size={30} color={Colors.MonochromeBlue900}
            onPress={()=>{navigation.goBack()}}/>
        </View>

        <View style={styles.profile}>
            <Text style={{color:"black"}}>ProfileScreen</Text>
        </View>

        </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        zIndex:-10,
        height:"93%",
    },
    back: {
        margin:10
    },
    profile:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    }
})
export default ProfileScreen