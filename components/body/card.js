import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function CardsTodo({elt, onPress, onLongPress}) {
  return (
    <TouchableOpacity style={s.container} onPress={() => onPress(elt)} onLongPress={() => onLongPress(elt)}> 
        <Text style={[s.title, elt.isCompleted && {textDecorationLine: "line-through"}]}>{elt.title}</Text>
        { 
          elt.isCompleted && 
          <Image 
            source={require('../../assets/check.png')}
            style={{width: 50}}
            resizeMode='contain'
          >
          </Image>
        }
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    borderRadius: '20px', 
    paddingHorizontal: 10,
    marginBottom: 20,
    /* Shadow from  https://ethercreative.github.io/react-native-shadow-generator/*/
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  title: {
    fontFamily: "Cochin",
    fontSize: 20
  }
});