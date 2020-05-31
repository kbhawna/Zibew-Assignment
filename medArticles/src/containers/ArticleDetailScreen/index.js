import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {Avatar, Button, Card, Badge} from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
const {height, width} = Dimensions.get('window');
class ArticleDetailScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articleId: this.props.route.params.articleId,
      articleTitle: this.props.route.params.articleTitle,
      articleDescription: this.props.route.params.articleDescription,
      index: this.props.route.params.index,
      articleDate: new Date(
        this.props.route.params.articleDate,
      ).toLocaleDateString(),
    };
  }

  /*** ACTION ****/

  navigationBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    console.log('bhawna', this.props.route.params.articleTitle);
    console.log('bhawna', this.props.route.params.articleDescription);
    return (
      <ImageBackground
        source={{
          uri: 'https://www.personal.psu.edu/sqw5342/Green.png',
        }}
        style={{
          flex: 1,
          resizeMode: 'cover',
        }}>
        <TouchableOpacity
          onPress={this.navigationBack}
          style={{
            position: 'absolute',
            height: 50,
            width: 50,
            borderRadius: 15,
            backgroundColor: '#000000',
            left: 15,
            // bottom: 15,
            alignItem: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            top: height * 0.05,
            elevation: 10,
          }}>
          <View style={{left: 10}}>
            <Icon
              name="arrow-left"
              type="SimpleLineIcons"
              size={20}
              color={'#ffffff'}
              fontWeight="bold"
            />
          </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              position: 'absolute',
              height: 50,
              width: 50,
              borderRadius: 35,
              backgroundColor: '#ffffff',
              right: 15,
              alignItem: 'center',
              justifyContent: 'center',
              zIndex: 2000,
              top: height * 0.4,
              elevation: 10,
            }}>
            <View style={{left: 15}}>
              <Icon name="action-redo" type="SimpleLineIcons" size={20} />
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              height: 50,
              width: 50,
              borderRadius: 35,
              backgroundColor: '#ffffff',
              right: 80,
              alignItem: 'center',
              justifyContent: 'center',
              zIndex: 2000,
              top: height * 0.4,
              elevation: 10,
            }}>
            <View style={{left: 15}}>
              <Icon name="tag" type="SimpleLineIcons" size={20} />
            </View>
          </View>
        </View>
        <Badge
          value="Diabetes"
          status="primary"
          containerStyle={{
            borderRadius: 15,
            position: 'absolute',
            height: 50,
            width: 80,
            top: height * 0.3,
            left: width * 0.03,
          }}
        />
        <Text
          style={{
            color: '#ffffff',
            fontWeight: 'bold',
            fontSize: 20,
            top: height * 0.35,
            left: width * 0.05,
            marginRight: width * 0.1,
          }}>
          {this.state.articleTitle}
        </Text>
        <View
          style={{
            marginTop: height * 0.4,
            width: width,
            height: height * 1,
            borderRadius: 20,
            backgroundColor: '#ffffff',
            elevation: 5,
            alignSelf: 'center',
          }}>
          <View style={{padding: 20, marginTop: 10, flexDirection: 'row'}}>
            <Avatar
              rounded
              size="medium"
              containerStyle={{borderWidth: 1, borderColor: 'black'}}
              source={{
                uri: 'http://pngimg.com/uploads/girls/girls_PNG6492.png',
              }}
            />
            <View style={{left: 15}}>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>
                Kumari Bhawna
              </Text>
              <Text style={{color: '#000000'}}>{this.state.articleDate}</Text>
            </View>
          </View>
          <ScrollView>
            <HTMLView
              value={this.state.articleDescription}
              style={{color: '#000000', left: width * 0.05, marginRight: width * 0.1}}
            />
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

export default ArticleDetailScreen;
