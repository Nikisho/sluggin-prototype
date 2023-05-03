import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';

const cancelTripAlert = async () => new Promise((resolve) => {

    Alert.alert('Delete', 'Press OK to cancel the ride.', [
        {
            text: 'Cancel',
            onPress: () => { resolve(false)},
            style: 'cancel',
        },
        {   text: 'OK', 
            onPress: () => { resolve(true)} 
        },
    ]);
    
})

export default cancelTripAlert;