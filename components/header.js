import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default function Header() {
  return (
    <View style={s.header}>
        <Image 
            source={require('../assets/todologo.jpg')}
            style={{ width: 170, height: 80}}
            resizeMode='contain'
        >
        </Image>
        <Text style={s.text}> Liste de tâches de Kevin </Text>
    
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: 'column',
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  text: {
    fontSize: 30, 
    fontFamily: "Cochin",

}
});