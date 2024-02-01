import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native"

import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Home(props) {

    const [userList, setUserList] = useState([]);

    const renderUser = async() => {
        const user = await AsyncStorage.getItem("token");
        console.log("Current User: "+ user);
       // delete userList[user];
        console.log(userList);
        console.log(Object.keys(userList).length);
    }

    const Chat = (key) => {
     console.log("Key Val:", key);
     props.navigation.push("Chat",{key})
    }

    useEffect(() => {
        database()
        .ref()
        .on('value', snapshot => {
         // console.log('Users List: ', snapshot.val());
           setUserList(snapshot.val());
        });
        renderUser();
      }, []);
    
    return (
        <ScrollView style={{backgroundColor:"black"}}>
            { Object.entries(userList).map(([key, value]) => (
        <TouchableOpacity key={key} onPress={()=> Chat(key)}>
        <View key={key} style={styles.user}>
          <Text style={{fontSize:20, color:"black"}}>{`${key}`}</Text>
        </View>
        </TouchableOpacity>
      )) }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    user: {
      backgroundColor: "lightgrey",
      marginVertical: 5,
      padding: 20,
    }
  });

export default Home
