import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './src/component/navigator/DrawerNavigator';
import { Provider } from 'react-redux';
import {store} from './src/component/redux/modules/Store'



export default function App() {
  return (
  <Provider store={store}>
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
