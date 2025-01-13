import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'; // lista de seleção.
import RadioGroup from 'react-native-radio-buttons-group'; // Botões de seleção.
import * as ImagePicker from 'expo-image-picker'; // Expo Image Picker

export default function App() {
    const [selected, setSelected] = useState("");
    const [imageUri, setImageUri] = useState(null); // Estado para armazenar a URI da imagem selecionada
    const [radioButtons, setRadioButtons] = useState([
        { id: '1', label: 'Kilograma (Kg)', value: 'Kg', selected: true },
        { id: '2', label: 'Grama (g)', value: 'g' },
    ]);

    const data = [ // lista de seleção.
        { key: '1', value: 'Fruta' },
        { key: '2', value: 'Vegetal' },
        { key: '3', value: 'Carne' },
        { key: '4', value: 'Grão' },
        { key: '5', value: 'Tempero' },
        { key: '6', value: 'Lanche' },
    ];

    const handleSubmit = () => { // Alerta do botão de enviar.
        Alert.alert('Formulário Enviado', 'Seu cadastro foi enviado com sucesso!');
    };

    const handleSelectImage = async () => {
        // Solicitar permissão para acessar a galeria
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permissão Necessária', 'Precisamos da sua permissão para acessar a galeria.');
            return;
        }

        // Abrir a galeria para selecionar uma imagem
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1, // Qualidade máxima
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri); // Salvar a URI da imagem selecionada
        }
    };

    return (

        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de produtos</Text>

            {/* Botão que abre a galeria e exibe a preview se houver uma imagem */}
            <View style={styles.vimagepicker}>
            <TouchableOpacity style={styles.imagePicker} onPress={handleSelectImage}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.previewImage} />
                ) : (
                    <Image
                            source={require('../../assets/images/iconeuploadarquivos.jpg')} // Caminho da imagem ilustrativa
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
            <TextInput style={styles.input} />

            <Text style={styles.subTitle}>Selecione a unidade de medida para a venda:</Text>
            <RadioGroup
                radioButtons={radioButtons}
                onPress={(buttonsArray) => setRadioButtons(buttonsArray)}
                containerStyle={styles.radioGroup}
            />

            {/* Texto valor máximo */}
            <Text style={styles.subTitle}>Valor mínimo por venda:</Text>
            <TextInput style={styles.input} />


            {/* Texto valor máximo */}
            <Text style={styles.subTitle}>Valor máximo por venda:</Text>
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
        marginLeft: 45,
        marginTop: 25,
        fontSize: 25,
        marginBottom: 10,
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
        width: 130,
        height: 130,
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
        flex:1,
        alignContent:"center",
        alignItems:"center",
        
    }
});
