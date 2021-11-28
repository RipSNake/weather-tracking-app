import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { baseURL } from '../API/client';

export default function City(props) {
  const [city, setCity] = useState(props.route.city);
  const [infoCity, setInfoCity]= useState({icono: "", temperatura: Number, sensacion: Number, humedad: Number, viento: Number });

  const getInfoCity = (city: string)=>{
    console.log("getInfo")
    fetch(`${baseURL}/current.json?key=8a660995fc9545cd9d9223825210511&q=${city}`)
        .then(item =>item.json())
        .then(datos =>{
            console.log('Fetch Data ' + datos);
            //const {condition, feelslike_c, humidity, temp_c, wind_kph, location} = datos.current;
            //const {icon} = condition;
            //setInfoCity({icono:`https:${icon}`, temperatura: temp_c, sensacion: feelslike_c, humedad: humidity, viento: wind_kph });
            console.log("temperatura", infoCity.icono)
        })
  }

  useEffect(() => {
    console.log('PROPS: ' + props);
    console.log('City : ' + city);
    getInfoCity(city);
    return () => {
      //cleanup
    }
  }, [city])

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{city}</Text>
        <Text style={styles.modalText}>{}</Text>
        <Text style={styles.modalText}>{infoCity.temperatura}</Text>
        <Text style={styles.modalText}>{infoCity.sensacion}</Text>
        <Text style={styles.modalText}>{infoCity.humedad}</Text>
        <Text style={styles.modalText}>{infoCity.viento}</Text>
        {/* <Image source={{uri:''}} style={styles.tinyLogo} /> */}
        <Pressable
          style={[styles.cancelBtn, styles.buttonClose]}
          onPress={() => console.log("DELETE")}
        >
          <Text style={styles.btnText}>DELETE</Text>
        </Pressable>
      </View>
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
    width: 50,
    height: 50,
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
