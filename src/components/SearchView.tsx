import React, { useEffect, useState } from 'react'
import { View, Text,  StyleSheet, ScrollView,FlatList, TouchableWithoutFeedback, Keyboard,TouchableHighlight} from 'react-native'
import{TextInput, Button, Card} from 'react-native-paper'
import{baseURL,apiKey} from '../API/client'

export default function SearchView() {
    const apiKeyBis = '8a660995fc9545cd9d9223825210511';
    const [ciudad, setCiudad] = useState('');
    const [searchCity, setSearchCity] = useState([]);

  useEffect(() => {
    // fetch cities from the open weather api
    
    return () => {
    // async fn
    }
  }, [])

  const getLista = (text) => {
    
        setCiudad(text)
        fetch(`${baseURL}/search.json?key=8a660995fc9545cd9d9223825210511&q=${text}`)
        .then(item =>item.json())
        .then(datos =>{
            console.log(datos)
            setSearchCity(datos);
        })
    
  }
  const ocultarTeclado=() =>{
      Keyboard.dismiss();
  }
   
  
  return (
     
        
            <View style={styles.app}>
                <Text style={styles.searchLabel}>Write the city's name</Text>
                <TextInput
                    style={styles.searchInput}
                    label="Nombre de la ciudad"
                    value={ciudad}
                    onChangeText={(text)=> getLista(text)}

                />
                <Button
                icon="content-save"
                mode="contained"
                theme={{colors:{primary:"#00aaff"}}}
                onPress={()=>console.log("Pressed")}
                > No tocar
                </Button>
            
                <FlatList
                data={searchCity}
                keyExtractor={item=>item.id}
                renderItem={({item})=>{
                    return(
                        <>
                            <Card
                            style={{margin:2, padding:12}}
                            onPress={()=>setCiudad(item.name)}>
                                <Text>{item.name}</Text>
                            </Card>
                            
                        </>
                    )
                    
                }}
                >

                </FlatList>
           
    </View>
  
  )
}

const styles = StyleSheet.create({
    searchLabel: {
        fontWeight: "600",
    },
    searchInput: {
        backgroundColor: "#888888",
        maxHeight:70,
        paddingHorizontal: 5,
    },
    app:{
        flex:1,
        backgroundColor: 'rgb(71,149,212)',
        justifyContent:'center'
        
    }
});