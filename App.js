import React from 'react'
import Home from './Src/Home'
import TodoDetails from './Src/TodoDetails'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Home" component={Home} options={
          { headerShown: false }
        } />
        <Screen name="TodoDetails" component={TodoDetails} />

      </Navigator>
    </NavigationContainer>
  )
}

export default App
