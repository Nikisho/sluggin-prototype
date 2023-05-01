import React from 'react'
import tw from 'tailwind-react-native-classnames'
import moment from 'moment'
import { Icon, Image } from '@rneui/base'
import { Text, TouchableOpacity, View } from 'react-native'

const RideInformation = ({userData, rideData}) => {
    return (
        <View>

            <View style={[tw`py-3`, {
                borderBottomWidth: 0.5
            }]}>

                <View style={tw`flex-row items-center justify-between`}>
                    <View style={tw`flex-row items-center `}>
                        {/* wait for image to load from firestore before displaying  */}
                        {userData?.data().user.picture && (
                            <Image
                                style={{
                                    width: 50,
                                    height: 50,
                                    resizeMode: 'contain',
                                    borderRadius: 100
                                }}
                                source={{ uri: userData?.data().user.picture }}
                            />
                        )}

                        <Text style={tw`text-xl font-semibold mx-3`}>
                            {userData?.data().user.name}
                        </Text>
                    </View>

                    <TouchableOpacity>
                        <Icon style={tw`bg-blue-500 p-3 rounded-xl`}
                            name='message'
                            color='white'
                        />
                    </TouchableOpacity>
                </View>
                {/* <View style={tw`flex-row mb-2 mt-3 items-center px-2`}>
                        <Text style={tw`font-bold text-lg pr-3`}>
                            4/5
                        </Text>
                        <Icon
                            name='star'
                            type='ionicon'
                            color='green'
                            size={20}
                        />
                    </View> */}

            </View>
            <View style={tw`py-3`}>
                <View style={tw`flex-row justify-between`}>
                    <Text style={tw`text-xl font-bold`}>
                        {moment(rideData?.data().departure_time).format("DD, MMM yyyy")}
                    </Text>
                    <Text style={tw`text-white bg-black text-lg py-2 px-3`}>
                        £{rideData?.data().price_per_seat}
                    </Text>
                </View>
                {/* Journey Info */}
                <View style={tw`flex-row py-8`}>

                    {/* line icon and dots */}
                    <View style={tw`items-center pr-3`}>
                        <Icon style={tw`-mb-1`}
                            name='ellipse-outline'
                            color='black'
                            type='ionicon'
                            size={20}
                        />
                        <View style={{
                            backgroundColor: 'black',
                            width: 3,
                            height: 100,
                        }}>

                        </View>

                        <Icon style={tw`-mt-1`}
                            name='ellipse-outline'
                            color='black'
                            type='ionicon'
                            size={20}
                        />
                    </View>

                    {/* Origin and departure time */}
                    <View style={tw`justify-between`}>
                        <Text style={tw`text-lg font-semibold`}>
                            {moment(rideData?.data().departure_time).format('hh:mm')} - {rideData?.data().city_origin}
                        </Text>

                        <Text style={tw`text-lg font-semibold`}>
                            {moment(rideData?.data().arrival_time).format('hh:mm')} - {rideData?.data().city_destination}
                        </Text>

                    </View>
                </View>

            </View>
        </View>
    )
}

export default RideInformation

