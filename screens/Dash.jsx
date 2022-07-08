import { StyleSheet, Text, View ,StatusBar} from 'react-native'
import React from 'react';
import { useAuth } from "../components/GlobalContext";
import { FlatList } from 'react-native-gesture-handler';

const Dash = ({navigation}) => {
  const { userData, handleLogout} = useAuth();
  const logout =() =>{
    handleLogout();
    navigation.navigate('Login');
  }
const data =[
  {id:1,name:'John',age:20,surname:'Doe',email:'doe@gmail.com',phone:'078078912'},
  {id:2,name:'Jane',age:21,surname:'Doe',email:'doe@gmail.com',phone:'078078912'},
  {id:3,name:'Jack',age:22,surname:'Doe',email:'doe@gmail.com',phone:'078078912'},
  {id:4,name:'Jill',age:23,surname:'Doe',email:'doe@gmail.com',phone:'078078912'},
  {id:5,name:'Joe',age:24,surname:'Doe',email:'doe@gmail.com',phone:'078078912'},
]
const renderItem = ({item}) =>{
  return(
    <View style={styles.item}>
      <Text >{item.name}</Text>
      <Text >{item.age}</Text>
      <Text >{item.surname}</Text>
      <Text >{item.email}</Text>
      <Text >{item.phone}</Text>
    </View>
  )
}
  return (
    <View style={styles.container}>
      <Text style={styles.logout} onPress={()=>logout()}>Log out</Text>
      <View style={styles.itemheader}>
      <Text >Name</Text>
      <Text >Age</Text>
      <Text >Surname</Text>
      <Text >Email</Text>
      <Text >Phone</Text>
    </View>
     <FlatList
     data={data}
    renderItem={renderItem}
    keyExtractor={item => item.id.toString()}
     />
    </View>
  )
}

export default Dash

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:StatusBar.currentHeight,
        backgroundColor:'#fff',
        width:"100%",
        overflow:'hidden'
    },
    header:{
        fontSize:25,
        fontWeight:'bold',
    },
    logout:{
        fontSize:10,
        color:'#307A59',
        fontWeight:'normal',
        left:"56%",
        position:'relative',
    },
    username:{
        fontSize:18,
        color:'#FF6F0B',
    },
    item:{
        flexDirection:'row',
        padding:"2%",
        backgroundColor:'#fff',
        boxShadow:'0px 0px 4px #307A59',
        justifyContent:'space-between',
        marginBottom:"5%",
        width:"95%",
        marginLeft:"2.5%",
    },
    itemheader:{
      fontFamily:'Roboto',
      flexDirection:'row',
      justifyContent:'space-between',
      width:'86%',
      padding:"2%",
      backgroundColor:'#fff',
      marginBottom:"3%",
      marginTop:"3%",
    },
})