import React from 'react';

const handleResponse = ({target}) => {
  console.log(target.responseText);
};

const postData = photoData => {
  let image = {
    uri: photoData.uri,
    type: 'image/jpeg',
    name: 'photo.jpg',
  };
  const xhr = new XMLHttpRequest();
  const data = new FormData();
  data.append('image', image);
  xhr.addEventListener('load', handleResponse);
  xhr.open('POST', 'https://product-detecting.herokuapp.com/api/image');
  xhr.send(data);
};

export default postData;
