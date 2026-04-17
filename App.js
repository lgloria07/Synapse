//Imports del navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Se importan todas las screens que vamos a utilizar
import LoginScreen from './screens/login';
import Register from './screens/registro';
import Home from './screens/home';
import Profile from './screens/profile';
import Test from './screens/test'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="login"
      screenOptions={{ headerShown: false }}>

        <Stack.Screen 
          name="login" 
          component={LoginScreen} 
        />

        <Stack.Screen 
          name="registro" 
          component={Register} 
        />

        <Stack.Screen 
          name="home" 
          component={Home} 
        />

        <Stack.Screen 
          name="profile" 
          component={Profile} 
        />

        <Stack.Screen 
          name="test" 
          component={Test} 
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}