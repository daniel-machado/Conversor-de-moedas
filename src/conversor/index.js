import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard
} from 'react-native';

import {Picker} from '@react-native-community/picker';

import api from '../services/api';

// > convert?q=USD_BRL&compact=ultra&apiKey=42be2a924ef783a2fde4
class Conversor extends Component{
    
    constructor(props){
        super();
        this.state = {
            moedaA: 0,
            moedaB: 0,
            moedaB_valor: 0,
            valorConvertido: 0,
            
            moedas: [
                {key: 1, valor: 'USD', name: 'Dolar' },
                {key: 2, valor: 'BRL', name: 'real' },
                {key: 3, valor: 'CAD', name: 'Dolar canadense' },
                {key: 4, valor: 'EUR', name: 'Euro' },
                {key: 5, valor: 'CNH', name: 'Yuan' },
            ]
        };
        
        this.converter = this.converter.bind(this);
    }

    async converter(){

        let de_para = this.state.moedas[this.state.moedaA].valor + '_' + this.state.moedas[this.state.moedaB].valor;
        const response = await api.get(`convert?q=${de_para}&compact=ultra&apiKey=42be2a924ef783a2fde4`);
        let cotacao = response.data[de_para];

        let resultado = (cotacao * parseFloat(this.state.moedaB_valor));

        this.setState({
            valorConvertido: resultado.toFixed(2)
        });
        Keyboard.dismiss();

    }

    render(){
        //const {moedaA, moedaB} = this.props

        let moedasItems = this.state.moedas.map( (v, index) => {
            return <Picker.Item key={index} value={index} label={v.valor} />
         }) 

        return(
            
                <View style={styles.container}>

                    <Text style={styles.titulo}>Conversor de Moedas</Text>

                    

                    <View style={styles.container}>
                        <View style={styles.pickers}>
                        
                            <Picker
                                selectedValue={this.state.moedaA}
                                style={{ height: 50, width: 100 }}
                                onValueChange={(itemValue, itemIndex) => this.setState( { moedaA: itemValue } )}
                            >
                                {moedasItems}
                            </Picker>                   

                            <Text style={styles.description}>PARA</Text>
                            
                            <Picker
                                selectedValue={this.state.moedaB}
                                style={{ height: 50, width: 100, marginLeft: 15 }}
                                onValueChange={(itemValue, itemIndex) => this.setState( { moedaB: itemValue } )}
                            >
                                {moedasItems}
                            </Picker>    
                        
                        </View>

                        <View >
                            <Text style={{ fontSize: 20, marginTop: 20 }}>Converter 
                                <Text style={{ fontWeight: 'bold' }}> {this.state.moedas[this.state.moedaA].name} </Text>
                                para 
                                <Text style={{ fontWeight: 'bold' }}> {this.state.moedas[this.state.moedaB].name} </Text>
                            </Text>
                        </View>
                
                        <TextInput 
                            placeholder="Valor a ser convertido"
                            style={styles.areaInput}
                            onChangeText={ (moedaB_valor) => this.setState({moedaB_valor}) }
                            keyboardType="numeric"
                        />
                        <TouchableOpacity style={styles.botaoArea} onPress={this.converter}>
                            <Text style={styles.botaoTexto}>Converter</Text>
                        </TouchableOpacity>

                        <Text style={styles.valorConvertido}>
                            {(this.state.valorConvertido === 0) ? '' : this.state.valorConvertido}
                        </Text>
                    </View>
            
            
                </View>
           
        );
    }
} 
const styles = StyleSheet.create({

    container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titulo:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        justifyContent: "flex-start",
        marginTop: 20
    },
    description:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        paddingTop: 15
    },
    pickers:{
        justifyContent: 'space-around',
        flexDirection: 'row',
    },

    areaInput:{
        width: 280,
        height: 45,
        backgroundColor: '#CCC',
        textAlign: 'center',
        marginTop: 15,
        fontSize: 20,
        color: '#000',
        borderRadius: 5,
    },
    botaoArea:{
        width: 150,
        height: 45,
        backgroundColor: '#FF0000',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    botaoTexto:{
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FFF',
    },
    valorConvertido:{
        fontSize: 36,
        fontWeight: 'bold',
        color: '#000',
        marginTop: 15,
    }
  });


export default Conversor;