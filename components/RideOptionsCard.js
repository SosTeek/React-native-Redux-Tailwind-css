import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import { TouchableOpacity} from 'react-native-gesture-handler'

const data = [
    {
        id: 'Uber-X-123',
        title: 'Uber X',
        multiplier: 1,
        image: 'https://links.papareact.com/3pn',
    },
    {
        id: 'Uber-XL-456',
        title: 'Uber XL',
        multiplier: 1.2,
        image: 'https://links.papareact.com/5w8',
    },
    // {
    //     id: 'Uber-LUX-789',
    //     title: 'Uber LUX',
    //     multiplier: 1.75,
    //     image: 'https://links.papareact.com/7pf',
    // },
]
// rounded-full top-3
const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View >
                <TouchableOpacity
                    onPress={()=> navigation.navigate('NavigateCard')}
                    style={[tw` top-3 z-50 rounded-full`]}
                >
                    <Icon name="chevron-left" type="font-awesome" />
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>Pick a ride</Text>

            </View>
            <FlatList 
            // <ScrollView style={{ backgroundColor: 'pink', marginHorizontal: 20}}
                data={data}
                keyExtractor={(item)=> item.id}
                renderItem={({item: {id, title, multiplier, image}, item})=> (
                    <TouchableOpacity 
                        onPress={()=> setSelected(item)}
                        style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && "bg-gray-200"}`}
                    >
                        <Image 
                            style={[tw`h-14 w-20 `]}
                            source={{ uri: image}}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-xl font-semibold`}>{title}</Text>
                            <Text>Travel time....</Text>
                        </View>
                        <View>
                            <Text style={tw`text-xl`}>$99</Text>
                        </View>
                    </TouchableOpacity>
                )}
            // </ScrollableView>
                
            />
            <View>
                <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}` }>
                    <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard

const styles = StyleSheet.create({})
