import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, ScrollView, Fontsize, StatusBar} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'; // Select List
import RadioGroup from 'react-native-radio-buttons-group'; //  Botões de select
import * as ImagePicker from 'expo-image-picker'; //Img picker
import Header from '../../components/Header'; //Header

export default function App() {
    const [selected, setSelected] = useState("");
    const [imageUri, setImageUri] = useState(null);
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

    const handleSelectImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permissão Necessária', 'Precisamos da sua permissão para acessar a galeria.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    return (
        <ScrollView>
            <Header title="" onMenuPress={() => console.log('Menu pressionado')} />

            <View style={styles.container}>
                <Text style={styles.title}>Cadastro de produtos</Text>

                <View style={styles.vimagepicker}>
                    <TouchableOpacity style={styles.imagePicker} onPress={handleSelectImage}>
                        {imageUri ? (
                            <Image source={{ uri: imageUri }} style={styles.previewImage} />
                        ) : (
                            <Image
                                source={require('../../assets/images/iconeuploadarquivos.jpg')}//Path para o icone
                                style={styles.placeholderImage}
                            />
                        )}
                    </TouchableOpacity>
                </View>
                <Text style={styles.subTitle}>Nome do produto:</Text>
                <TextInput style={styles.input} />

                <Text style={styles.subTitle}>Selecione uma categoria:</Text>
                <SelectList
                setSelected={(val) => setSelected(val)}
                data={data}
                save="value"
                boxStyles={styles.dropdown}
                SelectList={styles.selectLi}
                />
                {/* Botão  */}
                <Text style={styles.subTitle}>Preço:</Text>
                <TextInput style={styles.input} 
                placeholder="R$: "
                keyboardType="numeric"
                placeholderTextColor="#888"
                />

                <Text style={styles.subTitle}>Selecione a unidade de medida para a venda:</Text>
                <RadioGroup
                radioButtons={radioButtons}
                onPress={(buttonsArray) => setRadioButtons(buttonsArray)}
                containerStyle={styles.radioGroup}
                />

                {/* Texto valor mínimo */}
                <Text style={styles.subTitle}
                >Valor mínimo por venda:</Text>
                <TextInput style={styles.inputPreco} 
                placeholder="R$: "
                keyboardType="numeric"
                placeholderTextColor="#888"
                />

                {/* Texto valor máximo */}
                <Text style={styles.subTitle}
                >Valor máximo por venda:</Text>
                <TextInput style={styles.inputPreco} 
                placeholder="R$: "
                keyboardType="numeric"
                placeholderTextColor="#888"
                />

                {/* Botão Enviar */}
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontWeight:"bold",
        marginLeft: 45,
        marginTop: 25,
        fontSize: 30,
        marginBottom: 25,
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 8,
        marginBottom: 25,
        borderRadius: 6,
    },
    inputPreco: {
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
        flexDirection: 'row',
        marginBottom: 20,
    },
    subTitle: {
        fontSize: 17,
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
    imagePicker: {
        width: 200,
        height: 200,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        borderRadius: 10,
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderWidth: 1,
        borderRadius: 3,
    },
    previewImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderWidth: 1,
        borderRadius: 3,
    },
    vimagepicker: {
        flex: 1,
        alignContent: "center",
        alignItems: "center",
    }
});
