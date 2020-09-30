import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { headers } from '../config/headers';
import { StyleSheet } from 'react-native';
import { showError } from './redux/actions';
import { DataTable, IconButton, Banner, Chip } from 'react-native-paper';

function MedTable() {
    const [page, setPage] = useState(0);
    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();
    const meds = useSelector(state => state.meds);

    const pageLabel = `${page * 15 + 1}-${(page + 1) * 15} of ${meds.length}`;

    const saveMed = (id) => {
        axios.put('http://localhost:8000/api/meds/' + id, null, headers)
        .then(()=> setVisible(true))
        .catch(err => dispatch(showError(err)));
    };

    return (
        <>
            <Chip icon='view-headline'>
                Results: {meds.length}
            </Chip>

            <Banner
                visible={visible}
                actions={[
                    {
                        label: 'Ok',
                        onPress: () => setVisible(false)
                    }
                ]}
                icon='check-circle'>
                Medication Saved!
            </Banner>

            <DataTable style={styles.table}>
                <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Package</DataTable.Title>
                    <DataTable.Title>Price</DataTable.Title>
                    <DataTable.Title>Save</DataTable.Title>
                </DataTable.Header>
                {meds.slice(page * 15, (page * 15) + 15).map(item => 
                    <DataTable.Row key={item.id}>
                        <DataTable.Cell>{item.name}</DataTable.Cell>
                        <DataTable.Cell>{item.package}</DataTable.Cell>
                        <DataTable.Cell>${item.price}</DataTable.Cell>
                        <DataTable.Cell>
                            <IconButton
                                icon='download'
                                onPress={()=> saveMed(item.id)}
                            />
                        </DataTable.Cell>
                    </DataTable.Row>
                )}
                <DataTable.Pagination
                    page={page}
                    numberOfPages={meds.length/15}
                    onPageChange={page => setPage(page)}
                    label={pageLabel}
                />
            </DataTable>
        </>
    );
}

const styles = StyleSheet.create({
    table: {
        margin: '.25rem'
    }
});

export default MedTable;


    