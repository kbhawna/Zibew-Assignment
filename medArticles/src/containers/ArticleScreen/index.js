import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as articleAction from '../../redux/actions/user';
import {Avatar, Button, Card, Badge} from 'react-native-elements';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
const {height, width} = Dimensions.get('window');
import {ARTICLE_DETAIL_SCREEN_ROUTE} from '../../navigation/index';
import styles from './styles';

class ArticleScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      callApi: false,
      fetchData: false,
      media: {
        url: '',
      },
    };
  }

  componentDidMount = () => {
    console.log('props', this.props);
    const {getAllArticles} = this.props;
    let data = {CustomerId: 141, LastUpdatedTimeTicks: 636909239704252670};
    getAllArticles(data);
    this.setState({callApi: true});
  };

  handleApiResponse = (nextProps, prevProps) => {
    const {
      apiCalling,
      apiCallSuccess,
      apiCallFail,
      apiError,
      articles,
    } = nextProps;
    const {
      apiCallSuccess: prevApiCallSuccess,
      apiCallFail: prevApiCallFail,
    } = prevProps;
    if (
      !apiCalling &&
      apiCallSuccess &&
      apiCallSuccess !== prevApiCallSuccess
    ) {
      console.log('articles: ', articles);
      this.setState({
        callApi: false,
        fetchData: true,
        data: articles,
      });
    } else if (!apiCalling && apiCallFail && apiCallFail !== prevApiCallFail) {
      console.log(' Error: ', apiError);
    }
  };

  componentDidUpdate(prevProps) {
    if (this.state.callApi) {
      this.handleApiResponse(this.props, prevProps);
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.safeAreaStyle}>
        <ScrollView>
          {this.state.fetchData ? (
            <View>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{color: '#5C2A98', fontSize: 30, padding: 10}}>
                  All
                </Text>
                <Text style={{color: '#000000', fontSize: 30, padding: 10}}>
                  {' '}
                  Bookmarks
                </Text>
              </View>

              <View horizontal={true} style={{padding: 20}}>
                <FlatList
                  horizontal={true}
                  contentContainerStyle={{paddingLeft: 10, paddingRight: 10}}
                  data={this.state.data.data.Response.articles}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <View style={{padding: 5}}>
                      <Avatar
                        rounded
                        size="medium"
                        containerStyle={{borderWidth: 2, borderColor: 'green'}}
                        source={{
                          uri: 'https://www.personal.psu.edu/sqw5342/Green.png',
                        }}
                      />
                      <Text>Diabetes</Text>
                    </View>
                  )}
                />
              </View>

              <View style={{marginLeft: 10, marginRight: 10}}>
                <FlatList
                  data={this.state.data.data.Response.articles}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate(
                          ARTICLE_DETAIL_SCREEN_ROUTE,
                          {
                            articleId: item.id,
                            articleTitle: item.Title,
                            articleDescription: item.Description,
                            index: index,
                            articleDate: item.CreatedOnUtc,
                          },
                        )
                      }>
                      <Card
                        image={{
                          uri: 'https://www.personal.psu.edu/sqw5342/Green.png',
                        }}
                        imageStyle={{
                          height: height * 0.46,
                          resizeMode: 'stretch',
                          borderRadius: 15,
                        }}
                        containerStyle={{
                          height: height * 0.55,
                          width: width * 0.9,
                          elevation: 5,
                          borderRadius: 15,
                        }}>
                        <Badge
                          value="Diabetes"
                          status="primary"
                          containerStyle={{
                            borderRadius: 15,
                            position: 'absolute',
                            bottom: 100,
                            height: 50,
                            width: 80,
                          }}
                        />
                        <Badge
                          value="CardioVascular"
                          status="primary"
                          containerStyle={{
                            left: 80,
                            borderRadius: 15,
                            position: 'absolute',
                            bottom: 100,
                            height: 50,
                            width: 100,
                          }}
                        />

                        <Text
                          style={{
                            marginBottom: 20,
                            position: 'absolute',
                            bottom: 60,
                            color: '#ffffff',
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginLeft: 10,
                          }}>
                          {item.Title}
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                          }}>
                          <Icon name="heart" type="SimpleLineIcons" size={30} />
                          <Text style={{top: 5}}>{item.LikesCount} Likes</Text>
                          <Icon name="event" size={30} />
                          <Text style={{top: 5}}>
                            {new Date(item.CreatedOnUtc).toLocaleDateString()}
                          </Text>
                          <Icon name="tag" size={30} />
                          <Text style={{top: 5}}>Bookmark</Text>
                        </View>
                      </Card>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          ) : (
            <View>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(articleAction, dispatch);
};
const mapStateToProps = (state) => ({
  apiCalling: state.getArticleList.apiCalling,
  apiCallSuccess: state.getArticleList.apiCallSuccess,
  apiCallFail: state.getArticleList.apiCallFail,
  apiError: state.getArticleList.apiCallError,
  articles: state.getArticleList.articleList,
});
export default connect(mapStateToProps, mapDispatchToProps)(ArticleScreen);
