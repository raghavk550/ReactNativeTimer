/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import ListTutorial from './List';

// AppRegistry.registerComponent(appName, () => App);

AppRegistry.registerComponent(appName, () => ListTutorial);