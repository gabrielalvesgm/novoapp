import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import RadioGroup from 'react-native-radio-buttons-group'; // Importando a biblioteca

export default function App() {
    const [selected, setSelected] = useState("");
    const [radioButtons, setRadioButtons] = useState([
        { id: '1', label: 'Kilograma (Kg)', value: 'Kg', selected: true },
        { id: '2', label: 'Grama (g)', value: 'g' },
    ]);

    const data = [
        { key: '1', value: 'Fruta' },
        { key: '2', value: 'Vegetal' },
        { key: '3', value: 'Carne' },
        { key: '4', value: 'Grão' },
        { key: '5', value: 'Tempero' },
        { key: '6', value: 'Lanche' },
    ];

    const handleSubmit = () => {
        Alert.alert('Formulário Enviado', 'Seu cadastro foi enviado com sucesso!');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de produtos</Text>
            
            <Text style={styles.subTitulo}>Nome do produto:</Text>
            <TextInput style={styles.input} />

            <Text style={styles.subTitulo}>Selecione uma categoria:</Text>
            <SelectList
                setSelected={(val) => setSelected(val)}
                data={data}
                save="value"
                boxStyles={styles.dropdown}
                SelectList={styles.selectLi}
            />
            
            <Text style={styles.subTitulo}>Preço:</Text>
            <TextInput style={styles.input} />

            <Text style={styles.subTitulo}>Selecione a unidade de medida para a venda:</Text>
            <RadioGroup
                radioButtons={radioButtons}
                onPress={(buttonsArray) => setRadioButtons(buttonsArray)}
                containerStyle={styles.radioGroup}
            />

            <Text style={styles.subTitulo}>Valor mínimo por venda:</Text>
            <TextInput style={styles.input} />

            <Text style={styles.subTitulo}>Valor máximo por venda:</Text>
            <TextInput style={styles.input} />
            
            {/* Botão Enviar */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        marginLeft:45,
        marginTop: 25,
        fontSize: 25,
        marginBottom: 25,
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 8,
        marginBottom: 25,
        borderRadius: 6,
    },
    dropdown: {
        borderColor: '#000',
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 6,
        padding: 6,
    },
    radioGroup: {
        flexDirection: 'row', // Coloca os botões lado a lado
        marginBottom: 20,
    },
    subTitulo: {
        fontSize:17,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
