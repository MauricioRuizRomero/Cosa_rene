import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpabdata } from 'react-native';
import Colors from '../../res/Colors';
import Storage from '../../libs/storage';

class BadgesDetail extends React.Component {
    state = {
        badge: {},
        isFavorite: false,
    };

    componentDidMount() {
        this.getBadge();
    }

    getBadge = () => {
        const { item } = this.props.route.params;
        this.setState({ badge: item }, () =>{
            this.getFavorite();
        });
        this.props.navigation.setOptions({ title: item.name });
    };

    getFavorite = async () =>{
        try{
            const key = `favorite-${this.state.badge._id}`;
            const favoriteStr = await Storage.instance.get(key);
            if(favoriteStr != null){
                this.setState({isFavorite: true})
            }
        }catch(err){
            console.log('Get favorite err', err);
        }
    }

    toggleFavorite = () => {
        if(this.state.isFavorite){
            this.removeFavorite();
        }else{
            this.addFavorite();
        }
    };

    addFavorite = async () => {
        const badge = JSON.stringify(this.state.badge);
        const key = `favorite-${this.state.badge._id}`;

        const stored = await Storage.instance.store(key, badge);

        if(stored){
            this.setState({isFavorite: true});
        }
    };

    removeFavorite = async () => {
        const key = `favorite-${this.state.badge._id}`;
        await Storage.instance.remove(key);
        this.setState({isFavorite: false});
    };

    render() {
        const { badge, isFavorite } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.badge}>
                    <Image
                        style={styles.header}
                        source={{ uri: `${badge.header_img_url}` }}
                    />
                    <Image
                        style={styles.profileImage}
                        source={{ uri: `${badge.main_picture_url}` }}
                    />
                  
                    <View style={styles.userInfo}>
                        <Text style={styles.title}>{badge.title}</Text>
                    </View>
                    <Text style={styles.bdata}>{badge.data}</Text>
                    <Text style={styles.bdata}>{badge.hour}</Text>
                    <View style={styles.data}>
                    
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade,
    },
    badge: {
        flex: 1,
        margin: 20,
        marginTop: 45,
        width: '90%',
        height: '90%',
        backgroundColor: Colors.white,
        borderRadius: 25,
    },
    header: {
        width: '100%',
        height: '40%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor:Colors.blackPearl,
    },
    profileImage: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 100,
        borderWidth: 5,
        borderColor: Colors.white,
        position: 'absolute',
        top: '25%',
        left: '22%',

    },
    favorite: {
        position: 'absolute',
        top: 290,
        right: 40,
    },

    userInfo: {
        flexDirection: 'row',
        marginTop: 110,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.blackPearl,
    },
    age: {
        fontSize: 28,
        marginLeft: 20,
        color: Colors.zircon,
    },
    bdata: {
        marginTop: 10,
        fontSize: 18,
        textAlign: 'center',
        color: Colors.zircon,
    },
    data: {
        padding: 20,
        marginTop: 50,
        justifyContent: 'center',
        flexDirection: 'row',
 
        
    },
    dataColumns: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dataInfo: {
        margin: 20,
        fontSize: 28,
        fontWeight: 'bold',
        marginHorizontal: 25,
        color: Colors.charade,
    },
    smallText: {
        color: Colors.zircon,
    },
});

export default BadgesDetail;
