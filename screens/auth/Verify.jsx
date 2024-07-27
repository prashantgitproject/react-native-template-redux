import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Toasts, toast } from '@backpackapp-io/react-native-toast'
import { useState } from 'react'
import axios from 'axios'
import { server } from '../../constants/config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import reactNativeBcrypt from 'react-native-bcrypt'
import { useDispatch } from 'react-redux'
import { UserExists } from '../../redux/reducers/auth'
import { OtpInput } from 'react-native-otp-entry'

const Verify = ({navigation}) => {

  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')

  const handleSubmit = async () => {

    if(code.length !== 4) return toast.error('Fill in the OTP code');

    setIsLoading(true)
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const toastId = toast.loading('Verifying...');
      const phone = '68787687686';
      // const phone = await AsyncStorage.getItem('phone');
      // const otp = await AsyncStorage.getItem('otp');
      // console.log(phone, otp)

      // if(reactNativeBcrypt.compareSync(code, otp) === false) {
      //   setIsLoading(false);
      //   return toast.error('Invalid OTP', id);
      // }

      const {data} = await axios.post(`${server}/api/v1/mobile/register`, { phone}, config);
      dispatch(UserExists(data?.user));
      await AsyncStorage.clear();
      toast.success(data?.message, {id: toastId});
    } catch (error) {
      toast.error((error?.response?.data?.message) || 'Something went wrong!', id);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaProvider>
    <GestureHandlerRootView>
        <View className='flex-1 items-center bg-white py-16'>
          <View className='my-10'>
            <Text className='text-center font-bold text-lg'>Enter OTP</Text>
            <View className='mt-16 px-8'>
              <OtpInput numberOfDigits={4} onTextChange={setCode} focusColor="black" focusStickBlinkingDuration={500}
                theme={{pinCodeContainerStyle: {borderRadius: 12, width: 58, height: 58, backgroundColor: "white"}}}
              />
            </View>
            <View className='flex-row gap-1 mt-4 mx-auto'>
              <Text>Didn't receive the code?</Text>
              <TouchableOpacity>
                <Text className='font-bold text-violet-700'>Resend Code</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className='mt-15 w-full p-4'>
          <TouchableOpacity disabled={isLoading} onPress={() => handleSubmit()} className='p-2 rounded-md bg-black'>
            <Text className='text-white font-bold text-lg text-center'>Verify</Text>
          </TouchableOpacity>
          </View>
        </View>
      <Toasts/>
    </GestureHandlerRootView>
  </SafeAreaProvider>
  )
}

export default Verify