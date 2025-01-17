import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SideMenu = () => {
  return (
    <View style={styles.Menucontainer}>
      <Text style={styles.MenuText}>Hello World!</Text>
    </View>
  );
};

const styles = StyleSheet.create ({
    MenuContainer: {
        flex: 1,
        backgroundColor:"#ffffff",
        justifyContent: "center",
        alignItems: "center",
        width:"50%",
    },
    MenuText:{
        fontSize:20,
    }
})

export default SideMenu;