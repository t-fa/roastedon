import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import Button from '../../styles/Button';
import * as colors from '../../styles/Colors';
import { Label, Span } from '../../styles/Input';

const TextArea = styled.textarea`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;

  width: 100%;
`;

const ShopCommentForm = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`/users/comments/${props.id}`, {
        comment: data.comment,
        userId: props.userId,
      })
      .then(props.show())
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label>
        Leave a comment
        <TextArea
          ref={register({ required: true })}
          name="comment"
          rows="7"
          placeholder="Write something"
        ></TextArea>
      </Label>
      {errors.comment && <Span>This field is required.</Span>}
      <Button type="submit" color={colors.success}>
        Share your thoughts
      </Button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(ShopCommentForm);
