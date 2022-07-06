import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    body: {
        alignItems: 'stretch',
        justifyContent: 'space-between',
        paddingVertical: 16,
        backgroundColor: '#fff',
        height: '100%',
    },
    title: {
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
    },
    produtosContainer: {
        padding: 0,
        paddingBottom: 30,
        marginTop: 10,
        marginHorizontal: 10,
    },
    produtoContainer: {
        width: 165,
        height: 229,
        alignItems: 'center',
        justifyContent: 'center',
    },
    produtoContainerImage: {
        width: 133,
        height: 133,
        borderRadius: 5,
        marginBottom: 10
    },
    textCardTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
    },
    bottomBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textCardValue: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 14,
        color: '#dc1e3e',
    },
    cleanButton: {
        marginHorizontal: 16,
        borderRadius: 10,
        backgroundColor: '#dc1e3e',
    },
    cleanButtonText: {
        fontSize: 20,
        fontWeight: '600',
    },
});

export default styles;