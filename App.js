import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import Conversor from './src/conversor';

//https://free.currencyconverterapi.com/api/v5/convert?q=USD_BRL&compact=ultra&apiKey=42be2a924ef783a2fde4

class App extends Component{
  render(){
    return(
      
      <View style={styles.container}>

       <Conversor />
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default App;