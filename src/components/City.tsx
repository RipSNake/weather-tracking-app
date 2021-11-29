import * as React from 'react';
import { Pressable, Route, StyleSheet, Text, View, Image, Dimensions, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import { baseURL } from '../API/client';
import { mdiThermometer, mdiSunThermometerOutline, mdiWaterPercent, mdiWeatherWindy, mdiSafetyGoggles } from '@mdi/js'; 
import Icon  from '@mdi/react';
import { useState, useEffect } from 'react';
import storage from '../storage/storage';
import { useDispatch } from 'react-redux';
import { addCity, removeCity } from '../../store/slices/citiesSlice';

interface Props {
  navigation: Navigator;
  route: Route;
  isFavourite: Boolean;
}

interface State {
  city: string,
  infoCity: CityLocation,
  isFavourite: Boolean
}

interface CityLocation {
  name: string,
  region: string,
  country: string,
  lat: number,
  lon: number,
  tz_id: string,
  localtime_epoch: number,
  localtime: string //"2021-11-28 23:42"
}

export default function City(props: Props) {
  const [city, setCity] = useState(props.route.params.city);
  const [infoCity, setInfoCity]= useState({icono: "", temperatura: 0, sensacion: 0, humedad: 0, viento: 0, cityLocation: {} });
  const [isFavourite, setIsFavourite] = useState(props.route.params.isFavourite);
  const dispatch = useDispatch();

  const getInfoCity = (city: string)=>{
    fetch(`${baseURL}/current.json?key=8a660995fc9545cd9d9223825210511&q=${city}`)
        .then(item =>item.json())
        .then(datos =>{
            const { condition, feelslike_c, humidity, temp_c, wind_kph } = datos.current;
            const { location } = datos;
            const { icon } = condition;
            setInfoCity({icono:`https:${icon}`, temperatura: temp_c, sensacion: feelslike_c, humedad: humidity, viento: wind_kph, cityLocation: location });
            console.log('Location ' + location.lat + " long " + location.lon)
        })
  }

  useEffect(() => {
    getInfoCity(city);
    return () => {
      //cleanup
    }
  }, [city])

  return (
    <ScrollView contentContainerStyle={styles.centeredView}>
        
        <Text style={styles.cityName}>{infoCity.cityLocation.name}</Text>

        <Text style={styles.cityLocation}>{infoCity.cityLocation.region}, {infoCity.cityLocation.country}</Text>
        
        <View style={{flexDirection: 'row', marginHorizontal: "auto", width: "80%", marginBottom: 15, borderColor: "red"}}>

        <View style={styles.currentClimate}>
          <Image source={{uri: infoCity.icono}} width={100} style={styles.tinyLogo} />
        </View>
        <View style={styles.statsWrapper}>
        <View style={styles.statsPair}>
          <Text style={styles.statTile}>
            <Icon path={mdiThermometer} size={1} color={'orange'} /> 
            {infoCity.temperatura}
          </Text>
          <Text style={styles.statTile}>
            <Icon path={mdiSunThermometerOutline} size={1} color={'orange'} />
            {infoCity.sensacion}
          </Text>
        </View>
        <View style={styles.statsPair}>
          <Text style={styles.statTile}>
            <Icon path={mdiWaterPercent} size={1} color={'orange'} />
            {infoCity.humedad}
          </Text>
          <Text style={styles.statTile}>
            <Icon path={mdiWeatherWindy} size={1} color={'orange'} />
            {infoCity.viento}
          </Text>
        </View>
        </View>
        </View>
        <MapView 
          style={styles.map} 
          showsMyLocationButton={false}
          region={{
            latitude: infoCity.cityLocation.lat, 
            longitude: infoCity.cityLocation.lon,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421}}
        />
        { isFavourite ? (<Pressable
          style={[styles.cancelBtn, styles.buttonClose]}
          onPress={() => dispatch(removeCity(city))}
        >
          <Text style={styles.btnText}>DELETE</Text>
        </Pressable>)
        :
        (<Pressable
          style={[styles.acceptBtn, styles.buttonOpen]}
          onPress={() => dispatch(addCity(city))}
        >
          <Text style={styles.btnText}>ADD</Text>
        </Pressable>)}
   
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    padding: 15
  },
  tinyLogo: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center"
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
    backgroundColor: '72edf8',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "50%",
    margin: "auto"
  },
  cancelBtn: {
    backgroundColor: 'darkgrey',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: "50%",
    margin: "auto"
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
  cityName: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center"
  },
  cityLocation: {
    marginBottom: 15,
    textAlign: "center"
  },
  map: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.8,
    maxHeight: 300,
    marginHorizontal: "auto",
    marginBottom: 15,
    borderColor: "#bebebe",
    flex: 1
  },
  statTile: {
    marginBottom: 15,
    textAlign: "center",
    width: "25%",
  },
  currentClimate: {
    width: "50%",
  },
  statsPair: {
    flexDirection: 'row',
    alignContent: "center",
    justifyContent: "space-evenly"
  },
  statsWrapper: {
    flex: 1
  }
})
