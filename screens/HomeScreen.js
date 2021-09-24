import React from 'react';
import{Alert, FlatList, SafeAreaView, Text,View,StyleSheet} from 'react-native';
import axios from 'axios';
import {ListItem} from 'react-native-elements'

export default class HomeScreen extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            list_data: [],
            url : "http:/localhost:5000"
        }
    }

    componentDidMount(){
        this.getPlanets()
    }

    getPlanets = ()=>{
        const {url} = this.state
        axios
        .get(url)
        .then(response=>{
            this.setState({
                list_data:response.data.data
            })
        })
        .catch(error => {
            Alert.alert("alert")
        })
    }

    renderItem=({item,index})=>(
        <ListItem
        key = {index}
        title={`Planet : ${item.name}`}
        subtitle = {`Distance From Earth : ${item.distance_from_earth}`}
        titleStyle = {styles.title}
        containerStyle = {styles.listContainer}
        bottomDivider
        chevron
        onPress = {()=>
            this.props.navigation.navigate("Details",{planet_name:item.name})
        }
        />
    )

    keyExtrator = (item,index) => index.toString()

    render(){
        const {list_data} = this.state
        if(list_data.lenght === 0){
            return(
                <View style = {styles.emptyContainer}>
                    <Text>Loading ...</Text>
                </View>
            )
        }
        return(
            <View style = {styles.container}>
            <SafeAreaView/>
            <View style = {styles.upperContainer}>
                <Text style = {styles.headerText}>Planets World</Text>
            </View>
            <View style = {styles.lowerContainer}>
                <FlatList
                keyExtractor = {this.keyExtrator}
                data = {this.state.list_data}
                renderItem = {this.renderItem}
                />
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({ 
    container: { flex: 1, backgroundColor: "#edc988" }, 
    upperContainer: { flex: 0.1, justifyContent: "center", alignItems: "center" }, 
    headerText: { fontSize: 30, fontWeight: "bold", color: "#132743" }, 
    lowerContainer: { flex: 0.9 }, 
    emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" }, 
    emptyContainerText: { fontSize: 20 }, 
    title: { fontSize: 18, fontWeight: "bold", color: "#d7385e" }, 
    listContainer: { backgroundColor: "#eeecda" } });