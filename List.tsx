import React, { useState, useEffect } from "react"
import { Alert, FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler"
import Icon from 'react-native-vector-icons/FontAwesome';

const ListTutorial = (() => {
    const Item = ({ title, id }: { title: any, id: any }) => {
        return (
            <GestureHandlerRootView>
                <Swipeable /*renderRightActions={() => renderRightActions(id)} */>
                    <View style={{ backgroundColor: 'white', marginHorizontal: 20, height: 50, marginVertical: 10, borderRadius: 10, flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginLeft: 10, flex: 0.9 }}>{title}</Text>
                        <TouchableOpacity onPress={() => deleteItem(id)} >
                            <Icon name="trash-o" size={30} color={"black"}></Icon>
                        </TouchableOpacity>
                    </View>
                </Swipeable>
            </GestureHandlerRootView>
        )
    }

    const [data, setData] = useState<any[]>([
        // {
        //     id: Date.now().toString(),
        //     title: 'Hi'
        // }
    ])

    const [keyboardOffset, setKeyboardOffset] = useState(20)

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            _keyboardDidShow,
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            _keyboardDidHide,
        );
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        }
    }, [data, keyboardOffset])

    const [inputText, setInputText] = useState("")

    const deleteItem = (itemId: any) => {
        setData(data.filter(item => item.id !== itemId));
    };

    const _keyboardDidShow = (event: any) => {
        setKeyboardOffset(event.endCoordinates.height + 10)
    }

    const _keyboardDidHide = () => {
        setKeyboardOffset(20)
    }

    const renderRightActions = (itemId: any) => (
        <TouchableOpacity onPress={() => deleteItem(itemId)} style={styles.deleteButton}>
            <Icon name="trash-o" size={30} color={"white"}></Icon>
        </TouchableOpacity>
    );

    const handleClick = (() => {
        if (inputText == "") {
            Alert.alert(
                "Alert",
                "Please write something",
            )
        }
        else {
            const listData = {
                id: Date.now().toString(),
                title: inputText
            }
            setInputText("")
            Keyboard.dismiss()
            setData([...data, listData])
        }
    })

    return (
        <View style={{ marginTop: 30, flex: 1, backgroundColor: '#d3d3d3' }}>
            <Text style={{ marginTop: 30, marginHorizontal: 10, fontSize: 18, fontWeight: "bold" }}>Today's task</Text>
            {data.length > 0 ?
                <FlatList
                    data={data}
                    renderItem={({ item }) => <Item title={item.title} id={item.id}></Item>}
                    keyExtractor={item => item.id}
                /> : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>No data</Text>
                </View>
            }
            <View style={{ marginBottom: keyboardOffset, flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                <TextInput
                    style={{ flex: 0.9, height: 40, borderColor: 'gray', borderWidth: 1, width: '60%', marginHorizontal: 20, borderRadius: 20 }}
                    onChangeText={(text) => {
                        setInputText(text)
                    }}
                    placeholder="Write a task..."
                    textAlign="center"
                    value={inputText}
                />
                <TouchableOpacity onPress={handleClick}>
                    <Icon name="plus-circle" size={30}></Icon>
                </TouchableOpacity>
            </View>
        </View>
    )
})

export default ListTutorial

const styles = StyleSheet.create({
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 50,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})