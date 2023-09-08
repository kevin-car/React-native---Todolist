import {React, useState} from 'react';
import { Text, View, StyleSheet,  } from 'react-native';
import CardsTodo from './card';

export default function Body({elts, setElts, deleteTodo, fullElts}) {
  console.log("element arrivés dans body", elts)
    const updateTodo = (todo) => {
        /* Je créé un nouvel objet avec la valeur du isCompleted inversée */
        const eltUpdated = {
            ...todo, 
            isCompleted: !todo.isCompleted
        }

        /* JE trouve la position de l'élément à changer */
        const indexToReplace = fullElts.findIndex(elt => elt.id === eltUpdated.id)

        /*  Je remplace l'élément à son index */
        const updatedTodoList = [...fullElts]
        updatedTodoList[indexToReplace] = eltUpdated
        setElts(updatedTodoList)
    }


    const myElts = () => {
        return elts.map((el, index) => (
             <CardsTodo onLongPress={deleteTodo} key={index} onPress={updateTodo} elt={el}/>
        ))
    } 

  return (
    <View style={s.container}>
        {myElts()}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  }
});