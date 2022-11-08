import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { useSelector } from 'react-redux'
import { selectTravelDate } from '../slices/navSlice'
import moment from 'moment'

const RideOptionsCard = () => {
  const date = useSelector(selectTravelDate);
  console.log(date + 'check')
  return (
    <View>
      <View style={tw`p-3 justify-center items-center h-2/6 bg-green-200`}>
        <Text style={tw`text-xl`}>
          {moment(date).format('ddd, DD MMM')}
        </Text>
      </View>
    </View>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})