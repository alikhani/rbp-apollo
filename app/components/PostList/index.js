/**
*
* PostList
*
*/

import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import styles from './styles.css';

class PostList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    console.log("props: ",this.props);
    const { loading, allPosts } = this.props;

    if (loading) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }

    return (
      <div>
        <h1>Posts</h1>
        {allPosts ?
          allPosts.map((post) =>
            <div key={post.id}>
              <img src={post.imageUrl} width={100} height={100} />
              <span>{post.description}</span>
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
  query Posts {
    allPosts {
      id
      imageUrl
      description
    }
  }
`;

export default graphql(FeedQuery, {
  options: {},
  props({ data: { loading, allPosts } }) {
    return { loading, allPosts };
  },
})(PostList);
