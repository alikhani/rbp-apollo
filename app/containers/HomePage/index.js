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
import gql from 'graphql-tag';

import PostList from 'components/PostList';

class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      token: false,
    };
    this.signIn = this.signIn.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  signIn(e) {
    e.preventDefault();
    const credentials = { ...this.state };
    this.props.signinUser(credentials);
    // this.setState({ username: '', password: '' });
  }

  changeEmail(e) {
    const email = e.target.value;
    this.setState({ email: email.trim() });
  }

  changePassword(e) {
    const password = e.target.value;
    this.setState({ password: password.trim() });
  }

  render() {
    console.log("props: ",this.props);
    return (
      <div>
        <input type="text" onChange={this.changeEmail} placeholder="email" />
        <input type="text" onChange={this.changePassword} placeholder="password" />
        <button onClick={this.signIn}>Login</button>
        <PostList />
      </div>
    );
  }
}

const SIGNIN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signinUser(
      email: {
        email: $email,
        password: $password
      }
    ) {
      token,
      user { email }
    }
  }
`;

const withMutations = graphql(SIGNIN_MUTATION, {
  props({ mutate }) {
    return {
      signinUser({ email, password }) {
        return mutate({
          variables: { email, password },
        })
        .then(result => console.log("user: ", result.data.signinUser));
      },
    };
  },
});

export default withMutations(HomePage);
