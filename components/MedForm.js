import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from './Alert';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { fetchMeds, fetchFirstMed, sortMeds, filterMeds } from './redux/actions';
import { Button, TextInput, DataTable, Text } from 'react-native-paper';
import { Header } from 'react-native-elements';

function MedForm({ user }) {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);

    const dispatch = useDispatch();
    const meds = useSelector(state => state.meds);
    const loading = useSelector(state => state.loading);

    const email = user && user.email;
    const pageLabel = `${page * 15 + 1}-${(page + 1) * 15} of ${meds.length}`;

    return (
        <View>
            <Header
                leftComponent={{icon: 'menu', color: '#fff'}}
                centerComponent={{
                    text: 'MedSearch',
                    style: {color: '#fff', fontSize: '1.2rem'}
                }}
                rightComponent={{icon: 'home', color: '#fff'}}
            />
            <Alert />

            <Button
                icon='database-search'
                mode='contained'
                onPress={()=> dispatch(fetchMeds(search))}
            >
                Search
            </Button>

            <TextInput
                label='Search For Medication'
                placeholder='Enter Medication'
                value={search}
                onChangeText={text => setSearch(text)}
            />
           
            <Button
                icon='magnify'
                mode='contained'
                onPress={()=> dispatch(fetchFirstMed(search))}    
            >
                First
            </Button>

            <Button
                icon='sort'
                mode='contained'
                onPress={()=> dispatch(sortMeds())}    
            >
                Sort
            </Button>

            <Button
                icon='filter-variant'
                mode='contained'
                onPress={()=> dispatch(filterMeds())}    
            >
                Filter
            </Button>

            {loading && <ActivityIndicator size='large' />}
            <Text>Results: {meds.length}</Text>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Package</DataTable.Title>
                    <DataTable.Title numeric>Price</DataTable.Title>
                </DataTable.Header>
                {meds.slice(page * 15, (page * 15) + 15).map(item => 
                    <DataTable.Row key={item.id}>
                        <DataTable.Cell>{item.name}</DataTable.Cell>
                        <DataTable.Cell>{item.package}</DataTable.Cell>
                        <DataTable.Cell numeric>${item.price}</DataTable.Cell>
                    </DataTable.Row>
                )}
                <DataTable.Pagination
                    page={page}
                    numberOfPages={meds.length/15}
                    onPageChange={page => setPage(page)}
                    label={pageLabel}
                />
            </DataTable>
        </View>
    );
}

export default MedForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
    