import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { Avatar } from 'react-native-paper'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker'
import { toast } from '@backpackapp-io/react-native-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncMutation } from '../../hooks/hooks';
import { useUpdateProfileMutation } from '../../redux/api';
import mime from 'mime';



const Profile = () => {

    const {user} = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const [updateProfile] = useAsyncMutation(useUpdateProfileMutation)

    const [image, setImage] = useState( null);
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');

    
    const handleSubmit = async () => {
        console.log(name, email, image)
        const myForm = new FormData();
        myForm.append('name', name);
        myForm.append('email', email);
        if(image !== null){
            myForm.append('file', {
                uri: image,
                type: mime.getType(image),
                name: image.split('/').pop()
            });
        }
 
        await updateProfile('Updating profile...', myForm)
    }

    const selectPhoto = async (mode) => {
        try {
            let result = {};
            if(mode === 'gallary'){
                await ImagePicker.requestMediaLibraryPermissionsAsync();
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                })

            } else {
                await ImagePicker.requestCameraPermissionsAsync();
                result = await ImagePicker.launchCameraAsync({
                    cameraType: ImagePicker.CameraType.front,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                })
            }

            if(!result.canceled){
                await saveImage(result.assets[0].uri)
                toast.success('Image uploaded successfully')
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message || 'An error occured')
        }
    }

    const saveImage = async (image) => {
        try {
            setImage(image)

        } catch (error) {
            console.log(error)
            
        }
    }



  return (
    <View className='flex-1'>
        <Text className='text-center text-xl font-bold'>Profile</Text>
        <View className='flex-row justify-center items-center relative w-40 h-40 mt-12 ml-2 rounded-full'>
            <Image className='w-full h-full rounded-full' source={{uri: user?.avatar?.url || image || 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg'}}/>
            <TouchableOpacity onPress={() => selectPhoto("gallary")} className='rounded-full p-2 absolute bottom-0 right-0 bg-black/80'>
                <MaterialIcons name="mode-edit-outline" size={24} color="white" />
            </TouchableOpacity>
        </View>
        <View className='flex-col gap-8 p-8 mt-4'>
            <TextInput value={ name} onChangeText={setName} className=' text-lg border-b border-gray-400' placeholder='Name'/>
            <TextInput value={ email} onChangeText={setEmail} className=' text-lg border-b border-gray-400' placeholder='Email'/>
            <TextInput editable={false} value={ '+91' + user?.phone} className=' text-lg border-b border-gray-400' placeholder='Phone'/>
        </View>
        <View className='w-full px-8 mt-4'>
            <TouchableOpacity onPress={() => handleSubmit()} className='rounded-lg bg-black p-2'>
                <Text className='text-center text-lg font-bold text-white'>Update</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default AppLayout()(Profile)