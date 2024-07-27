import { NavigationContainer, useNavigation, DrawerActions } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import Authenticate from './screens/auth/Authenticate'
import Verify from './screens/auth/Verify'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerContent from './components/specific/DrawerContent'
import Profile from './screens/profile/Profile'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Loader from './components/shared/Loader'
import axios from 'axios'
import { server } from './constants/config'
import { UserExists, UserNotExists } from './redux/reducers/auth'


export const getUser = async () => {
  try {
    const { data } = await axios.get(`${server}/api/v1/mobile/me`, { withCredentials: true });
    return data.user;
  } catch (error) {
    console.log(error);
  }
}

const DrawerNav = () => {
  const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>} screenOptions={{headerShown: false}}>
      <Drawer.Screen name='Home' component={Home} />
      <Drawer.Screen name='Profile' component={Profile} />
    </Drawer.Navigator>
  )
}

const AuthNav = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='Authenticate' component={Authenticate} />
      <Stack.Screen name='Verify' component={Verify}/>
    </Stack.Navigator>
  )
}

const Main = () => {

  const {user, loader} = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      if (user) {
        dispatch(UserExists(user));
      } else {
        dispatch(UserNotExists());
      }
    }
    
    fetchUser();

  }, [dispatch])

  const Stack = createNativeStackNavigator()

  return loader? (<Loader/>) : (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name='Drawer' component={DrawerNav} options={{headerShown: false}}/>
        ) : (
          <Stack.Screen name='Auth' component={AuthNav} options={{headerShown: false}}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Main