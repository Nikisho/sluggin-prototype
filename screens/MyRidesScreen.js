import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { Icon } from '@rneui/base'
import { Tab } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native'

const MyRidesScreen = () => {
    const navigation = useNavigation();
    const [index, setIndex] = React.useState(0);

    return (
        <SafeAreaView>
            <View style={tw`mx-2 rounded-xl justify-center items-center h-12 bg-black`}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('HomeScreen')}
                    style={tw`absolute left-4 z-50 rounded-full shadow-lg`}>
                    <Icon name='chevron-back-outline'
                        type='ionicon'
                        color='white'
                    />
                </TouchableOpacity>
                <Text style={tw`text-xl text-white`}>
                    Your rides
                </Text>
            </View>
            <View style={tw`p-2 rounded-lg`}>
                <Tab 
                    
                    value={index}
                    onChange={(e) => setIndex(e)}
                    indicatorStyle={{
                        backgroundColor: 'black',
                        height: 1,
                        
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
            </View>
        </SafeAreaView>
    )
}

export default MyRidesScreen

const styles = StyleSheet.create({})