/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useState} from 'react';
import { Button, TextInput } from 'react-native-paper';

import {
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import database from '@react-native-firebase/database';

const Login = (props) => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const setToken = async()=> {
    await AsyncStorage.setItem("token", username);
    props.navigation.replace("Home")
  }

   sendCred = (props) =>{
    console.log("Btn Pressed");
    database()
  .ref(username+"/")
  .on('value', snapshot => {
    console.log('User data: ', snapshot.val());
    if(snapshot.exists()){
        if(password == snapshot.val().password){
            //Login Successfull
            console.log("User Logged In");
             setToken();
        }
        else{
            console.log("Incorrect Password");
        }
    }
    else{
        console.log("Username Doesn't Exists");
    }
  });
  }

  return (
   <>
    <KeyboardAvoidingView behavior='position'>
      <StatusBar
        animated={true}
        backgroundColor="#191970"
        barStyle="light-content"
        showHideTransition="fade"
      />
   <Text
   style={{fontSize:45,color:"#190660",textAlign:'center',fontFamily:"cursive",fontWeight:'bold',marginTop:35}}>Login
   </Text>
   <View
     style={{
      borderBottomColor:"#191970",
      borderBottomWidth:4,
      borderRadius:10,
      marginLeft:65,
      marginRight:65,
      marginTop:5
     }}
   />
   <Text
   style={{
    fontSize:20,marginLeft:18,marginTop:20
   }}>Login with username</Text>
    <TextInput
      label="Username"
      value={username}
      style={{
        marginTop:20,
        marginLeft:18,
        marginRight:18
      }}
      mode='outlined'
      theme={{colors:{primary:"#191970"}}}
      onChangeText={(text)=>setUsername(text)}
    />
      <TextInput
      label="Password"
      value={password}
      secureTextEntry={true}
      style={{
        marginTop:20,
        marginLeft:18,
        marginRight:18
      }}
      mode='outlined'
      theme={{colors:{primary:"#191970"}}}
      onChangeText={(text)=>setPassword(text)}
    />
    <Button style={{
        marginTop:20,
        marginLeft:18,
        marginRight:18
      }} mode="contained"  theme={{colors:{primary:"#191970"}}} onPress={() => sendCred(props)}>
    Login
  </Button> 
   </KeyboardAvoidingView>
   </>
  );
}

export default Login;
