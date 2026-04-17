//Imports del navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';
import { useCallback } from 'react';

//Se importan todas las screens que vamos a utilizar
import LoginScreen from './screens/login';
import Register from './screens/registro';
import Home from './screens/home';
import Profile from './screens/profile';
import Test from './screens/test'

const Stack = createNativeStackNavigator();

//Generando componente para probar GoogleDocs 
const Prueba = () => {
  const handleOpenDocument = useCallback(async () => {
    //El ID unico del documento que debería generarse al almacenarlo dentro de Google Drive
    const fileId = '1k92MpDpuXNjmnd-K8ulXkRowfwbdAcNndvJFEVJRXMM';
    //Formamos el path completo para abrir el documento
    const url = `https://docs.google.com/document/d/${fileId}/edit?usp=sharing&force_shell=1`;
    const url2 = `https://www.google.com/url?q=${url}`;

    try {
      const available = await Linking.canOpenURL(url);
      if(available){
        await Linking.openURL(url);
      }
    } catch(error){
      console.log("Se ha producido un error al abrir el documento");
    }
  })

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => {handleOpenDocument()}}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Probando</Text>
      </TouchableOpacity>
    </View>
  );
}

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

//Estilos solo para poder probar la integració con GoogleDocs
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'black'
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: '10%',
    backgroundColor: 'red',
    borderRadius: 10,
  }
});