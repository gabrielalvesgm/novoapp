import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'; // Select List
import * as ImagePicker from 'expo-image-picker';   // Img picker
import Header from '../../components/Header';       // Header
import SideMenu from '../../components/sideMenu';  // Botão SideMenu

export default function App() {
    const [selected, setSelected] = useState("");   // useState p categorias
    const [imageUri, setImageUri] = useState(null); // useState para imagePicker
    const [value, setValue] = useState('');         // useState para o preço.
    const [isMenuVisible, setIsMenuVisible] = useState(false); // useState para o menu

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    const data = [ // ''dados'' do dropdownlist
        { key: '1', value: 'Fruta' },
        { key: '2', value: 'Vegetal' },
        { key: '3', value: 'Carne' },
        { key: '4', value: 'Grão' },
        { key: '5', value: 'Tempero' },
        { key: '6', value: 'Lanche' },
    ];

    const handleSubmit = () => { // Alerta de cadastro.
        Alert.alert('Formulário Enviado', 'Seu cadastro foi enviado com sucesso!');
    };

    const handleSelectImage = async () => { // Função que pede permissão para o usuário e suas variáveis.
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

    const handlePriceChange = (text) => { //Formatador para R$:REAL

        //não sei explicar
        const numericValue = text.replace(/\D/g, '');
        
        //func que formata Str(numeriValue) para Number, divide por 100 (2 casas decimais e repõe ponto por vírgula)
        const formattedValue = (Number(numericValue) / 100).toFixed(2).replace('.', ',');
        setValue(formattedValue);
    };

    const mostrarBarraMenu = () => { //Função chamar Menu
        setIsMenuVisible(!isMenuVisible);
    };

    return (
        <ScrollView>
            <Header title="" onMenuPress={mostrarBarraMenu} />

            {/* Renderizar SideMenu apenas se isMenuVisible for true */}
            {isMenuVisible && <SideMenu />}

            <View style={styles.container}>

                <Text style={styles.title}>Cadastro de produtos</Text>

                <View style={styles.vimagepicker}>

                    <TouchableOpacity style={styles.imagePicker} onPress={handleSelectImage}>
                        {imageUri ? (
                            <Image source={{ uri: imageUri }} style={styles.previewImage} />
                        ) : (
                            <Image
                                source={require('../../assets/images/iconeuploadarquivos.png')} // Path para o ícone
                                style={styles.placeholderImage}
                            />
                        )}
                    </TouchableOpacity>
                </View>

                <Text style={styles.subTitle}>Nome do produto:</Text>
                <TextInput style={styles.input}
                    placeholder="Ex: Manga Espada"
                />

                <Text style={styles.subTitle}>Categoria:</Text>
                <SelectList
                    setSelected={(val) => setSelected(val)}
                    data={data}
                    save="value"
                    boxStyles={styles.dropdown}
                    placeholder="Escolha uma categoria"
                />

                <Text style={styles.subTitle}>Preço do produto por Kg:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="R$ 0,00"
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                    value={value}
                    onChangeText={handlePriceChange}
                />

                <Text style={styles.subTitle}>Observação:</Text>
                <TextInput
                    style={styles.ObsBox}
                    multiline
                    placeholder={"Crie uma breve descrição do seu produto.\nEx: Temos manga verde, madura e inchada"}
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Cadastrar!</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.helpButton} onPress={() => console.log('Help Button diz Hello World')}>
                    <Text style={styles.helpButtonText}>Ajuda ℹ️</Text>
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
        fontWeight: "bold",
        marginLeft: 45,
        marginTop: 25,
        fontSize: 30,
        marginBottom: 25,
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
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
    subTitle: {
        fontSize: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 15,
        marginTop: 20,
        marginLeft: 70,
        marginRight: 70,
    },
    buttonText: {
        color: 'white',
        fontSize: 25,
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
    },
    ObsBox: {
        height: 120,
        boxSizing: "border-box",
        textAlignVertical: 'top',
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 25,
        borderRadius: 6,
    },
    helpButton: {
        marginTop:5,
        backgroundColor: '#e3e3ff',
        height:25,
        borderRadius: '30%',
        marginLeft: 130,
        marginRight: 130,
    },
    helpButtonText: {
        textAlign:'center',
    }
});
