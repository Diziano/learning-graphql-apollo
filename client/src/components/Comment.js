import React, { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const DELETE_COMMENTS = gql`
  mutation DeleteComment($id: String!) {
    deleteComments(id: $id) {
      id
    }
  }
`;

export default function Comment({
  id, name, content, onDelete,
}) {
  const [deleteComment] = useMutation(DELETE_COMMENTS);

  const handleDelete = useCallback(() => {
    deleteComment({ variables: { id } });
    onDelete();
  }, [deleteComment, onDelete, id]);

  return (
    <div className="comment">
      <p className="comment-name">
        Nome:
        {name}
      </p>
      <p>{content}</p>
      <button type="button" onClick={handleDelete}>x</button>
    </div>
  );
}
