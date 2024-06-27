import { StyleSheet, View } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const GestureDemo = () => {
    const offset = useSharedValue({ x: 0, y: 0 });
    const start = useSharedValue({ x: 0, y: 0 });

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: offset.value.x },
                { translateY: offset.value.y },
            ],
        };
    });
    const pan = Gesture.Pan().onBegin(() => {
        console.log("Animation Begins");
        
    }).onUpdate((newOffset) => {
        offset.value = {
            x: newOffset.translationX + start.value.x,
            y: newOffset.translationY + start.value.y
        }
    }).onEnd(() => {
        start.value = {
            x: offset.value.x,
            y: offset.value.y,
        };
        console.log("Animation Ends");
    })
    return (
        <GestureDetector gesture={pan}>
            <Animated.View style={[styles.ball, animatedStyles]}></Animated.View>
        </GestureDetector>
    )
}

export default GestureDemo;

const styles = StyleSheet.create(
    {
        viewStyle: {
            flex: 1,
            backgroundColor: 'green'
        },
        ball: {
            width: 100,
            height: 100,
            borderRadius: 100,
            backgroundColor: 'blue',
            alignSelf: 'center',
        },
    }
)