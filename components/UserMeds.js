import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Alert from './Alert';
import { headers } from '../config/headers';
import { StyleSheet } from 'react-native';
import { showError, getUser } from './redux/actions';
import { DataTable, IconButton, Banner, Chip } from 'react-native-paper';
import { Header } from 'react-native-elements';

function UserMeds() {
    const [page, setPage] = useState(0);
    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const pageLabel = user && `${page * 15 + 1}-${(page + 1) * 15} of ${user.meds.length}`;
    const name = user ? ' ' + user.name: ' Guest';

    useEffect(()=> {
        dispatch(getUser());
    }, [visible]);

    const removeMed = (id) => {
        axios.delete('http://localhost:8000/api/meds/' + id, headers)
        .then(()=> setVisible(true))
        .catch(err => dispatch(showError(err)));
    };

    return (
        <>
            <Header
                leftComponent={{icon: 'account-circle', color: '#fff'}}
                centerComponent={{
                    text: name + "'s Medications",
                    style: {color: '#fff', fontSize: '1.2rem'}
                }}
            />

            <Chip icon='view-headline'>
                Your Saved Medications: {user && user.meds.length}
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
                Medication Removed!
            </Banner>
            <Alert />

            <DataTable style={styles.table}>
                <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Package</DataTable.Title>
                    <DataTable.Title>Price</DataTable.Title>
                    <DataTable.Title numeric>Delete</DataTable.Title>
                </DataTable.Header>
                {user && user.meds.slice(page * 15, (page * 15) + 15).map(item => 
                    <DataTable.Row key={item.id}>
                        <DataTable.Cell>{item.name}</DataTable.Cell>
                        <DataTable.Cell>{item.package}</DataTable.Cell>
                        <DataTable.Cell>${item.price}</DataTable.Cell>
                        <DataTable.Cell numeric>
                            <IconButton
                                icon='delete'
                                onPress={()=> removeMed(item.id)}
                            />
                        </DataTable.Cell>
                    </DataTable.Row>
                )}
                <DataTable.Pagination
                    page={page}
                    numberOfPages={user && user.meds.length/15}
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

export default UserMeds;


    