import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Comment from '../components/Comment';
import Form from '../components/Form';

import './styles.css';

const GET_COMMENTS = gql`
  query {
    comments {
      id
      name
      content
    }
  }
`;

function Home() {
  const {
    loading, error, data, refetch,
  } = useQuery(GET_COMMENTS);

  if (error) return 'Erro ao buscar os comentários.';

  return (
    <>
      <h1>GraphQL Comments</h1>
      <Form onAddComment={refetch} />
      {loading ? (
        'Carregando...'
      ) : (
        <section className="comments">
          {data.comments.map(({ id, name, content }) => (
            <Comment
              key={id}
              id={id}
              name={name}
              content={content}
              onDelete={refetch}
            />
          ))}
        </section>
      )}
    </>
  );
}

export default Home;
