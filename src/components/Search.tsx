import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, _Image} from 'react-native'
import{TextInput, Button, Card} from 'react-native-paper'
import{baseURL,apiKey} from '../API/client'
import InfoModal from './infoModal'

export default function Search(props) {
    const apiKeyBis = '8a660995fc9545cd9d9223825210511';
    const [ciudad, setCiudad] = useState('');
    const [infoCity, setInfoCity]= useState({icono: "", temperatura: Number, sensacion: Number, humedad: Number, viento: Number });
    const [searchCity, setSearchCity] = useState([]);
    const [modal, setModal]:any = useState(null);

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
            setSearchCity(datos);
        })
  }
  const getInfoCity = (city: string)=>{
    console.log("getInfo")
    fetch(`${baseURL}/current.json?key=8a660995fc9545cd9d9223825210511&q=${city}`)
        .then(item =>item.json())
        .then(datos =>{
            setCiudad(city);
            const {condition, feelslike_c, humidity, temp_c, wind_kph, location} = datos.current;
            const {icon} = condition;
            setInfoCity({icono:`https:${icon}`, temperatura: temp_c, sensacion: feelslike_c, humedad: humidity, viento: wind_kph });
            console.log("temperatura", infoCity.icono)
        })
  }

  const displayModal= ()=>{
    console.log("ver modal")
    setModal(
      <InfoModal
        title={ciudad} 
        message={infoCity}
        isVisible={true}
        acceptText={'Delete'}
        cancelText={'Cancel'}
        cancelFn={() => setModal(null)}
      />)
      return modal;
  }
  
  return (
            <View style={styles.app}>
                
                <TextInput
                    style={styles.searchInput}
                    label="City's Name"
                    value={ciudad}
                    onChangeText={(text)=> getLista(text)}

                />
                <Button
                  icon="content-save"
                  mode="contained"
                  theme={{colors:{primary:"#72edf8"}}}
                  onPress={()=> {if(ciudad.length > 10) props.navigation.navigate('cityDetail', {city: ciudad, isFavourite: false})}}
                  > Search
                </Button>

                <FlatList
                horizontal={false} 
                data={searchCity}
                keyExtractor={item=>item.id}
                renderItem={({item})=>{
                    return(
                        <>
                            <Card
                            style={{margin:2, padding:12}}
                            onPress={()=>getInfoCity(item.name)}>
                                <Text>{item.name}</Text>
                            </Card>
                            
                        </>
                    )
                    
                }}
                >

                </FlatList>
                {modal}
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
        backgroundColor: '#f2f2f2',
        justifyContent:'center'
        
    },
    image: {
      marginTop: 150,
      marginBottom: 10,
      width: 50,
      height: 50,
    },
    text: {
      fontSize: 24,
      marginBottom: 30,
      padding: 40,
    }
});