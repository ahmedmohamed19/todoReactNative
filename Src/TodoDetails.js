import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoDetails = () => {
    const [mode, setMode] = useState('dark')
    const route = useRoute();
    const { item } = route.params;
    const { description, title } = item;


    useEffect(() => {
        const checkMode = async () => {
            const prevMode = await AsyncStorage.getItem('mode');
            if (prevMode) {
                setMode(JSON.parse(prevMode));
            }
        };
        checkMode();
    }, []);

    useEffect(() => {
        const newMode = async () => {
            await AsyncStorage.setItem('mode', JSON.stringify(mode));
        };
        newMode();
    }, [mode]);
    function changeMode() {
        mode == 'dark' ? setMode('light') : setMode('dark')
    }
    return (
        <View style={mode === 'dark' ? styles.darkContainer : styles.lightContainer}>

            <TouchableOpacity style={styles.mode} onPress={changeMode}>
                {mode == 'dark' ? <MaterialIcons name="light-mode" size={24} color="yellow" /> : <MaterialIcons name="dark-mode" size={24} color="dark" />}
            </TouchableOpacity>

            <View style={mode === 'dark' ? styles.darkCard : styles.lightCard}>
                <Text style={mode === 'dark' ? styles.darkTitle : styles.lightTitle}>{title}</Text>
                <Text style={mode === 'dark' ? styles.darkDescription : styles.lightDescription}>{description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    darkContainer: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    lightContainer: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    darkCard: {
        backgroundColor: '#1E1E1E',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
    },
    lightCard: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
    },
    darkTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFD700',
        textAlign: 'center',
        marginBottom: 10,
    },
    lightTitle: {  // ✅ إصلاح الخطأ الإملائي
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: 10,
    },
    lightDescription: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
    },
    darkDescription: {
        fontSize: 18,
        color: '#CCC',
        textAlign: 'center',
    },
    mode: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default TodoDetails;