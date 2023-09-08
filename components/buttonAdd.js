import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function ButtonAdd({onPress}) {
  return (
        <TouchableOpacity style={s.btn} onPress={onPress}>
            <Text style={s.txt}>Nouvelle tâche</Text>
        </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  btn: {
    position: 'absolute',
    bottom: 65, 
    right: 20, 
    width: 150,
    backgroundColor: '#c2DAFF',
    /* Shadow from  https://ethercreative.github.io/react-native-shadow-generator/*/
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  }, 
  txt: {
    color: 'blue', 
    fontWeight: 'bold', 
    fontSize: 12, 
    paddingHorizontal: 30,
    paddingVertical: 15,

  }
});