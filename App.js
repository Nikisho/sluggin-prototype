import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <SafeAreaProvider>
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name='HomeScreen' 
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />          
          </Stack.Navigator>
        </NavigationContainer>
        
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


// import { NavigationContainer } from '@react-navigation/native';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// export default function App() {
//     const Stack = createNativeStackNavigator();
//   return (
//     <Provider store={store}>
//       <SafeAreaProvider>
        // <NavigationContainer>
        //   <Stack.Navigator>
        //     <Stack.Screen
        //       name='HomeScreen' 
        //       component={HomeScreen}
        //       options={{
        //         headerShown: false,
        //       }}
        //     />          
        //   </Stack.Navigator>
        // </NavigationContainer>
//       </SafeAreaProvider>
//     </Provider>
//   );
// }