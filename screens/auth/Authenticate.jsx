import { Toasts, toast } from '@backpackapp-io/react-native-toast'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Button } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { useState } from 'react'
import axios from 'axios'
import { server } from '../../constants/config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image } from 'react-native'
import authenticate from '../../assets/authenticate.webp'
import flag from '../../assets/flag.png'
import AntDesign  from '@expo/vector-icons/AntDesign';


const Authenticate = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const [phone, setPhone] = useState('')

  const handleSubmit = async () => {
    const id = toast.loading('Signing Up...');
    setIsLoading(true)
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const newPhone = "+91" + phone;
      const {data} = await axios.post(`${server}/api/v1/mobile/verify`, { phone : newPhone}, config);
      await AsyncStorage.setItem('phone', phone);
      await AsyncStorage.setItem('otp', data?.hashedOtp);
      toast.success(data?.message, id);
      setIsRegistered(true);
    } catch (error) {
      toast.error((error?.response?.data?.message) || 'Something went wrong!', id);
    } finally {
      setIsLoading(false);
    }  
  }

  if(isRegistered) {
    navigation.navigate('Verify')
  }

  return (
    <SafeAreaProvider>
    <GestureHandlerRootView>
      <View className='flex-1 items-center bg-white py-16'>
          <Image source={authenticate} resizeMode='contain' className=' h-48 mb-5'/>
          <View className='my-10'>
            <Text className='text-center font-semibold text-lg'>Enter Your Phone Number</Text>
            <Text className='text-center text-gray-600'>You shall receive a verification SMS.</Text>
          </View>

          <View className='flex-row mx-16 my-8 border-b border-gray-400'>
            <TouchableOpacity className='flex-row items-center'>
              <View className='justify-center'>
                <AntDesign name="down" size={15} color="black" />
              </View>
              <View className='justify-center ml-2'>
                <Image source={flag} resizeMethod='contain' className='h-10 w-10'/>
              </View>
              <View>
                <Text>+91</Text>
              </View>
            </TouchableOpacity>
            <TextInput placeholder='Enter phone number' keyboardType='phone-pad' onChangeText={setPhone} value={phone} className='w-full bg-white ml-3 text-lg tracking-widest' />
          </View>

          <View className='mt-20 w-full p-4'>
          <TouchableOpacity disabled={isLoading} onPress={() => navigation.navigate('Verify')} className='p-2 rounded-md bg-black'>
            <Text className='text-white font-bold text-lg text-center'>Proceed</Text>
          </TouchableOpacity>
          </View>
      </View>
      <Toasts/>
    </GestureHandlerRootView>
  </SafeAreaProvider>
  )
}


export default Authenticate