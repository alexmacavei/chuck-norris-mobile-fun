import { Body, Card, CardItem, Left, Text, Thumbnail } from 'native-base';
import * as React from 'react';
import { Joke } from '../model/Joke';
import { Image } from 'react-native';
import { capitalize } from '../util/Capitalize';

export function SingleJoke(props: { joke: Joke }) {
  return (
    <Card style={{ elevation: 3 }}>
      <CardItem>
        <Left>
          <Thumbnail source={{ uri: props.joke.iconUrl }} />
          <Body>
            <Text>{capitalize(props.joke.category) || 'Random'} joke :)</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image
          resizeMode={'contain'}
          style={{ height: 150, flex: 1 }}
          source={require('../../assets/chucknorris_logo.png')}
        />
      </CardItem>
      <CardItem bordered button>
        <Body>
          <Text>{props.joke.value}</Text>
        </Body>
      </CardItem>
    </Card>
  );
}
