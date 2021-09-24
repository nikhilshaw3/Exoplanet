import axios from 'axios'
import React from 'react'
import{Alert, FlatList, SafeAreaView, Text,View,StyleSheet} from 'react-native'

export default class HomeScreen extends React.Component{
    
    constructor(props){
        super(props)
        this.state={
            details: {},
            imagePath: '',
            url: `http://localhost:5000/planet?name=${this.props.navigation.getParam( "planet_name"
            )}`
        }
    }

    componentDidMount(){
        this.getDetails()
    }

    getDetails = ()=>{
    const {url}= this.state
    axios
    .get(url)
    .then(responce => {
        this.setDetails(responce.data.data)
    })
    .catch(error=>{
        Alert.alert(error.message)
    })

    }

    setDetails = planet_details =>{
        const planet_type = planet_details.planet_type
        let imagePath = ""
        switch(planet_type){
           case "Gas Gaint" :
               imagePath = require("../assets/gas_giant.png")
            break
        
            case "Neptune Like" :
               imagePath = require("../assets/neptune_like.png")
            break

            case "Terrestrial" :
               imagePath = require("../assets/terrestrial.png")
            break

            case "Super Earth" :
               imagePath = require("../assets/super_earth.png")
            break

            default :
            imagePath = require("../assets/gas_giant.png")
        }

        this.setState({
            details:planet_details,
            imagePath:imagePath
        })
    }

    render(){
        const {details,imagePath} = this.state

        if(details.specifications){
            return(
                <View style = {styles.container}>
                  <Card
                  title = {details.name}
                  image = {imagePath}
                  imageProps = {{resizeMode: "contain",width:"100%"}}
                  >
                      <View>
                          <Text style = {styles.container}>{`Distance from Earth : ${details.distance_from_earth}`}</Text>
                          <Text style = {styles.container}>{`Distance from Sun : ${details.distance_from_their_sun}`}</Text>
                          <Text style = {styles.container}>{`Gravity : ${details.gravity}`}</Text>
                          <Text style = {styles.container}>{`Orbital Period : ${details.orbital_period}`}</Text>
                          <Text style = {styles.container}>{`Orbital Speed : ${details.orbital_speed}`}</Text>
                          <Text style = {styles.container}>{`Planet Mass : ${details.planet_mass}`}</Text>
                          <Text style = {styles.container}>{`Planet Radius : ${details.planet_radius}`}</Text>
                          <Text style = {styles.container}>{`Planet Type : ${details.planet_type}`}</Text>

                      </View>

                    <View style={[styles.cardItem,{flexDirection: "column"}]}>
                    <Text>{details.specifications ? `Specificationns : ` : ""}</Text>

                    {details.specifications.map((item,index) => (
                        <Text key={index.toString()} style = {{marginLeft: 50}}>{item}</Text>
                    ))}
                    </View>
                  </Card>
                </View>
            )
        }
        return null;
    }
}

const styles = StyleSheet.create({ container: { flex: 1 }, cardItem: { marginBottom: 10 } });