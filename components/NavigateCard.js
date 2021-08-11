import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import { Input } from 'react-native-elements';
import NavFavourites from './NavFavourites';
import { Icon } from 'react-native-elements';


const NavigateCard = () => {
    // const dispatch = useDispatch();
    const navigation = useNavigation();
    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-xl`}>Whatts up!!</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                {/* <ScrollView keyboardShouldPersistTaps='handled'> */}
                    <View>
                        <GooglePlacesAutocomplete 
                            placeholder="Where to?"
                            styles={toInputBoxStyles}   
                            fetchDetails={true}
                            returnKeyType={"search"}
                            minLength={2}
                            onPress={(data, details = null)=> {
                                console.log(data, details);
                                dispatch(setDestinationon({
                                    location: details.geometry.location,
                                    description: data.description,
                                }))
                                navigation.navigate("RideOptionsCard")
                            }}
                            onFail={error => console.error(error)}
                            keyboardShouldPersistTaps='always'
                            enablePoweredByContainer={false}
                            query={{
                                key: GOOGLE_API_KEY,
                                language: 'en',
                            }}
                            nearbyPlacesAPI="GooglePlacesSearch"
                            debounce={400}
                        />
                    </View>

                    {/* <NavFavourites /> */}
                {/* </ScrollView> */}
                
            </View>
            <View style={tw`flex-row bg-white justify-evenly py-2 mt-16 border-gray-100`}>
                
                <TouchableOpacity
                    onPress={()=> navigation.navigate('RideOptionsCard')}
                    style={tw`flex-row bg-black justify-between w-24 px-4 py-4 rounded-full`}>
                    <Icon name="car" type="font-awesome" color="white" size={16} />
                    <Text style={tw`text-white text-center `}>Rides</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={tw`flex-row justify-between  w-24 px-4 py-4 rounded-full`}>
                    <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
                    <Text style={tw`text-center text-black`}>Eats</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 0,
        paddingLeft: 14,
        paddingRight: 14,
    },
    textInput: {
        backgroundColor: '#DDDDDF',
        borderRadius: 18,
        fontSize: 18
    },
    textinputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
})
    
