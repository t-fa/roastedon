import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Card from '../styles/Card';
import ShopCommentEditForm from '../components/Shops/ShopCommentEditForm';

const Button = styled.button`
  background-color: inherit;
  color: grey;
  border: none;
  font-weight: bold;
`;

const ShopComments = (props) => {
  const [comments, setComments] = useState([]);
  const [displayEdit, setDisplayEdit] = useState(false);
  const [edited, setEdited] = useState(false);

  // load comments
  useEffect(() => {
    setComments([]);
    axios
      .get(`/users/comments/${props.shopId}`)
      .then((response) => {
        if (response.data.length > 0) {
          let commentsArray = [];
          for (let i = 0; i < response.data.length; i++) {
            commentsArray.push(response.data[i]);
            axios
              .get(`/users/${response.data[i].userId}`)
              .then((response) => {
                commentsArray[i]['username'] = response.data[0].username;

                setComments((oldComments) => [
                  ...oldComments,
                  commentsArray[i],
                ]);
              })
              .catch((error) => console.log(error));
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.shopId, props.showCommentForm, edited, props.userId]);

  const toggleEdit = () => {
    setDisplayEdit(!displayEdit);
    setEdited(false);
  };

  const submitEdit = () => {
    setEdited(true);
  };

  const deleteComment = (commentId) => {
    axios
      .delete(`/users/comments/${commentId}`)
      .then(() => {
        let commentsArr = comments;
        commentsArr = commentsArr.filter((comment) => comment.id !== commentId);
        setComments(commentsArr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (comments.length > 0) {
    return comments.map((comment) => {
      console.log(comment);
      console.log(props.userId);
      return (
        <Card key={comment.id}>
          <p>{comment.username}</p>
          <p>{comment.comment}</p>
          {comment.userId.toString() === props.userId && (
            <div>
              <Button onClick={toggleEdit}>edit</Button>
              <Button onClick={() => deleteComment(comment.id)}>delete</Button>
            </div>
          )}
          {displayEdit && (
            <ShopCommentEditForm
              id={comment.id}
              show={toggleEdit}
              comment={comment.comment}
              edited={submitEdit}
            />
          )}
        </Card>
      );
    });
  } else {
    return <Card>No comments! Leave one?</Card>;
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(ShopComments);
