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
      name: 'Rishi',
      image: 'data:image/jpeg;base64,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',
      origin: 'Washington DC',
      destination: 'New York City, NY',
      departureTime: '9:00',
      arrivalTime: '13:00',
      reviews: '4.9',
      price: '11'
    },
    {
      id: 2,
      name: 'Mike',
      image: 'https://images.pexels.com/photos/1334945/pexels-photo-1334945.jpeg?auto=compress&cs=tinysrgb&w=1600',
      origin: 'Washington DC',
      destination: 'New York City, NY',
      departureTime: '10:00',
      arrivalTime: '14:00',
      reviews: '4.6',
      price: '12'

    },
    {
      id: 3,
      name: 'Jasmine',
      image: 'https://pps.whatsapp.net/v/t61.24694-24/120646598_196308208541947_5722960055077306099_n.jpg?ccb=11-4&oh=01_AdQ1YfZKrb6CdOixG-xJYjr4KxdwQhj4Ebjc94OB8pk2Xg&oe=637AA942',
      origin: 'Washington DC',
      destination: 'Brooklyn, NY',
      departureTime: '10:10',
      arrivalTime: '13:40',
      reviews: '4.8',
      price: '14'

    },
  ]

  console.log(date + ' check');
  return (
    <SafeAreaView style={tw``}>
      {/* Header */}
      <View style={tw`mx-2 rounded-xl justify-center items-center h-14 bg-black`}>
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
        renderItem={({item:{id, name, origin, destination, image, departureTime, arrivalTime, reviews, price}}) => (
          <TouchableOpacity style={tw`justify-between px-3 py-3 bg-white m-2 rounded-xl shadow-lg`}>
            <View style={tw`flex-row justify-between `}>
              <Text style={tw`font-bold`}>{origin}</Text>
              <Icon
                name='arrow-forward-circle-outline'
                style={tw` rounded-full`}
                type='ionicon' 
                color='black'
              />
              <Text style={tw`font-bold`}>
                {destination}
              </Text>
            </View>
            <View style={tw`flex-row justify-between pb-2`}>
              <Text style={tw`text-lg`}>{departureTime}</Text>
              <Text style={tw`text-lg`}>{arrivalTime}</Text>
            </View>
            <View style={tw`flex-row justify-between py-3`}>

                <View style={tw` items-center flex-row`}>

                  <Image
                      style={{
                        width: 40,
                        height: 40,
                        resizeMode: 'contain',
                        borderRadius: 100
                      }}
                    source={{ uri: image}}
                  /> 
                  <View style={tw`px-4`}>
                    <Text style={tw`text-lg font-semibold`}>{name}</Text>
                    {/* <Text>{travelTimeInformation?.duration?.text}</Text> */}

                    <View style={tw`items-center flex-row`}>
                      <Text style={tw`text-lg px-2`}>
                        {reviews}
                      </Text>
                      <Icon
                        name='star'
                        type='ionicon'
                        color='yellow'
                        size={20}
                      />
                    </View>
                    
                  </View>
                  
                </View>

                <View style={tw`justify-center h-10 bg-green-300 px-3 rounded-2xl`}>
                  <Text style={tw`text-lg font-bold text-white`}>
                    ${price}
                  </Text>
                </View>

            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})