import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { useSelector } from 'react-redux'
import { selectTravelDate } from '../slices/navSlice'
import moment from 'moment'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'

const RideOptionsCard = () => {
  const date = useSelector(selectTravelDate);
  const navigation = useNavigation();
  const data = [
    {
      id: 1,
      name: 'Kevin',
      image: 'https://lh3.googleusercontent.com/ogw/AOh-ky2VwznkgfBn0qu1weSj-YHIg1EGtJVQHFo0senY=s64-c-mo',
      origin: 'Whashington DC',
      destination: 'New York City, NY'
    },
    {
      id: 2,
      name: 'Sofia',
      image: 'https://lh3.googleusercontent.com/ogw/AOh-ky2VwznkgfBn0qu1weSj-YHIg1EGtJVQHFo0senY=s64-c-mo',
      origin: 'Whashington DC',
      destination: 'New York City, NY'

    }
  ]

  console.log(date + ' check');
  return (
    <SafeAreaView>
      <View style={tw`mx-2 rounded-xl justify-center items-center h-1/6 bg-black`}>
      <TouchableOpacity 
          onPress={() => navigation.navigate('HomeScreen')}
          style={tw`absolute left-4 z-50 rounded-full
          shadow-lg`}>
          <Icon name='chevron-back-outline' 
              type='ionicon'
              color='white'
          />
      </TouchableOpacity>
        <Text style={tw`text-xl text-white`}>
          {moment(date).format('ddd, DD MMM')}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item:{id, name, origin, destination, image}}) => (
          <TouchableOpacity style={tw`justify-between px-3 py-3 bg-white m-2 rounded-xl shadow-lg`}>
            <View style={tw`flex-row justify-between py-5 `}>
              <Text style={tw``}>{origin}</Text>
              <Icon
                name='arrow-forward-circle-outline'
                style={tw` rounded-full`}
                type='ionicon' 
                color='black'
              />
              <Text>
                {destination}
              </Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <View style={tw`justify-center`}>
                <Text style={tw`text-lg font-semibold`}>{name}</Text>
                {/* <Text>{travelTimeInformation?.duration?.text}</Text> */}
              </View>
              <Image
                  style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'contain',
                    borderRadius: 100
                  }}
                source={{ uri: image}}
              /> 

            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})