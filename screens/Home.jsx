import { View, Text } from 'react-native'
import AppLayout from '../components/layout/AppLayout'

const Home = () => {
  return (
    <View className='flex-1 justify-center items-center'>
        <Text className='text-center text-2xl font-bold'>Home</Text>
    </View>
  )
}

export default AppLayout()(Home) 