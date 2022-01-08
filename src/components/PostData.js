import React from 'react';

const postData = async photoData => {
  let image = {
    uri: photoData.uri,
    type: 'image/jpeg',
    name: 'photo.jpg',
  };
  const data = new FormData();
  data.append('image', image);
  let response = await fetch(
    'https://product-detecting.herokuapp.com/api/image',
    {
      method: 'POST',
      body: data,
    },
  );
  console.log('Post data response: ', response);
  let json = await response.json();
  console.log('in postData:', response, json);
  return json;
};

export default postData;
