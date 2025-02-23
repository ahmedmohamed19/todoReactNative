import { View, Text } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';


const TodoDetails = () => {
    const route = useRoute();
    const { item } = route.params;
    const { description, title } = item;

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    );
};
const styles = {
    container: {
        flex: 1,
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    card: {
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFD700',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 18,
        color: '#CCC',
        textAlign: 'center',
    },
};

export default TodoDetails;
