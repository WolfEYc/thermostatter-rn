import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "bean",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "home" : "home-outline"}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "code-slash" : "code-slash-outline"}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="ble"
                options={{
                    title: "Bluetooth",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "radio" : "radio-outline"}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
