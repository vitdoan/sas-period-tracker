import React, {useContext} from 'react';
import { 
    StyleSheet, 
    Text, 
    View,  
    FlatList,
    Pressable, 
    SafeAreaView,  
    StatusBar,
    Image,
} from 'react-native';
import RESOURCE_TEMPLATE from '../../models/ResourceModel';
import { AuthContext } from '../../navigation/AuthProvider'; 

const ResourceScreen = ({ navigation, props }) => {
    const resource_template = new RESOURCE_TEMPLATE();
    const { userId } = useContext(AuthContext);

    const renderItem = ({item}) => {
    return (
        <View style={{flex: 1}}>
        <View style={styles.menubox}>
            <Pressable 
            style={styles.button} 
            onPress={() => navigation.navigate( resource_template.default_pages[item['id']] )}>
            <Image
            source={resource_template.default_images[item['id']]}
            style={styles.imageButton}/>

            <View style={{paddingTop: 6}}>
                <Text style={styles.buttontext}>{item['title']}</Text>
            </View>
            </Pressable>
        </View>
        </View>
    )
    }

    return (
    <SafeAreaView style={styles.container}>
        {/* <View style={styles.menurow}> */}
        <View>
        <FlatList
        data={resource_template.default_template}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={false}
        numColumns={2}
        />
        </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        // alignContent: 'center',
        backgroundColor: 'skyblue',
        paddingTop: StatusBar.currentHeight,
    },
    menurow: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        //alignSelf: 'center',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        // alignContent: 'center',
        //marginTop: 10,
        //borderWidth: 2,
        //borderColor: 'black',
        // backgroundColor: 'skyblue',
        //marginHorizontal: 20,
    },
    menubox: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        width: '80%',
        height: '50%',
        marginTop: '10%',
        marginBottom: '10%',
        marginLeft: '10%',
        marginRight: '10%',
        backgroundColor: 'white',
        borderRadius: 20,
    },
    // scrollView: {
    //   backgroundColor: 'pink',
    //   marginHorizontal: 20,
    // },
    // heading: {
    //   fontSize: 40,
    //   fontWeight: "bold",
    //   color: "#ff7120",
    //   textAlign: "center",
    //   marginTop: 50,
    // },
    button: {
        alignItems: "center",
        justifyContent: "flex-end",
        //paddingVertical: 10,
        //paddingHorizontal: 20,
        //borderRadius: 5,
        //borderWidth: 2,
        elevation: 1,
        // backgroundColor: "orange",
        height: "100%",
        width: "100%",
        paddingBottom: "6%"
        },
        buttontext: {
        textAlign: "center",
        fontSize: 20,
        // fontWeight: "bold",
        color: "black",
    },
    footnote: {
        flex: 1,
        bottom: 0,
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 10,
    },
    imageButton: {
        flex: 1,
        resizeMode: "stretch",
        width: "100%",
        height: 150,
        paddingBottom: "10%",
        borderRadius: 20
    }
})

export default ResourceScreen;
