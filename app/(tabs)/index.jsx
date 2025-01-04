import {View, Text, StyleSheet} from 'react-native'

export default function App(){
    return(
      <View style={styles.container}>
        <Text>Olá Mundo!</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#FFFFFF"
    }
})