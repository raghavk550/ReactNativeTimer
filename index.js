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

        <Provider store={store}>
            <AnimationDemo />
        </Provider>
    );
}

// AppRegistry.registerComponent(appName, () => ContextApp)

AppRegistry.registerComponent(appName, () => MyNavigationContainer)