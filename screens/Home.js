import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';

export default function Home({ navigation }) {
    //const [data, setData] = useState([]);
    //const [value, setValue] = useState(0);

    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const pressed = () => {
        //async await 
        fetch('http://10.0.2.2:5000/hello', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                mail: mail,
                password: password,
            }),
        }).then(res => (res.json()))
            .then(data => {
                data.success == 'true' ? navigation.navigate('Notes', { mail: mail })
                    : Alert.alert('Wrong password or mail.')
            })

        // jwt token 
        //navigate payload : id
    }

    /*useEffect(() => {
        fetch('http://10.0.2.2:5000/hello')// kendi ip adresimi yazıcam.
            .then(res => res.json())
            .then(data => setData(data))
    }, [value])*/

    return (
        <View style={styles.container}>
            <Text style={{ bottom: '15%', fontSize: 46, fontWeight: 'bold' }}>Ploud</Text>
            <TextInput style={styles.input} placeholder='Email' defaultValue={mail} onChangeText={mail => setMail(mail)} />
            <TextInput secureTextEntry={true} style={styles.input} placeholder='Password' defaultValue={password} onChangeText={password => setPassword(password)} />
            <TouchableOpacity style={styles.button} onPress={() => pressed()}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#b7b1ba',
    },
    input: {
        height: 40,
        width: 250,
        backgroundColor: 'white',
        marginTop: 15,
        borderRadius: 20,
        textAlign: 'center',
    },
    button: {
        marginTop: 15,
        width: '30%',
        height: '5%',
        backgroundColor: "#4ea8de",
        borderRadius: 50
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'black',
        paddingTop: 3
    }
})