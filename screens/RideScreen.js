import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Map from '../components/Map'
import tw from 'tailwind-react-native-classnames'
import { useSelector } from 'react-redux'
import { selectRideScreen } from '../slices/navSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from '@rneui/base'

const RideScreen = () => {
    const id = useSelector(selectRideScreen);
    console.log(id);
    const data = 
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
      
        };
       
  return (
    <View >
        {/* Map half of screen */}
        <View style={tw`h-1/3`}>
            {/* <Map/> */}
        </View>
        
        {/* Ride information half */}
        <View style={tw`h-2/3 m-4`}>
            <View style={[tw``,{
                borderBottomWidth: 0.5
            }]}>

                <View style={tw`flex-row items-center justify-between`}>
                    <View style={tw`flex-row `}>

                        <Image
                            style={{
                            width: 50,
                            height: 50,
                            resizeMode: 'contain',
                            borderRadius: 100
                            }}
                            source={{ uri: data.image }}
                        />
                        <Text style={tw`text-xl font-semibold mx-3`}>
                            {data.name}
                        </Text>
                    </View>
                    
                    <TouchableOpacity>
                        <Icon style={tw`bg-blue-500 p-3 rounded-full`}
                            name='message'
                            color='white'
                        />
                    </TouchableOpacity>                        
                </View>
                <View style={tw`flex-row mb-2 mt-3 items-center px-2`}>
                    <Text style={tw`font-bold text-lg pr-3`}>
                        {data.reviews}/5
                    </Text>
                    <Icon
                        name='star'
                        type='ionicon'
                        color='green'
                        size={20}
                    />
                </View>

            </View>

        </View>

    </View>
  )
}

export default RideScreen

const styles = StyleSheet.create({})