import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';
import Button from '../components/Button';

export default function LogInScreen(props){
    const { navigation } = props;
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    function handlePress() {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredentaial) => {
                const { user } = userCredentaial;
                console.log(user.uid);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MemoList'}],
            });
            })
            .catch(error => {
                Alert.alert(error.code);
            });

    }
    return(
        <View style={styles.container}>
            <View style={styles.inner}>
                <View>
                    <Text style={styles.title}>Log In</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={(text) => { setEmail(text); }}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        placeholder="Email Adress"
                        textContentType="emailAddress"
                    />
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={(text) => { setPassword(text); }}
                        autoCapitalize="none"
                        placeholder="Password"
                        secureTextEntry
                        textContentType="password"
                    />
                </View>
                <Button
                    label="Submit"
                    onPress={handlePress}
                />
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Not Resistered</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'SignUp' }],
                            });
                        }}
                    >
                         <Text style={styles.footerLink}>Sign up here!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: '#f0f4f8',
    },
    inner: {
        paddingHorizontal: 27,
        paddingVertical: 24,
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    input: {
        fontSize: 16,
        height: 48,
        borderColor: '#DDDDDD',
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    footerText: {
        fontSize: 14,
        lineHeight: 24,
        marginRight: 8,
    },
    footerLink: {
        fontSize: 14,
        lineHeight: 24,
        color: '#467fd3',
    },
    footer: {
        flexDirection: 'row',
    }
});
