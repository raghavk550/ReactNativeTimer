import LottieView from 'lottie-react-native';
import React, {useEffect, useRef} from 'react';
import {Animated, Easing} from 'react-native';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const LottieAnimationView = () => {
  const animationRef = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationRef.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <AnimatedLottieView
      style={{flex: 1, justifyContent: 'center'}}
      source={require('../Animations/helloLottieAnimation.json')}
      progress={animationRef.current}
      autoPlay
      loop
    />
  );
};

export default LottieAnimationView;
