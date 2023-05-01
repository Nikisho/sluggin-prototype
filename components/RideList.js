import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import moment from 'moment'
import { Icon, Image } from '@rneui/base'
import { useDispatch } from 'react-redux'
import { setRideScreen } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native';

const RideList = ({RideData, screen}) => {
    const route = useRoute();
    console.log(route.name)
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const selectRide = async (id) => {
        dispatch(setRideScreen(id));
        if (route.name === "RideOptionCard") {
            navigation.navigate("RideScreen");
        } else if (route.name === "MyRidesScreen") {
            navigation.navigate("UserDriverRideScreen");
        }
            
    };
    return (
        <View >
            <FlatList
                contentContainerStyle={{ paddingBottom: 100 }}
                data={RideData}
                scrollEnabled
                keyExtractor={(item) => item.id}
                renderItem={({ item:
                    {
                        id,
                        DriverUsername,
                        city_origin,
                        city_destination,
                        departure_time,
                        price_per_seat,
                        DriverUserImage,
                    } }) => (
                    <TouchableOpacity style={tw`justify-between px-3 py-3 bg-white m-2 rounded-xl shadow-lg`}
                        onPress={() => selectRide(id)}
                    >
                        <View style={tw`flex-row justify-between `}>
                            <Text style={tw`font-bold`}>{city_origin}</Text>
                            <Icon
                                name='arrow-forward-circle-outline'
                                style={tw` rounded-full`}
                                type='ionicon'
                                color='black'
                            />
                            <Text style={tw`font-bold`}>
                                {city_destination}
                            </Text>
                        </View>
                        <View style={tw`flex-row justify-between pb-2`}>
                            <Text style={tw`text-lg`}>{moment(departure_time).format('hh:mm')}</Text>
                            <Text style={tw`text-lg`}>{moment(departure_time).format('hh:mm')}</Text>
                        </View>
                        <View style={tw`flex-row justify-between`}>

                            <View style={tw` items-center flex-row`}>

                                <Image
                                    style={{
                                        width: 40,
                                        height: 40,
                                        resizeMode: 'contain',
                                        borderRadius: 100
                                    }}

                                    source={
                                        {
                                            uri: DriverUserImage
                                        }
                                    }
                                />
                                <View style={tw`px-4`}>
                                    <Text style={tw`text-lg font-semibold`}>{DriverUsername}</Text>
                                    {/* <Text>{travelTimeInformation?.duration?.text}</Text> */}

                                    <View style={tw`items-center flex-row`}>
                                        <Text style={tw`text-lg px-2`}>
                                            4.5
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

                            <View style={tw`justify-center items-center bg-black h-10 w-14`}>
                                <Text style={tw`text-lg text-white `}>
                                    £{price_per_seat}
                                </Text>
                            </View>

                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>

    )
}

export default RideList

const styles = StyleSheet.create({})