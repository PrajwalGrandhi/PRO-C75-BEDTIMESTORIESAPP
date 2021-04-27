import React from 'react';
import { StyleSheet, Text, View, Image,TextInput,TouchableOpacity,Alert,ToastAndroid } from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import db from '../config';
import firebase from 'firebase';


export default class LoginScreen extends React.Component{
  constructor(){
    super();
    this.state={
      emailid:'',
      pass:'',

    }
  }

login=async(email,pass)=>{
      if(email && pass){
           try{
      const data = await  firebase.auth().signInWithEmailAndPassword(email,pass);

        if(data){
           this.props.navigation.navigate('Write');
        } 
     }catch(error){
       if(error.code=='auth/user-not-found'){
        Alert.alert( "use doesnt exist", "My Alert Msg", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
       }
       else if(error.code=='auth/invalid-email'){

        Alert.alert( "email id invalid", "eamilid envalid", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
       }
     }
   }
   else{
     Alert.alert( "Please wnter your email id and password", "My Alert Msg", [ { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" }, { text: "OK", onPress: () => console.log("OK Pressed") } ] );
   }
}

  render(){
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>LibManager</Text>

        <TextInput
          //style={styles.inputBox}
           placeholder="email ID"
           keyboardType="email-address"
           onChangeText={(text)=>{this.setState({emailid:text})}}/>

           <TextInput
          //style={styles.inputBox}
           placeholder="password"
           secureTextEntry={true}
           onChangeText={(text)=>{this.setState({pass:text})}}/>

        <TouchableOpacity
          //style={styles.scanButton}
          onPress={()=>{
           this.login(this.state.emailid,this.state.pass)
          }}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}