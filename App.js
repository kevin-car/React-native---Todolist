import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Text, View, Alert, StyleSheet } from "react-native";
import Header from "./components/header";
import Body from "./components/body/body";
import Footer from "./components/footer/footer";
import { React, useEffect, useState } from 'react';
import ButtonAdd from "./components/buttonAdd";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid"
import AsyncStorage from "@react-native-async-storage/async-storage"
export default function App() {

/*  Liste de tâches Pleine */
  const [elts, setElts] = useState([
    {id: 0, title: 'sortir le chien', isCompleted: true},
    {id: 1, title: 'Aller faire les courses', isCompleted: true},
    {id: 2, title: 'Faire du sport', isCompleted: false},
    {id: 3, title: 'Cuisiner', isCompleted: true},
])

/* Les status des filtres du footer */
const [ bottomMenu, setBottomMenu] = useState({
  all: true, 
  inProgress: false,
  done: false,
})

const [isAddDialogVisible, setisAddDialogVisible] = useState(false)
const [inputValue, setInputValue] = useState('')

const eltsFiltered = () => {
    if(bottomMenu.all === true) return elts
    if(bottomMenu.inProgress === true) return elts.filter(elt => !elt.isCompleted)
    if(bottomMenu.done === true) return elts.filter(elt => elt.isCompleted)
  }


  const deleteTodo = (todoToDelete) => {
    console.log('todo ', todoToDelete)
    Alert.alert('suppression', "supprimer cette tache ?", [
      {
        text: "Supprimer", 
        style: "destructive", 
        onPress: () => {  
          setElts(elts.filter((elt) => elt.id !== todoToDelete.id)) 
          console.log(elts);
        }
      }, {
        text: "Annuler", 
        style: "cancel"
      }
    ])
  }

  const showAddDialog = () => {
    setisAddDialogVisible(true);
  }

  const addTodo = () => {
    const newTodo = {
      title: inputValue, 
      isCompleted: false, 
      id: uuid.v4(),
    }
    setElts([
      ...elts, 
      newTodo
    ])
  }


/* Données stockées dans le local storage de react native  */
const  saveTodoList =  async () => {
  try{
    await AsyncStorage.setItem("@todoList", JSON.stringify(elts))
  } catch(e){
    alert("Error saving" + e)
  }
}


const loadTodoList = async () => {
  try{
    const stringifiedItems = await AsyncStorage.getItem("@todoList");
    if(stringifiedItems !== null ) {
      const parsedTodolist = JSON.parse(stringifiedItems)
      setElts(parsedTodolist)
    }
  } catch(e){
    alert("Error saving" + e)
  }
}

useEffect(() => {
  loadTodoList();
}, []);

useEffect(() => {
  saveTodoList()
},[elts]) 

  return (
    <>
      <SafeAreaProvider >
        <SafeAreaView style={{ backgroundColor:"#f9f9f9", flex: 1 }}>
          <View style={s.header}> 
            <Header></Header>
          </View>
          <View style={s.body}> 
            <Body
              elts={eltsFiltered()}
              setElts={setElts}
              deleteTodo={deleteTodo}
              fullElts={elts}
            />
          </View>

          <ButtonAdd
            onPress={showAddDialog}
          />
          <Dialog.Container visible={isAddDialogVisible} onBackdropPress={() => setisAddDialogVisible(false) }>
            <Dialog.Title> Créer une Tâche</Dialog.Title>
            <Dialog.Description>Tape le nom de ta nouvelle tâche</Dialog.Description>
            <Dialog.Input onChangeText={setInputValue} />
            <Dialog.Button disabled={inputValue.trim().length === 0} label='créer' onPress={ addTodo } />
          </Dialog.Container>
        </SafeAreaView>
      </SafeAreaProvider>
      <View  style={s.footer}> 
        <Footer
          elts={elts}
          bottomMenu={bottomMenu}
          setBottomMenu={setBottomMenu}
        />
    </View>
    </>
  );
}


const s = StyleSheet.create({
  header: {
    flex: 2, 
  },
  body: {
    flex: 4,  
  },
  footer: {
    height: 100,
    bottom: 0
  }
})

