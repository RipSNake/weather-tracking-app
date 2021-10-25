import React, { ReactComponentElement, useEffect, useState } from 'react'
import { Button, Text, TextInput, View, StyleSheet, FlatList, ListRenderItem, TouchableOpacity } from 'react-native'
import mockedCities from '../mockUps/favouriteCities';
import CustomModal from './CustomModal';

interface City {
	name: string,
	temperature: number,
}

interface Props {
  cities: City[],
}

export default function FavoriteCities(props: Props) {
	const [cities, setCities] = useState(props.cities);
  const [nameFilter, setNameFilter] = useState('');
  const [modal, setModal]:any = useState(null);

  const removeCity = (text: string) => {
    setModal(
      <CustomModal
        title={'Remove city'} 
        message={text}
        isVisible={true}
        acceptText={'Delete'}
        cancelText={'Cancel'}
        acceptFn={() => setCities(cities.filter((city:City) => city.name.substring(0,text.length) != text))}
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
    setCities(mockedCities);
  }, [cities]);

  useEffect(() => {
    filterList();
  }, [cities, nameFilter])

	return (
			<View>
					<Text style={styles.headerTitle}> Favourite Cities </Text>

          <TouchableOpacity 
            style={styles.addBtn}
            onPress={() => alert('Add City functionality comming soon...')}
          >
            <Text>ADD CITY</Text>
          </TouchableOpacity>
          
          <Text>FlatList</Text>
          <FlatList  
            data={filtered}
            renderItem={({item}):JSX.Element => {return(
              <View key={item.name} style={styles.cityRow}>
                <Text>{item.name}</Text>
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
			</View>
	)
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    backgroundColor: "#ad9963"
  },
  addBtn: {
    backgroundColor: 'gold',
    borderRadius: 10,
    marginVertical: 10,
    padding: 20
  },
  filter: {
    backgroundColor: "565656",
    paddingHorizontal: 5,
  },
  cityRow: {
    borderColor: 'blue',
    borderWidth: 2,
    marginVertical: 5
  }
})