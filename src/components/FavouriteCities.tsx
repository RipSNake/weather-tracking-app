import React, { useEffect, useState } from 'react'
import { Button, Text, TextInput, View, ScrollView, StyleSheet, FlatList, ListRenderItem, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import CustomModal from './CustomModal';

interface City {
	name: string,
	temperature: number,
}

interface Props {
  navigation: any;
  cities: City[],
  storage: any
}

export default function FavouriteCities(props: Props) {
	const [cities, setCities] = useState();
  const [nameFilter, setNameFilter] = useState('');
  const [modal, setModal]:any = useState(null);

  const favCities = useSelector(state => state.cities.data)

  const removeCity = (text: string) => {
    setModal(
      <CustomModal
        title={'Remove city'} 
        message={text}
        isVisible={true}
        acceptText={'Delete'}
        cancelText={'Cancel'}
        acceptFn={() => {setCities(cities.filter((city:City) => city.name.substring(0,text.length) != text)); setModal(null)}}
        cancelFn={() => setModal(null)}
      />)
    return modal;
  }
  
  const filterList = () => {
    if(nameFilter.length > 0){
      filtered = cities.filter((city:City) => (city.name.toLowerCase().substring(0, nameFilter.length) == nameFilter.toLowerCase()));
    } else { filtered = cities }
    return filtered;
  }

  let filtered:City[] = filterList();
  // first render
  useEffect(() => {
    console.log('First render');
    setCities(favCities);
  }, []);

  useEffect(() => {
    filterList();
  }, [cities, nameFilter])

	return (
			<>
      <View style={{paddingHorizontal: 15, paddingVertical: 5}}>
        <TextInput
            autoCompleteType={'name'}
            style={styles.filter}
            onChangeText={(text) => console.log('changed input value' + text)}
            placeholder="City name"
          />
      </View>
      <ScrollView
        style={{paddingHorizontal: 15, paddingVertical: 5}}
      >
        
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => (index.toString())}
          data={filtered}
         
          renderItem={({item}):JSX.Element => {return(
            <View key={item.name} style={styles.cityRow}>
              <Text
                onPress={() => props.navigation.navigate("cityDetail",{city: item.name, isFavourite: true})}
              >{item.name}</Text>
              <Text>{item.temperature}</Text>
              <Button 
                onPress={() => {
                  removeCity(item.name)
                }}
                title={"Forget"}
              />
            </View>)}}
        />
        {modal}
			</ScrollView>
    <TouchableOpacity 
    style={styles.addBtn}
    onPress={() => props.navigation.navigate('addCity')}
    >
      <Icon type="material-community" name="plus-circle-outline" color="" />
    </TouchableOpacity>
    </>
	)
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    backgroundColor: "#ad9963"
  },
  addBtn: {
    backgroundColor: 'gold',
    borderRadius: 50,
    margin: 10,
    padding: 15,
    position: "absolute",
    bottom: 0, 
    right: 10,
    zIndex: 10000
  },
  filter: {
    backgroundColor: "#d6d6d6",
    marginVertical: 5,
    paddingHorizontal: 3,
    paddingVertical: 10,
  },
  cityRow: {
    borderColor: 'blue',
    borderWidth: 2,
    marginVertical: 5,
    padding: 10
  }
})