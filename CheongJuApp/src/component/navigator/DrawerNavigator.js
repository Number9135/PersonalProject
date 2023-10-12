import { createDrawerNavigator } from '@react-navigation/drawer';
import MainScreen from '../main/MainScreen';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={MainScreen} />
    </Drawer.Navigator>
  );
}