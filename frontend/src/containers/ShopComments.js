import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Card from '../styles/Card';

const ShopComments = (props) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`/users/comments/${props.shopId}`)
      .then((response) => {
        if (response.data.length > 0) {
          let commentsArray = [];
          response.data.forEach((comment) => {
            commentsArray.push(comment);
            axios
              .get(`/users/${comment.userId}`)
              .then((response) => {
                commentsArray[comment.id - 1]['username'] =
                  response.data[0].username;

                setComments((oldComments) => [
                  ...oldComments,
                  commentsArray[comment.id - 1],
                ]);
              })
              .catch((error) => console.log(error));
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.shopId, props.showCommentForm]);

  if (comments.length > 0) {
    return comments.map((comment) => {
      return (
        <Card key={comment.id} nohover>
          <p>{comment.username}</p>
          <p>{comment.comment}</p>
        </Card>
      );
    });
  } else {
    return <Card>No comments! Leave one?</Card>;
  }
};

export default ShopComments;
