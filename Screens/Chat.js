import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, KeyboardAvoidingView, Dimensions, ScrollView, LogBox } from 'react-native'
import { Button, TextInput } from 'react-native-paper';

import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get("window")

function Chat({route}) {
    const {key} = route.params;

    const [msg, setMsg] = useState("");
    const [currUser, setcurrUser] = useState("");
    const [msgArr, setMsgArr] = useState([]);
    const [msgOrder, setMsgOrder] = useState(["GroupChat", "User1", "User2", "User3"]);

    const CustomHeader = () => {
        return (
          <View style={styles.header}>
            <Text style={styles.headerText}>{key}</Text>
          </View>
        );
      };

      const sendMsg = async() => {
        const user = await AsyncStorage.getItem("token");
        console.log(msg);
        console.log("Rani-", ...msgArr);

         //setting the order
     const newArrayWithoutOrder = msgOrder.filter(existingItem => existingItem !== key);
     console.log("Altered Array: ", newArrayWithoutOrder);
      setMsgOrder([key, ...newArrayWithoutOrder]);
          if(key == "GroupChat"){
         database()
  .ref("GroupChat/messages")
  .update({
    msgArr
  })
  .then(() => {setMsg("");});
     }
     else{
         database()
         .ref(user+"/"+"MessageSent"+"/"+key)
         .update({
          sent: msgArr
       })
        .then(() => {setMsg("");});
     }

    // Add the item to the beginning of the array
      }

      const fetchUser = async()=> {
        console.log(msgOrder);
        const set = await AsyncStorage.setItem("order", JSON.stringify(msgOrder))
        console.log("Order of message", set);
        const user = await AsyncStorage.getItem("token");
        console.log("Current User: "+ user);
        setcurrUser(user);
           //Receiving Own Messages
         console.log(user+ "/"+ key);

     if(key == "GroupChat"){
          database()
  .ref("GroupChat/messages/msgArr")
  .on('value', snapshot => {
    console.log('User data: ', snapshot.val());
    if(snapshot.val()){
      setMsgArr(...msgArr, snapshot.val());
    }
    else{
   console.log("No Group Messages Yet");
    }
  });
     }

     else{
 database()
  .ref(user+"/"+"MessageSent"+"/"+key)
  .on('value', snapshot => {
    if(snapshot.val()){
      console.log('User data: ', snapshot.val());
      console.log(snapshot.val()?.sent);
      setMsgArr(...msgArr, snapshot.val()?.sent);
    }
    else{
      console.log("Self");
    }
  });
  //Receiving Others Messages
   database()
  .ref(key+"/"+"MessageSent"+"/"+user)
  .on('value', snapshot => {
    if(snapshot.exists()){
  console.log('User data: ', snapshot.val());
    console.log(snapshot.val().sent);
    setMsgArr(...msgArr, snapshot.val().sent);
    }
    else{
      console.log("NO MSG FROM OTHERS");
    }
  });
     }
   }

      useEffect(()=>{
        fetchUser();
      },[currUser])

    return (
        <View>
           <ScrollView>
          <CustomHeader />
            <KeyboardAvoidingView>
          {msgArr.map((item, index) => (
        <View key={index} style={styles.sentMsg}>
          <Text style={{fontSize:20, color:"black", padding:10}}>{`${item}`}</Text>
        </View>
      ))}
           <TextInput
            style={styles.input}
            value={msg}
            placeholder='message...'
            mode='outlined'
            multiline={true}
            numberOfLines={2}
            onChangeText={text =>{  
               setMsg(text)
              }}
             />
            <Button style={styles.btn} mode="contained" onPress={() =>{
              setMsgArr([...msgArr, msg]);
              sendMsg()
              }}>Send</Button>
          </KeyboardAvoidingView>
        </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
      backgroundColor: 'black',
      padding: 10,
      alignItems: 'center',
    },
    headerText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    input: {
       width: width-50,
       marginVertical: 20,
       marginLeft: 25
    },
    btn: {
        width: 100,
    },
  });

export default Chat
