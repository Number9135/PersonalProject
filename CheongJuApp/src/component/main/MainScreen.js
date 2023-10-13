import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InfoCard from '../forms/InfoCard'
import TasteHighlight from '../forms/TasteHighlight'
import TravelHighlight from '../forms/TravelHighlight'

const MainScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <InfoCard/>
      <TasteHighlight/>
      <TravelHighlight/>
    </ScrollView>
  )
}

export default MainScreen

const styles = StyleSheet.create({
    container : {
        flex : 1,
        borderWidth : 0,
    }
})