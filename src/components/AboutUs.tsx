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
    <View style={{paddingHorizontal: 15, paddingVertical: 5}}>
      
      <Text style={styles.memberName}>{members[1].name}</Text>
            <Text style={styles.memberInfo}>{members[1].information}</Text>
      { members.length > 0 ?
        members.map((member: Member) => (
          <View key={member.name}>
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberInfo}>{member.information}</Text>
          </View>
          ))
          : <Loader/>
      }
    </View>
  )
    
}

const styles = StyleSheet.create({
		headerTitle: {
				fontSize: 20,
				backgroundColor: "#ad9963"
		},
		memberName: {
      fontWeight: 'bold',
      color: 'orange'
		},
		memberInfo: {
      backgroundColor: '#aaa',
      borderRadius: 10,
		}
})
