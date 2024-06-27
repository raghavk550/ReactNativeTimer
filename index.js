/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import ListTutorial from './List';
import ContextTest from './Context';
import MyProvider from './MyProvider';
import MyNavigationContainer from './Drawer';
import { Provider } from 'react-redux';
import { store } from './src/ReduxStore';
import ReduxTest from './src/Screen/ReduxTest';
import AnimationDemo from './src/Screen/AnimationDemo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GestureDemo from './src/Screen/GestureDemo';
import LottieAnimationView from './src/Screen/Lottie';

// AppRegistry.registerComponent(appName, () => App);

// AppRegistry.registerComponent(appName, () => ListTutorial);

 export function ContextApp() {
    return (
        // <MyProvider>
        //     <ContextTest />
        // </MyProvider>

        // <Provider store={store}>
        //     <ReduxTest />
        // </Provider>

        // <Provider store={store}>
        //     <AnimationDemo />
        // </Provider>

        // <Provider store={store}>
        //     <GestureHandlerRootView>
        //         <GestureDemo />
        //     </GestureHandlerRootView>
        // </Provider>

        <LottieAnimationView />
    );
}

// AppRegistry.registerComponent(appName, () => ContextApp)

AppRegistry.registerComponent(appName, () => LottieAnimationView/*MyNavigationContainer*/)