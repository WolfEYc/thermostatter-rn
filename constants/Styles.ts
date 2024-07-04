import { StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'nowrap',
    },
    box: {
        width: 50,
        height: 50,
    },
    column: {
        flexDirection: 'column',
        flexWrap: 'nowrap',
    },
    button: {
        borderRadius: 4,
        paddingVertical: 20,
        backgroundColor: '#1e1e1e',
        textAlign: 'center',
        paddingHorizontal: 8,

    },
    selected: {
        backgroundColor: 'coral',
        borderWidth: 0,
    },
    buttonLabel: {
        fontSize: 24,
        fontWeight: '500',
        color: 'white',
    },
    selectedLabel: {
        color: 'white',
    },
    label: {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 24,
    },
});