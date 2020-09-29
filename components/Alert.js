import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Banner } from 'react-native-paper';

function Alert() {
    const [visible, setVisible] = useState(false);

    const error = useSelector(state => state.error);

    useEffect(()=> {
        error && setVisible(true);
    }, [error]);

    return (
        <Banner
            visible={visible}
            actions={[
                {
                    label: 'Close',
                    onPress: () => setVisible(false)
                }
            ]}
            icon="alert"
        >
            {error}
        </Banner>
    );
};

export default Alert;