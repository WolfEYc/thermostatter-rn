import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { Device } from 'react-native-ble-plx'
import { useEffect, useState } from "react";
import DeviceSelector from "@/components/DeviceSelector";
import { GlobalStyles } from "@/constants/Styles";
import { BLUETOOH_LOCAL_ID, GLOBAL_BLE_MANAGER } from "@/constants/BluetoothArduino";




export default function Bluetooth() {
    const devicesMap = new Map<string, Device>()
    const [devices, setDevices] = useState(new Array<Device>())
    const [managerState, setManagerState] = useState("")

    function scanAndConnect() {
        GLOBAL_BLE_MANAGER.startDeviceScan(null, null, (error, device) => {
            if (error || device == null || device.localName != BLUETOOH_LOCAL_ID) {
                // Handle error (scanning will be stopped automatically)
                return
            }

            devicesMap.set(device.id, device)
            setDevices(Array.from(devicesMap.values()))
        })
    }

    useEffect(() => {
        const subscription = GLOBAL_BLE_MANAGER.onStateChange(state => {
            setManagerState(state)
            if (state === 'PoweredOn') {
                scanAndConnect()
                subscription.remove()
            }
        }, true)
        return () => subscription.remove()
    }, [GLOBAL_BLE_MANAGER])

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: "#D0D0D0", dark: "#1f1f1f" }}
            headerImage={
                <Ionicons
                    size={310}
                    name="radio"
                    style={styles.headerImage}
                />
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Devices</ThemedText>
            </ThemedView>
            <ThemedText>
                managerState={managerState}
            </ThemedText>
            <View style={GlobalStyles.container}>
                {devices.map(device => <DeviceSelector key={device.id} device={device} />)}
            </View>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: "#00FFFF",
        bottom: -90,
        left: -35,
        position: "absolute",
    },
    titleContainer: {
        flexDirection: "row",
        gap: 8,
    },
});
