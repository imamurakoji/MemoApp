import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import firebase from 'firebase';

import CircleButton from '../components/CircleButton';
import { dateToString } from '../utils/index.js';

export default function MemoDetailScreen(props) {
    const { navigation, route } = props;
    const { id } = route.params;
    console.log(id);
    const [memo, setMemo ] = useState(null);

    useEffect(() => {
        const { currentUser } = firebase.auth();
        let unsubscribe = () => {};
        if(currentUser){
            const db = firebase.firestore();
            const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
            unsubscribe = ref.onSnapshot((doc) => {
            console.log(doc.id, doc.data());
            const data = doc.data();
            setMemo({
                id: doc.id,
                bodyText: data.bodyText,
                updatedAt: data.updatedAt.toDate(),
            });
        });
        }
        return unsubscribe;
    });
    return(
        <View style={Styles.container}>
            <View style={Styles.memoHeader}>
                <Text style={Styles.memoTitle} numberOfLines={1}>{memo && memo.bodyText}</Text>
                <Text style={Styles.memoDate}>{memo && dateToString(memo.updatedAt)}</Text>
            </View>
            <ScrollView style={Styles.memoBody}>
                <Text style={Styles.memoText}>
                    {memo && memo.bodyText}
                </Text>
            </ScrollView>
            <CircleButton
                style={{top: 60, bottom: 'auto' }}
                name="edit-2"
                onPress={() => { navigation.navigate('MemoEdit', { id: memo.id, bodyText: memo.bodyText}); }}
            />
        </View>
    );
}

MemoDetailScreen.propTypes = {
    route: shape({
        params: shape({ id: string }),
    }).isRequired,
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    memoHeader: {
        backgroundColor: '#467FD3',
        height: 96,
        justifyContent: 'center',
        paddingVertical: 24,
        paddingHorizontal: 19,
    },
    memoTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        lineHeight: 32,
        fontWeight: 'bold',
    },
    memoDate: {
        color: '#FFFFFF',
        fontSize: 12,
        lineHeight: 16,
    },
    memoBody: {
        paddingVertical: 32,
        paddingHorizontal: 27,
    },
    memoText: {
        fontSize: 16,
        lineHeight: 24,
    },
});
