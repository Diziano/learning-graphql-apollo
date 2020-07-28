import React, { useState, useCallback } from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const SAVE_COMMENT = gql`
  mutation save($input: CommentInput) {
    saveComment(input: $input) {
      id
    }
  }
`;

export default function Form({ onAddComment }) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const [addComment] = useMutation(SAVE_COMMENT, {
    variables: {
      input: {
        name,
        content,
      },
    },
  });

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    await addComment();
    setName('');
    setContent('');
    onAddComment();
  }, [addComment, onAddComment]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Digite o seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Digite o seu comentário"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Comentar</button>
    </form>
  );
}
