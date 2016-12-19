/**
*
* PostList
*
*/

import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Comments from 'components/Comments';
import styles from './styles.css';

class PostList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    console.log("props: ",this.props);
    const { loading, posts } = this.props;

    if (loading) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }

    return (
      <div style={{ padding: '1em' }}>
        <h1>Posts</h1>
        {posts ?
          posts.map((post) =>
            <div key={post._id} style={{ width: '400px', display: 'inline-block', margin: '0.5em', padding: '1em', border: '1px solid #CCC', borderRadius: '5px', boxShadow: '2px 2px 2px rgba(100, 100, 100, 0.3)' }}>
              {post.title ? <p>{post.title}</p> : 'no title'}
              {post.content ? <p>{post.content}</p> : 'no content'}
              {post.imageUrl ? <img src={post.imageUrl} width={100} height={100} /> : ''}
              {post.description ? <p>{post.description}</p> : ''}
              <Comments comments={post.comments} postId={post._id} />
            </div>
          )
          :
          'No posts'
        }
      </div>
    );
  }
}

const FeedQuery = gql`
  query posts {
    posts {
      _id
      text
      createdAt
      author {
        _id
        username
      }
      content {
        ... on List {
          _id
          title
          description
        }
      }
      comments(limit: 2) {
        _id
        content
      }
    }
  }
`;

export default graphql(FeedQuery, {
  options: { },
  props({ data: { loading, posts } }) {
    return { loading, posts };
  },
})(PostList);
