import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { ContextApp } from ".";


const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Context" component={ContextApp} />
      {/* <Drawer.Screen name="ContextApp" component={ContextApp} /> */}
    </Drawer.Navigator>
  );
}

export default function MyNavigationContainer() {
    return (
        <NavigationContainer>
            <MyDrawer/>
        </NavigationContainer>
    )
}
