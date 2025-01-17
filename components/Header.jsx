import React from 'react';
import { View, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({ title, onMenuPress }) => {
    return (
        <>
            <StatusBar backgroundColor="#7D837B"/>
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton} onPress={onMenuPress}>
                    <Icon name="menu" size={35} color="#000" />
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#B2FC97',
        paddingTop: StatusBar.currentHeight,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        height: 75,
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuButton: {
        marginLeft: 10,
    },
    statusbar: {
        backgroundColor: "#7D837B",
    }
});
export default Header;
