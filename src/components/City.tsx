import React, { useEffect, useState } from 'react';
import { Pressable, Route, StyleSheet, Text, View, Image } from 'react-native';
import { baseURL } from '../API/client';
import { mdiThermometer, mdiSunThermometerOutline, mdiWaterPercent, mdiWeatherWindy } from '@mdi/js'; 
import Icon  from '@mdi/react';

interface Props {
  navigation: Navigator;
  route: Route;
  isFavourite: Boolean;
}

export default function City(props: Props) {
  const [city, setCity] = useState(props.route.params.city);
  const [infoCity, setInfoCity]= useState({icono: "", temperatura: Number, sensacion: Number, humedad: Number, viento: Number, location });
  const [isFavourite, setIsFavourite] = useState(props.route.params.isFavourite);

  const getInfoCity = (city: string)=>{
    console.log("getInfo")
    fetch(`${baseURL}/current.json?key=8a660995fc9545cd9d9223825210511&q=${city}`)
        .then(item =>item.json())
        .then(datos =>{
            console.log('Fetch Data ' + datos);
            const {condition, feelslike_c, humidity, temp_c, wind_kph, location} = datos.current;
            const {icon} = condition;
            setInfoCity({icono:`https:${icon}`, temperatura: temp_c, sensacion: feelslike_c, humedad: humidity, viento: wind_kph, location });
            console.log("temperatura ICONO ", infoCity.icono)
            console.log("LOCAIONT :" + location);
        })
  }

  useEffect(() => {
    getInfoCity(city);
    return () => {
      //cleanup
    }
  }, [city])

  return (
    <View style={styles.centeredView}>
        
        <Text style={styles.modalText}>{city}</Text>
        <Text style={styles.modalText}>{}</Text>
        <Image source={{uri: infoCity.icono}} style={styles.tinyLogo} />
        
        <Text style={styles.modalText}>
          <Icon path={mdiThermometer} size={1} color={'orange'} /> 
          {infoCity.temperatura}
        </Text>
        <Text style={styles.modalText}>
          <Icon path={mdiSunThermometerOutline} size={1} color={'orange'} />
          {infoCity.sensacion}
        </Text>
        <Text style={styles.modalText}>
          <Icon path={mdiWaterPercent} size={1} color={'orange'} />
          {infoCity.humedad}
        </Text>
        <Text style={styles.modalText}>
          <Icon path={mdiWeatherWindy} size={1} color={'orange'} />
          {infoCity.viento}
        </Text>
        <Text style={styles.modalText}>
          Location MAP
        </Text>
        { isFavourite ? (<Pressable
          style={[styles.cancelBtn, styles.buttonClose]}
          onPress={() => console.log("DELETE")}
        >
          <Text style={styles.btnText}>DELETE</Text>
        </Pressable>)
        :
        (<Pressable
          style={[styles.acceptBtn, styles.buttonOpen]}
          onPress={() => console.log("ADD")}
        >
          <Text style={styles.btnText}>ADD</Text>
        </Pressable>)}
   
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  tinyLogo: {
    width: 80,
    height: 80,
    flex: 1,
    alignContent: "center"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  acceptBtn: {
    backgroundColor: 'orange',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  cancelBtn: {
    backgroundColor: 'darkgrey',
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})
