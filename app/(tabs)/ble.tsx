import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { BleManager, Device } from 'react-native-ble-plx'
import { useEffect, useState } from "react";

export const manager = new BleManager()


export default function FunnyTab() {
    const devicesMap = new Map<string, Device>()
    const [devices, setDevices] = useState(Array<Device>)
    const [managerState, setManagerState] = useState("")
    function scanAndConnect() {
        manager.startDeviceScan(null, null, (error, device) => {
            if (error || device == null || device.name == null) {
                // Handle error (scanning will be stopped automatically)
                return
            }

            devicesMap.set(device.id, device)
            setDevices(Array.from(devicesMap.values()))
        })
    }

    useEffect(() => {
        const subscription = manager.onStateChange(state => {
            setManagerState(state)
            if (state === 'PoweredOn') {
                scanAndConnect()
                subscription.remove()
            }
        }, true)
        return () => subscription.remove()
    }, [manager])

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
                <ThemedText type="title">L + Ratio</ThemedText>
            </ThemedView>
            <ThemedText>
                managerState={managerState}
            </ThemedText>
            <Collapsible title="Devices">
                {devices.map(device => <ThemedText key={device.id}>{device.name}</ThemedText>)}
            </Collapsible>
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
