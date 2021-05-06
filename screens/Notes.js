import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native'


const Notes = ({ route, navigation }) => {

    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');

    const mail = route.params.mail
    const address = `http://10.0.2.2:5000/notes/${mail}`

    const isFocused = useIsFocused()
    const [value, setValue] = useState('');

    const addNote = () => {
        fetch(address, {// 10.0.2.2
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mail: mail,
                title: title,
                note: note
            }),
        }).then(setValue(value + 1))
    }

    useEffect(() => {
        fetch(address)
            .then(res => res.json())
            .then(data => {
                setData(data);
            })
    }, [value, isFocused])

    return (
        <View style={styles.container}>
            <TextInput placeholder='Note Title'
                defaultValue={title}
                onChangeText={title => setTitle(title)}
                style={styles.inputTitle}
            />
            <TextInput
                multiline={true}
                placeholder='Write new note!'
                style={styles.inputNote}
                defaultValue={note}
                onChangeText={note => setNote(note)}
            />
            <TouchableOpacity onPress={() => addNote()} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add Note!</Text>
            </TouchableOpacity>
            <FlatList
                data={data}
                keyExtractor={item => item.note}
                renderItem={({ item }) =>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('NoteDetails', { mail: mail, title: item.title, note: item.note })}
                        style={styles.noteContainer}>
                        <Text style={styles.titleStyle}>{item.title.length > 30 ? item.title.slice(0, 30) + '...' : item.title}</Text>
                        <Text style={styles.noteStyle}>{item.note.length > 38 ? item.note.slice(0, 38) + '...' : item.note}</Text>
                    </TouchableOpacity>
                }
            />
        </View>
    )
}

export default Notes;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        top: '2%',
        marginBottom: 20,
        marginHorizontal: 10,
    },
    inputTitle: {
        height: '5%',
        textAlign: 'center',
        width: '100%',
        borderWidth: 2,
    },
    inputNote: {
        borderWidth: 3,
        marginTop: 4,
        height: '10%',
        textAlign: 'center',
        width: '100%',
    },
    addButton: {
        marginTop: 15,
        width: '100%',
        height: 50,
        backgroundColor: "#32a852",
        borderRadius: 50,

    },
    addButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
    },
    listContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    noteContainer: {
        width: '95%',
        marginTop: '3%',
    },
    titleStyle: {
        fontSize: 24,
        borderTopWidth: 1,
        borderTopColor: '#1f3347',
    },
    noteStyle: {
        fontSize: 18,
    }
})
