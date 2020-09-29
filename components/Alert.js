import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetError } from './redux/actions';
import { Banner } from 'react-native-paper';

function Alert() {
    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();
    const error = useSelector(state => state.error);

    useEffect(()=> {
        error != null && setVisible(true);
    }, [error]);

    const resetAlert = () => {
        dispatch(resetError());
        setVisible(false);
    };

    return (
        <Banner
            visible={visible}
            actions={[
                {
                    label: 'Close',
                    onPress: () => resetAlert()
                }
            ]}
            icon="alert">
            {error}
        </Banner>
    );
};

export default Alert;