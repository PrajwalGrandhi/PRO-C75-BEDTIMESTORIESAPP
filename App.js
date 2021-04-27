import * as React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator} from 'react-navigation-tabs'

import Writestory from './screens/WriteStory';
import Readstory from './screens/ReadStory';
import  LoginScreen  from "./screens/LoginScreen";

export default class App extends React.Component{

  render() {
    return(
     // <View>
        <AppContainer/>
      //</View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({ 
  Write: {screen: Writestory}, 
  Read: {screen: Readstory}, 
}, 
{ 
  defaultNavigationOptions: ({navigation})=>({ 
    tabBarIcon: ()=>{ 
      const routeName = navigation.state.routeName;
       //console.log(routeName) 
       if(routeName === "Read"){ 
        return( 
          <Image source={require("./assets/read.png")} style={{width:40, height:40}} /> 
        ) 
        } else if(routeName === "Write"){ 
          return( 
            <Image source={require("./assets/write.png")} style={{width:40, height:40}} />
          ) 
        } 
      } 
    }) 
  } 
  );

  const switchNavigator=createSwitchNavigator({Login:{screen:LoginScreen},Others:{screen:TabNavigator}})

const AppContainer =  createAppContainer(switchNavigator);