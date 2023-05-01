import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { Icon, Tab, TabView } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import RideOptionsCard from '../components/RideOptionsCard'
import UserRides from '../components/UserRides'
import UserRideListDriver from '../components/UserRideListDriver'

const MyRidesScreen = () => {
    const navigation = useNavigation();
    const [index, setIndex] = React.useState(0);

    return (
        <>
            <SafeAreaView>
                <View style={tw`mx-2 rounded-xl my-2 justify-center items-center h-12 bg-black`}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('HomeScreen')}
                        style={tw`absolute left-4 z-50 rounded-full shadow-lg`}>
                        <Icon name='chevron-back-outline'
                            type='ionicon'
                            color='white'
                        />
                    </TouchableOpacity>
                    {/* {//if your ID matches with one of the passengerIds in the document, display the ride!} */}
                    <Text style={tw`text-xl text-white`}>
                        Your rides
                    </Text>
                </View>
            </SafeAreaView>
            <Tab

                value={index}
                onChange={(e) => setIndex(e)}
                indicatorStyle={{
                    backgroundColor: 'black',
                    height: 2,

                }}
                containerStyle={{
                    borderRadius: 10,
                    margin: 8
                }}
            >
                <Tab.Item
                    title="You ride"
                    titleStyle={{ fontSize: 12, color: 'black' }}
                    icon={{ name: 'person', type: 'ionicon', color: 'black' }}
                    containerStyle={{
                        backgroundColor: 'white',
                        borderRadius: 5
                    }}
                />
                <Tab.Item
                    title="You drive"
                    titleStyle={{ fontSize: 12, color: 'black' }}
                    icon={{ name: 'car', type: 'ionicon', color: 'black' }}
                    containerStyle={{
                        backgroundColor: 'white',
                        borderRadius: 5
                    }}
                />
            </Tab>
            <TabView value={index} onChange={setIndex} animationType="spring"  

            >
                    <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
                        <UserRides/>
                    </TabView.Item>
                    <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
                        {/* {display ride if your id matches with driverID in ride doc} */}
                        <UserRideListDriver />
                    </TabView.Item>
           
            </TabView>
        </>
    )
}

export default MyRidesScreen

const styles = StyleSheet.create({})