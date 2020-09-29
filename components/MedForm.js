import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from './Alert';
import MedTable from './MedTable';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { fetchMeds, fetchFirstMed, sortMeds, filterMeds, getUser } from './redux/actions';
import { Button, TextInput } from 'react-native-paper';
import { Header } from 'react-native-elements';

function MedForm() {
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const loading = useSelector(state => state.loading);

    const email = user ? ' - ' + user.email: ' - Guest';

    useEffect(()=> {
        dispatch(getUser());
    }, []);

    return (
        <View>
            <Header
                leftComponent={{icon: 'menu', color: '#fff'}}
                centerComponent={{
                    text: 'MedSearch' + email,
                    style: {color: '#fff', fontSize: '1.2rem'}
                }}
                rightComponent={{icon: 'home', color: '#fff'}}
            />
            <Alert />

            <Button
                icon='database-search'
                mode='contained'
                style={styles.button}
                onPress={()=> dispatch(fetchMeds(search))}>
                Search
            </Button>

            <TextInput
                label='Search For Medication'
                placeholder='Enter Medication'
                value={search}
                style={styles.button}
                onChangeText={text => setSearch(text)}
            />
           
            <Button
                icon='magnify'
                mode='contained'
                style={styles.button}
                onPress={()=> dispatch(fetchFirstMed(search))}>
                First
            </Button>

            <Button
                icon='sort'
                mode='contained'
                style={styles.button}
                onPress={()=> dispatch(sortMeds())}>
                Sort
            </Button>

            <Button
                icon='filter-variant'
                mode='contained'
                style={styles.button}
                onPress={()=> dispatch(filterMeds())}>
                Filter
            </Button>
            {loading && <ActivityIndicator size='large' />}

            <MedTable />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        margin: '.2rem'
    }
});

export default MedForm;


    