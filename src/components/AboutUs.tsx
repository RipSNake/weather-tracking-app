import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Loader from './Loader';
import mockedMembers from './../mockUps/members';

interface Member {
  name: string,
  information: string
}

export default function AboutUs() {
  const [members, setMembers] = useState(mockedMembers);

  const fetchMembers = () => {
    // simulation of members been fetching
    setMembers(mockedMembers)
  }

  useEffect(() => {
    //effect
    fetchMembers()
  }, [members])

  return (
    <ScrollView style={{paddingHorizontal: 15, paddingVertical: 5}}>
      
      { members.length > 0 ?
        members.map((member: Member) => (
          <View key={member.name} style={styles.memberCard}>
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberInfo}>{member.information}</Text>
          </View>
          ))
          : <Loader/>
      }
    </ScrollView>
  )
    
}

const styles = StyleSheet.create({
		headerTitle: {
				fontSize: 20,
				backgroundColor: "#ad9963"
		},
		memberName: {
      fontWeight: 'bold',
      color: 'orange',
      marginBottom: 5
		},
		memberInfo: {
      backgroundColor: '#72edf8',
      borderRadius: 10,
      padding: 10,
		},
    memberCard: {
      marginVertical: 15,
    }
})
