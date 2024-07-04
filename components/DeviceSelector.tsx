import { TouchableOpacity, Text, Alert } from "react-native";
import { Characteristic, Device } from "react-native-ble-plx";

import { GlobalStyles } from "@/constants/Styles";
import { connect_and_discover } from "@/constants/BluetoothArduino";
import { useEffect } from "react";

type DeviceSelectorProps = {
    device: Device;
};

export default function DeviceSelector({ device }: DeviceSelectorProps) {
    useEffect(() => {
        return () => {
            device.isConnected().then(is_connected => {
                if (is_connected) {
                    device.cancelConnection()
                }
            })

        };
    }, [device])

    let iter = 0
    let connecting = false
    let characteristic: Characteristic | null = null

    const FailedToConnectAlert = () =>
        Alert.alert('Failed to connect to thermostatter', 'Try again!', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Try Again', onPress: () => console.log('try again pressed') },
        ]);

    async function selectDevice() {
        if (connecting === false && characteristic === null) {
            characteristic = await connect_and_discover(device)
        }
        if (characteristic == null) {
            FailedToConnectAlert()
            return
        }

        let msg_value = btoa("ping " + iter)
        iter += 1

        characteristic = await characteristic.writeWithResponse(msg_value)
        characteristic = await characteristic.read()
        if (characteristic.value == null) {
            return
        }
        let return_str = atob(characteristic.value)
        console.log(return_str)
    }

    return (
        <TouchableOpacity
            onPress={() => selectDevice()}
            style={GlobalStyles.button}>
            <Text style={GlobalStyles.buttonLabel}>{device.name}</Text>
        </TouchableOpacity >
    )
}


