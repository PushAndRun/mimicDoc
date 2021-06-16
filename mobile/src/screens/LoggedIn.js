import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Loading } from '../components/common/';
import axios from 'axios';

export default class LoggedIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      username: '',
      error: ''
    }
  }

  componentDidMount(){
    const headers = {
      'x-access-token': this.props.jwt
    };
    console.log(this.props.jwt)
    console.log(headers)
    axios({
      method: 'GET',
      url: 'http://13.69.50.227:8081/api/auth/me',
      headers: headers,
    }).then((response) => {
      this.setState({
        username: response.data.name,
        loading: false
      });
    }).catch((error) => {
      this.setState({
        error: 'Error retrieving data',
        loading: false
      });
    });
  }

  render() {
    const { container, emailText, errorText } = styles;
    const { loading, username, error } = this.state;

    if (loading){
      return(
        <View style={container}>
          <Loading size={'large'} />
        </View>
      )
    } else {
        return(
          <View style={container}>
            <View>
              {username ?
                <Text style={emailText}>
                  Welcome to Robodoc {username}!
                </Text>
                :
                <Text style={errorText}>
                  {error}
                </Text>}
            </View>
            <Button onPress={this.props.deleteJWT}>
              Log Out
            </Button>
          </View>
      );
    }
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  emailText: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 20
  },
  errorText: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red'
  }
};
