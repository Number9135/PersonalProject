import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './src/component/main/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/component/navigator/TabNavigator';
import StackNavigator from './src/component/navigator/StackNavigator';
import DrawerMenu from './src/component/forms/DrawerMenu';

export default function App() {
  return (
  <NavigationContainer>
    <TabNavigator/>
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
