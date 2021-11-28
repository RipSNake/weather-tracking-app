import React from "react";
import { NavigationContainer, ParamListBase, RouteProp } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from 'react-native-elements';

// Components for navigation
import HomeStack from "../navigations/HomeStack";
import AboutUsStack from "../navigations/AboutUsStack";
import FavouriteCitiesStack from "../navigations/FavouriteCitiesStack";
import SearchCityStack from "../navigations/SearchCityStack";
import { ColorValue, StyleSheet } from "react-native";


const Tab = createBottomTabNavigator();

export default function Navigation({storage}) {
  console.log("Navigation Storage ", storage);
  return(
    <NavigationContainer>
      <Tab.Navigator 
        storage={storage}
        initialRouteName={"homeStack"}
        screenOptions={({route}) => ({
          tabBarStyle: {marginBottom: 10},
          tabBarIcon: ({ color }) => (screenOptions(route, color)),
          tabBarLabelPosition: "below-icon",
          tabBarActiveTintColor: "#00a688",
          tabBarInactiveTintColor: "#646464",
          header:() => (null)
        })}
      >
        <Tab.Screen name="homeStack" component={HomeStack} options={{title: "Home"}} storage={storage}/>
        <Tab.Screen name="searchStack" component={SearchCityStack} options={{title: "Search City"}} storage={storage}/>
        <Tab.Screen name="top-citiesStack" component={FavouriteCitiesStack} options={{title: "Top 5"}} storage={storage}/>
        <Tab.Screen name="aboutUsStack" component={AboutUsStack} options={{title: "About us"}} storage={storage}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

function screenOptions(route: RouteProp<ParamListBase, string>, color: number | ColorValue | undefined) {
  let iconName;

  switch (route.name) {
    case "homeStack":
      iconName = "home-outline"
      break;
    case "top-citiesStack":
      iconName = "heart-outline"
      break;
    case "searchStack":
      iconName = "magnify"
      break;
    case "aboutUsStack":
      iconName = "star-outline"
      break;
    case "account":
      iconName = "home-outline"
      break;
    default:
      iconName = ""
      break;
  }
  
  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  )
}