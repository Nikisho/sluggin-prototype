import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { Icon, Image } from '@rneui/base'

const ProfileScreen = () => {
  const mobileNumber = '+44 7463 030833'
  return (
    <SafeAreaView>
        <View style={tw`justify-center items-center bg-black py-3 mx-2 rounded-xl`}>
          <Text style={tw`text-white text-xl font-semibold`}>
              About You
          </Text>
        </View>
        
        {/* image/name div */}
        <View style={tw`border-b flex-row mx-5 p-4 justify-between items-center `}>
        <Image
              style={{
                  width: 80,
                  height: 80,
                  resizeMode: 'contain',
                  borderRadius: 100
              }}
              source={{ uri: 'https://images.pexels.com/photos/1334945/pexels-photo-1334945.jpeg?auto=compress&cs=tinysrgb&w=1600' }}
          />
          <Text style={tw`font-bold text-xl`}>
            Mike
          </Text>
        </View>

        {/* Bio div */}
        <View style={tw`p-3 mx-3`}>


          <View style={tw`flex-row justify-between`}>
            <Text style={tw`font-semibold text-lg`}>
              Introduction
            </Text>
            <Icon 
                color='gray'
                size={25}
                type='ionicon'
                name="create-outline">
            </Icon>
          </View>
          <View style={tw`my-2 bg-gray-200 p-3 rounded-lg`}>
            <Text style={tw`text-sm`}>
              Hey, I'm Mike and I have to commute between Birmingham and London quite often!
              I thought it'd be fun to share the rides with someone else. I am a software engineer and I love talking about music,
              food and politics. I also have a dog and I love sushi.
              PS: NO SMOKING IN THE CAR.
            </Text>
          </View>

          <View style={tw`flex-row justify-between `}>
            <Text style={tw`font-semibold text-lg`}>
              Phone
            </Text>

            <Icon 
                color='gray'
                size={25}
                type='ionicon'
                name="create-outline">
            </Icon>
          </View>
          <View style={tw`my-2 bg-gray-200 p-2 rounded-lg`}>
              <Text style={tw`text-lg font-bold`}>
                {mobileNumber}  
              </Text>
          </View>

          <View style={tw`flex-row justify-between py-2`}>
            <Text style={tw`font-semibold text-lg`}>
              Vehicle             
            </Text>

            <Icon 
                color='gray'
                size={25}
                type='ionicon'
                name="create-outline">
            </Icon>

          </View>

          <View style={tw`flex-row justify-between items-center bg-gray-200 rounded-xl p-3`}>
            <Text style={tw`font-semibold`}>
              Ford fiesta 2015
            </Text>
            <Image
              style={{
                width: 80,
                height: 80,
                resizeMode: 'contain'
              }}
              source={{ uri: "https://links.papareact.com/3pn"}}
            />
          </View>
        </View>
    </SafeAreaView>
  )
}

export default ProfileScreen