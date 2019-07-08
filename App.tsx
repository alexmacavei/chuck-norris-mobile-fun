import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { Body, Container, Form, Header, Item, Picker, Row, Title, View } from 'native-base';
import { JokeSwiper } from './src/components/JokeSwiper';
import { capitalize } from './src/util/Capitalize';

interface AppState {
  fontLoaded: boolean;
  jokeCategories: string[];
  selectedCategory: string;
}

export default class App extends Component<{}, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      jokeCategories: [],
      selectedCategory: undefined
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font
    });
    await fetch('https://api.chucknorris.io/jokes/categories')
      .then(response => response.json())
      .then(result =>
        this.setState({
          fontLoaded: true,
          jokeCategories: result,
          selectedCategory: undefined
        })
      );
  }

  onValueChange(value) {
    this.setState({
      fontLoaded: this.state.fontLoaded,
      jokeCategories: this.state.jokeCategories,
      selectedCategory: value
    });
  }

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }

    return (
      <Container>
        <Header>
          <Body>
            <Title>Chuck Norris Jokes!</Title>
          </Body>
        </Header>
        <Form>
          <Item picker>
            <Picker
              mode={'dropdown'}
              placeholder={'Select joke category...'}
              selectedValue={this.state.selectedCategory}
              onValueChange={this.onValueChange.bind(this)}>
              {this.state.jokeCategories.map(category => (
                <Picker.Item label={capitalize(category)} key={category} value={category} />
              ))}
            </Picker>
          </Item>
          <Row />
          <View>{!!this.state.fontLoaded ? <JokeSwiper category={this.state.selectedCategory || ''} /> : null}</View>
        </Form>
      </Container>
    );
  }
}
