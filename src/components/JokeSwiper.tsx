import * as React from 'react';
import { useEffect, useState } from 'react';
import { DeckSwiper } from 'native-base';
import { SingleJoke } from './SingleJoke';
import { Joke } from '../model/Joke';

export const JokeSwiper = (props: { category: string }) => {
  const [jokeList, setJokeList] = useState<Array<Joke>>([]);

  function callJokesApi() {
    const url = 'https://api.chucknorris.io/jokes/random' + (!!props.category ? '?category=' + props.category : '');
    fetch(url)
      .then(response => response.json())
      .then(result =>
        setJokeList([
          ...jokeList,
          {
            iconUrl: result.icon_url,
            id: result.id,
            url: result.url,
            value: result.value,
            category: props.category
          }
        ])
      );
  }

  useEffect(() => callJokesApi(), [props.category]);

  return (
    <DeckSwiper
      dataSource={jokeList}
      renderItem={item => <SingleJoke joke={item} />}
      onSwipeLeft={() => callJokesApi()}
      onSwipeRight={() => callJokesApi()}
    />
  );
};
