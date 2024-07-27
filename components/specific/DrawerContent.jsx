import {View, Text} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {Avatar, Title} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DrawerList = [
  {icon: 'home-outline', label: 'Home', navigateTo: 'Home'},
  {icon: 'account-multiple', label: 'Profile', navigateTo: 'Profile'},
  {icon: 'account-group', label: 'Authenticate', navigateTo: 'Authenticate'},
  // {icon: 'bookshelf', label: 'Library', navigateTo: ''},
];
const DrawerLayout = ({icon, label, navigateTo}) => {
  const navigation = useNavigation();
  // console.log(userData);
  return (
    <DrawerItem
      icon={({color, size}) => <Icon name={icon} color={color} size={size} />}
      label={label}
      onPress={() => {
        navigation.navigate(navigateTo);
      }}
    />
  );
};

const DrawerItems = props => {
    return DrawerList.map((el, i) => {
      return (
        <DrawerLayout
          key={i}
          icon={el.icon}
          label={el.label}
          navigateTo={el.navigateTo}
        />
      );
    });
  };
function DrawerContent(props) {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View className='flex-1'>
          <TouchableOpacity activeOpacity={0.8}>
            <View className='pl-8'>
              <View className='flex-row mt-15'>
                <Avatar.Image
                  source={{
                    uri: 'https://avatars.githubusercontent.com/u/140244233?v=4',
                  }}
                  size={50}
                  className='mt-2'
                />
                <View className='ml-10 flex-col'>
                  <Title className='text-lg mt-3 font-bold'>Prashant</Title>
                  <Text className=' text-xs text-gray-500' numberOfLines={1}>
                    7089445478
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View className='mt-15 border-b border-gray-500'>
            <DrawerItems />
          </View>
        </View>
      </DrawerContentScrollView>
      <View className='mb-15 border-t border-b border-gray-500'>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
        />
      </View>
    </View>
  );
}
export default DrawerContent;
