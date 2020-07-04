import { StyleSheet,Platform } from "react-native";
import { white } from "../utils/color";

export const commonStyles = StyleSheet.create({
    deck: {
        backgroundColor: white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 30,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    noDataText: {
        fontSize: 24,
        paddingTop: 20,
        paddingBottom: 20,
        alignSelf: 'center'
    },
})