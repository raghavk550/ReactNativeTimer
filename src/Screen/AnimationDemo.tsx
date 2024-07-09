import {Dimensions, TouchableOpacity, View} from 'react-native';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import {useHeaderHeight} from '@react-navigation/elements';

const AnimationDemo = () => {
  const width = useSharedValue(40);
  const height = useSharedValue(40);
  const backgroundColor = useSharedValue('red');

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const headerHeight = useHeaderHeight();

  const handlePress = () => {
    width.value = withSpring(generateRandomNumber(40, 80));
    height.value = withSpring(generateRandomNumber(40, 80));
    backgroundColor.value = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`;

    handlePressForX();
  };

  const handlePressForX = () => {
    const randomX = generateRandomNumber(
      0,
      Dimensions.get('window').width - (width.value + 10),
    );
    const randomY = generateRandomNumber(
      0,
      Dimensions.get('window').height - (height.value + 10 + headerHeight),
    );
    translateX.value = withSpring(randomX);
    translateY.value = withSpring(randomY);
  };

  const generateRandomNumber = (minNo: number, maxNo: number) => {
    const rand = minNo + Math.random() * (maxNo - minNo);
    return rand;
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={handlePress}>
        <Animated.View
          style={{
            width,
            height,
            backgroundColor,
            transform: [{translateX}, {translateY}],
          }}
        />
      </TouchableOpacity>
      {/* <Button onPress={handlePress} title="Click me for width" />
            <Button onPress={handlePressForX} title="Click me for x" /> */}
    </View>
  );
};

export default AnimationDemo;
