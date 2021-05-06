import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const NoteDetails = ({ route, navigation }) => {

    const deleteNote = () => {
        fetch(`http://10.0.2.2:5000/note/${route.params.note}`, {
            method: 'DELETE',
        }).then(navigation.goBack())
    }

    return (
        <View style={styles.container}>
            <View style={styles.detailContainer}>
                <Text style={styles.titleText}> {route.params.title} </Text>
                <Text style={styles.noteText}> {route.params.note} </Text>
            </View>
            <TouchableOpacity onPress={() => deleteNote()}>
                <Text style={styles.deleteNoteText}>X</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NoteDetails;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailContainer: {
        width: '80%',
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    noteText: {
        fontSize: 20,
        fontWeight: '500',
    },
    deleteNoteText: {
        color: 'red',
        fontSize: 36
    }
})
