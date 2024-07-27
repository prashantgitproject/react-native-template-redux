import { View, Text, Platform, StatusBar, SafeAreaView, Button } from 'react-native'
import { Toasts } from '@backpackapp-io/react-native-toast'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import { useState } from 'react'
import {useNavigation, DrawerActions} from '@react-navigation/native'


const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const navigation = useNavigation()


    return (
      <SafeAreaProvider>
        <GestureHandlerRootView>
            <View 
              style={{
                backgroundColor: "#fff",
                flex: 1,
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
              }}
            >
              <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} className='absolute top-12 left-6 z-50 border border-gray-600 p-1 rounded-lg'>
                <Entypo name="menu" size={24} color="gray" />
              </TouchableOpacity>

                <WrappedComponent {...props} />

            </View>
          <Toasts/>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    )
  }
}

export default AppLayout