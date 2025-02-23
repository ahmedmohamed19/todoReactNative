import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './Src/Home'
import TodoDetails from './Src/TodoDetails'  // تأكد من أن الملف موجود
import { KeyboardAvoidingView } from 'react-native-web'
KeyboardAvoidingView
const { Navigator, Screen } = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Navigator>
       
          <Screen name="Home" component={Home} />
          <Screen name="TodoDetails" component={TodoDetails} />
        
      </Navigator>
    </NavigationContainer>
  )
}

export default App
