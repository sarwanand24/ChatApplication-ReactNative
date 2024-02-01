/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useEffect} from 'react';

import {
    StyleSheet,
    View,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Loading = (props) => {

   const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if(token){
        props.navigation.replace("Home")
      }
      else{
        props.navigation.replace("Login")
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
     fetchData();
  },[])

  return (
   <View style={styles.loading}>
    <ActivityIndicator size="large" color="#191970"></ActivityIndicator>
   </View>
  );
}

const styles = StyleSheet.create({
    loading:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
    }
    });

export default Loading;
