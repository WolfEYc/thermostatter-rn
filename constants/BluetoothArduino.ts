import { BleManager, Device } from "react-native-ble-plx"

export const ARDUINO_CHARACTERISTIC_UUID = "2a57"
export const ARDUINO_SERVICE_UUID = "180A"
export const BLUETOOH_LOCAL_ID = "UNO_R4_THERMOSTATTER"
export const GLOBAL_BLE_MANAGER = new BleManager()


export async function connect_and_discover(device: Device) {
    const is_connected = await device.isConnected();
    if (!is_connected) {
        device = await device.connect()
    }
    device = await device.discoverAllServicesAndCharacteristics()
    const characteristics = await device.characteristicsForService(ARDUINO_SERVICE_UUID)
    return characteristics.find(x => x.uuid.includes(ARDUINO_CHARACTERISTIC_UUID)) || null
}