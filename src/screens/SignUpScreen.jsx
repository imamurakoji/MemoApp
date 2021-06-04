import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import AppBar from '../components/AppBar';
import Button from '../components/Button';

export default function SignUpScreen(){
    return(
        <View style={styles.container}>
            <AppBar />
            <View style={styles.inner}>
                <View>
                    <Text style={styles.title}>Sign Up</Text>
                    <TextInput style={styles.input} value="Email Adress" />
                    <TextInput style={styles.input} value="Password"></TextInput>
                </View>
                <Button label="Submit"/>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already Resistered</Text>
                    <Text style={styles.footerLink}>Log In</Text>
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
