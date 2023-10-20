import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './src/component/main/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/component/navigator/TabNavigator';
import StackNavigator from './src/component/navigator/StackNavigator';
import DrawerNavigator from './src/component/navigator/DrawerNavigator';
import LoginScreen from './src/component/page/LoginScreen';
import LoginImage from './src/component/forms/LoginImage';




export default function App() {
  return (
  <NavigationContainer>
    <DrawerNavigator/>
      </NavigationContainer>

    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
