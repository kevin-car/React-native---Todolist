import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export default function Footer({elts, bottomMenu, setBottomMenu}) {



    const countByStatus = elts.reduce((acc, item) => {
        item.isCompleted ? acc.done++ : acc.inProgress++;
        return acc;
    }, {all: elts.length, inProgress: 0, done: 0} )

    console.log(countByStatus)
    const editBottomMenu = (menuName) => {
        /* Je créé une copie du state */
        const newMenu = { ...bottomMenu }
        /* Je mets toutes les valeurs à faux, sauf celui qui a été cliqué */
        for (const key in newMenu) newMenu[key] = false;
        newMenu[menuName] = true
        /* Je renvoi le nouveau tableau à mon state */
        setBottomMenu(newMenu)
    }


    return (
        <View style={s.container}>
            <TouchableOpacity style={[s.tab, ]} onPress={() => editBottomMenu('all') }>
                <Text style={[s.text, bottomMenu.all && {color: 'blue'}]}>All ({countByStatus.all})</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.tab} onPress={() => editBottomMenu('inProgress') }>
                <Text style={[s.text, bottomMenu.inProgress && {color: 'blue'}]}>In Progress ({countByStatus.inProgress})</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.tab} onPress={() => editBottomMenu('done') }>
                <Text style={[s.text, bottomMenu.done && {color: 'blue'}]}>Done ({countByStatus.done})</Text>
            </TouchableOpacity>
        </View>
    );
}

const s = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#eaeaea',
        display: 'flex', 
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-evenly', 
        /* shadow made by : https://ethercreative.github.io/react-native-shadow-generator/ */
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    }, 
    tab: {
        flex: 3, 
    }, 
    text: {
        textAlign: 'center',
        fontWeight: 'bold',

    }
});