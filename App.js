import React , { Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default class App extends Component {
    constructor(){
        super()
        this.state = {
            resultText: "",
            calculationText: ""
        }
        this.operations = ['AC','+','-','*','/']
    }
    calculateResult(){
        const text = this.state.resultText
        this.setState({
            calculationText: eval(text)
        })
        this.setState({resultText: ''})
    }
    Validate(){
        const text = this.state.resultText
        switch(text.slice(-1)){
            case '+':  
            case '-': 
            case '*': 
            case '/':
                return false
        }
        return true
    }
    buttonPressed(text){
        if(text == '='){
            return this.Validate() && this.calculateResult()
        }
        this.setState({
            resultText: this.state.resultText+text
        })
    }
    operate(op){
        switch(op){
            case 'AC':
                this.setState({
                    resultText: '',
                    calculationText: ''
                })
                break
            case '+':  
            case '-': 
            case '*': 
            case '/':
                const lastchar = this.state.resultText.split('').pop()
                if(this.operations.indexOf(lastchar) > 0) return
                if(this.state.resultText == "" ) return
                this.setState({
                    resultText: this.state.resultText + op
                })
                break
        }
    }

    render() {
        let rows = []
        let nums = [[1,2,3],[4,5,6],[7,8,9],['.',0,'=']]
        let row = []
        let ops = []

        for(let i = 0;i < 4;i++){
            row = []

            for(let j = 0;j < 3;j++){
                row.push(<TouchableOpacity onPress={() =>  this.buttonPressed(nums[i][j])} style={styles.btn}>
                <Text style={styles.btntext}>{nums[i][j]}</Text>
                </TouchableOpacity>) 
            }
            rows.push(<View style={[styles.row ]}>{row}</View>)
        }
  
        for(let i = 0;i < 5;i++){
            ops.push(<TouchableOpacity style={styles.btn} onPress={() => this.operate(this.operations[i])}>
            <Text style={[styles.btntext, styles.white]}>{this.operations[i]}</Text>
            </TouchableOpacity>) 
        }

        return (
            <View style={styles.container}>
            <View style={styles.result}>
            <Text style={styles.resultText}>{this.state.resultText}</Text>
            </View>
            <View style={styles.calculation}>
            <Text style={styles.calculationText}>{this.state.calculationText}</Text>
            </View>
            <View style={styles.buttons}>
            <View style={styles.numbers}>
                {rows}
            </View>
            <View style={styles.operations}>
                {ops}
            </View>
            </View>
            </View>
        )
    }
 }
 
const styles = StyleSheet.create({
    container:{
        flex:1
    },

    resultText: {
        fontSize: 30,
        color: 'white'
    },

    btn:{
        flex:1,
        alignItems:'center',
        alignSelf:'stretch',
        justifyContent: 'center'
    },

    white:{
        color:'white',
    },
  
    btntext:{
        fontSize: 30,
        color:'white',
    },

    calculationText: {
        fontSize: 24,
        color: 'white'
    },

    row:{
        flexDirection: 'row',
        flex:1,
        justifyContent: 'space-around',
        alignItems:'center'
    },

    result:{
        flex:2,
        backgroundColor: '#575757',
        justifyContent: 'center',
        alignItems:'flex-end'
    },

    calculation:{
        flex:1,
        backgroundColor: '#333333',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },

    buttons:{
        flex:7,
        flexDirection: 'row'
    },

    numbers:{
        flex:3,
        backgroundColor: '#66a1ff'
    },

    operations:{
        flex:1,
        justifyContent: 'space-around',
        alignItems: 'stretch',
        backgroundColor: '#1966e3'
    },

 });