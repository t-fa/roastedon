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
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      commentEdit: props.comment,
    },
  });

  const onSubmit = (data) => {
    axios
      .put(`/users/comments/${props.id}`, {
        commentEdit: data.commentEdit,
        id: props.id,
      })
      .then(() => {
        props.show();
        props.edited();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label>
        Edit your comment
        <TextArea
          ref={register({ required: true })}
          name="commentEdit"
          rows="7"
        ></TextArea>
      </Label>
      {errors.commentEdit && <Span>This field is required.</Span>}
      <Button type="submit" color={colors.success}>
        Revise your thoughts
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
