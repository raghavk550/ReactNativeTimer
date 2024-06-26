import { Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { changeToWhite, changeToYellow, decrement, increment, selectColor, selectCount } from "../CounterSlice";

const ReduxTest = () => {
    const count = useSelector(selectCount)
    const color = useSelector(selectColor)
    const dispatch = useDispatch()

    return (
        <View style={{flex : 1, justifyContent : 'center', alignItems : 'center', backgroundColor : color}}>
            <Text>Count is {count}</Text>
            <TouchableOpacity onPress={() => dispatch(increment())}>
                <Text>Increment</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(decrement())}>
                <Text>Decrement</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(changeToYellow())}>
                <Text>Change To Yellow</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(changeToWhite())}>
                <Text>Change To White</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ReduxTest;