import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { fetchMeds, fetchFirstMed, sortMeds, filterMeds } from './redux/actions';
import { Button, TextInput, DataTable } from 'react-native-paper';


function MedForm({ user }) {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);

    const dispatch = useDispatch();
    const meds = useSelector(state => state.meds);
    const error = useSelector(state => state.error);

    const pageLabel = `${page * 15 + 1}-${(page + 1) * 15} of ${meds.length}`;

    return (
        <View style={styles}>
            <Button
                icon="database-search"
                mode="contained"
                onPress={()=> dispatch(fetchMeds(search))}
            >
                Search
            </Button>

            <TextInput
                label="Search For Medication"
                placeholder="Enter Medication"
                value={search}
                onChangeText={text => setSearch(text)}
            />

            <Button
                icon="database-search"
                mode="contained"
                onPress={()=> dispatch(fetchFirstMed(search))}    
            >
                First
            </Button>

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
    },
});
    
            // <div>MedForm</div>
            // <div>{user && user.email}</div>
            // <div>
            //     <button onClick={()=> dispatch(sortMeds())}>
            //         Sort Meds
            //     </button>
            //     <button onClick={()=> dispatch(filterMeds())}>
            //         Filter Meds
            //     </button>
            // </div>
            // <div>Results: {meds.length}</div>
            // {error && <div>{error}</div>}


