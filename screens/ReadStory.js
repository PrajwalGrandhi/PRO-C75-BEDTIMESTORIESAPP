import * as React from 'react';
import {View,Text,StyleSheet,ScrollView,TextInput,TouchableOpacity,FlatList} from 'react-native';
import db from '../config';
//import { SearchBar } from 'react-native-elements';

export default class Readstory extends React.Component {
    constructor(props){
        super(props);
        this.state={
          allStories:[],
          seach:'',
          dataSource:[],


        }
      }

      componentDidMount=async()=>{
        const data=await db.collection('Stories').get();

        data.docs.map((item)=>{
            this.setState({allStories:[...this.state.allStories,item.data()]});
        })
        //console.log(this.state.allStories);
      }

      SearchFilterFunction=async(text)=>{
        //console.log(text);
        //var story=null;

        this.state.allStories.map((stories)=>{
            if(stories.title  === this.state.search || stories.author  === this.state.search){
                var story = db.collection('Stories').where('title','==',text).get();
                
               //console.log(story);
               
            }
            story.docs.map((doc)=>{
              this.setState({
                allStories:[...this.state.allStories,doc.data()]
              });
            })
        })
     }

    render(){
        return (
            <ScrollView>
                <Text style={styles.textstyle}>Read Story</Text>

                <TextInput
          style={{alignSelf:'center',width:300,marginTop:30,height:50}}
          placeholder="Search"
          onChangeText={(text)=>{this.setState({search:text})}}/>

        <TouchableOpacity
          style={{alignSelf:'center',backgroundColor:'red',width:100,borderRadius:10,alignItems:'center',marginTop:20}}
          onPress={()=>{
            this.SearchFilterFunction(this.state.search);
          }}>
          <Text>Search</Text>
        </TouchableOpacity>
            <View>
        

        {
                // this.state.allStories.map((item)=>{
                //          return(
                //              <View style={{backgroundColor:'red',borderWidth:5,marginTop:10,width:500,alignSelf:'center'}}>
                //                <Text style={{marginLeft:50}}>
                //                 Title : {item.title}
                //                </Text>
                //                <Text style={{marginLeft:50}}>
                //                 Author : {item.author}
                //                </Text>
                //                <Text style={{marginLeft:50}}>
                //                 Story : {item.story}
                //                </Text>
                //            </View>
                //           )
                // })


<FlatList  data={this.state.allStories}
         renderItem={({item})=>(
            <View style={{backgroundColor:'red',borderWidth:5,marginTop:10,width:500,alignSelf:'center'}}>
                  <Text>Title : {item.title}</Text>
                  <Text> Author : {item.author} </Text>
                  <Text>Story : {item.story}</Text>
             </View>
         )} keyExtractor={(item,index)=>{
           index.toString();
         }} 
         //onEndReached={this.loadMore()}
         //onEndReachedThreshold={0.6}
         />

        }
           
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  textstyle:{
    alignSelf:'center',
    fontSize:50,

  },
  });