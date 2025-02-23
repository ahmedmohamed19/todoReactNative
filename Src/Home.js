import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';


export default function Home() {
    const { navigate } = useNavigation()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState('All');
    const [addUpdateBtn, setAddUpdateBtn] = useState('add');
    const [editingId, setEditingId] = useState(null);



    useEffect(() => {
        const loadTodos = async () => {
            const storedTodos = await AsyncStorage.getItem('todos');
            if (storedTodos) {
                setTodos(JSON.parse(storedTodos));
            }
        };
        loadTodos();
    }, []);

    useEffect(() => {
        const saveTodos = async () => {
            await AsyncStorage.setItem('todos', JSON.stringify(todos));
        };
        saveTodos();
    }, [todos]);

    const addTodo = () => {
        if (title.trim() === '' || description.trim() === '') {
            alert('Please enter a title and description');
            return;
        }
        const nextId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 0;
        const newTodo = { id: nextId, title, description, completed: false };

        setTodos([...todos, newTodo]);
        setTitle('');
        setDescription('');
    };

    const toggleComplete = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };
    const update = (id) => {
        setEditingId(id)
        setAddUpdateBtn('update')
        const updateTodo = todos.filter(todo => todo.id === id)
        console.log(updateTodo);

        const { title, description } = updateTodo[0]
        setTitle(title);
        setDescription(description);
    };
    const updateTodo = () => {
        setAddUpdateBtn('add')
        setTodos(todos.map(todo =>
            todo.id === editingId ? { ...todo, title, description } : todo
        ));
        setTitle('');
        setDescription('');
    };


    const filteredTodos = todos.filter(todo => status === 'All' ? true : status === 'Done' ? todo.completed : !todo.completed);
    // const filteredTodos = todos.filter(todo => {
    //   if (status === 'All') return true;
    //   if (status === 'Done') return todo.completed;
    //   if (status === 'In Progress') return !todo.completed;
    // });

    return (
        <SafeAreaView style={styles.container}>

            <View style={{ width: '100%', height: '100%' }}>
                <ImageBackground source={require('../assets/tt.jpg')} style={styles.image} resizeMode="cover">
                    <Text style={styles.h1}>TODO List</Text>

                    <TextInput
                        style={[styles.input, styles.margin]}
                        onChangeText={setTitle}
                        value={title}
                        placeholder="Enter Todo Title"
                    />
                    <TextInput
                        style={[styles.input, styles.margin]}
                        onChangeText={setDescription}
                        value={description}
                        placeholder="Enter Todo Description"
                    />
                    {addUpdateBtn == 'add' ? <TouchableOpacity style={[styles.button, styles.margin]} onPress={addTodo}>
                        <Text style={styles.inputText}>ADD</Text>
                    </TouchableOpacity> : <TouchableOpacity style={[styles.button, styles.margin]} onPress={updateTodo}>
                        <Text style={[styles.inputText, styles.updateButton]}>Update</Text>
                    </TouchableOpacity>}



                    <View style={styles.flex}>
                        <TouchableOpacity style={[styles.button, status === 'All' && styles.activeButton]} onPress={() => setStatus('All')}>
                            <Text style={styles.inputText}>All</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, status === 'Done' && styles.activeButton]} onPress={() => setStatus('Done')}>
                            <Text style={styles.inputText}>Done</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, status === 'In Progress' && styles.activeButton]} onPress={() => setStatus('In Progress')}>
                            <Text style={styles.inputText}>In Progress</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={filteredTodos}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={[styles.todoItem, item.completed && styles.completed]}>
                                <View style={styles.flex}>
                                    <TouchableOpacity onPress={() => toggleComplete(item.id)} >
                                        {item.completed ? <AntDesign name="checkcircleo" size={24} color="black" /> : <MaterialIcons name="radio-button-unchecked" size={24} color="black" />}

                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigate('TodoDetails', { item })} >
                                        <Text style={[styles.todoText, item.completed && styles.completedText]}>
                                            {item.title}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.flex}>
                                    <TouchableOpacity onPress={() => update(item.id)}>
                                        <Text style={styles.updateButton}>Update</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                                        <Text style={styles.deleteButton}>❌</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        )}
                    />

                    <StatusBar style="auto" />
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    h1: {
        textAlign: 'center',
        fontSize: 50,
        fontWeight: '900',
        color: 'white',
        paddingVertical: 20,
    },
    container: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    margin: {
        margin: 12,
    },
    input: {
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'white',
        padding: 10,
        backgroundColor: 'white',
        fontSize: 20,
    },
    button: {
        padding: 15,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'white',
        alignItems: 'center',
    },
    activeButton: {
        backgroundColor: '#007BFF',
        borderColor: '#0056b3',
    },
    inputText: {
        color: 'white',
        fontSize: 20,
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 15,
        marginVertical: 5,
        borderRadius: 8,
    },
    todoText: {
        fontSize: 18,
        color: 'white',
    },
    completed: {
        backgroundColor: 'rgba(0, 255, 0, 0.3)',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#aaa',
    },
    deleteButton: {
        fontSize: 18,
        color: 'red',
    },
    updateButton: {
        fontSize: 18,
        color: 'orange',
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
});
