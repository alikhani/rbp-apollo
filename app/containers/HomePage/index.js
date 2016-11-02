/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import gql from 'graphql-tag';

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

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
        <h1><FormattedMessage {...messages.header} /></h1>
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
})(HomePage);
