/**
*
* Comments
*
*/

import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import styles from './styles.css';

class Comments extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
    this.sendComment = this.sendComment.bind(this);
    this.changeContent = this.changeContent.bind(this);
  }

  sendComment(e) {
    e.preventDefault();
    const content = this.state.content;
    const postId = this.props.postId;
    console.log("postId: ",postId,", content: ",content);
    const comment = {
      postId,
      content
    };
    console.log("comment: ",comment);
    this.props.createComment(comment);
  }

  changeContent(e) {
    const content = e.target.value;
    this.setState({ content: content.trim() });
  }

  render() {
    console.log("comment props: ",this.props);
    const { comments } = this.props;
    return (
      <div className={styles.comments}>
        <div>
          {comments.map((comment) =>
            <div key={comment._id}>{comment.content}</div>
          )}
        </div>
        <input type="text" onChange={this.changeContent} placeholder="content" />
        <button onClick={this.sendComment}>Submit Comment</button>
      </div>
    );
  }
}

const COMMENT_MUTATION = gql`
  mutation createComment($postId: String!, $content: String!) {
    createComment(
      postId: $postId,
      content: $content
    ) {
      _id
      content
      createdAt
      author {
        _id
        username
      }
    }
  }
`;

const withMutations = graphql(COMMENT_MUTATION, {
  props({ mutate }) {
    return {
      createComment({ postId, content }) {
        console.log("in mutation: postId: ",postId,", content: ",content);
        return mutate({
          variables: { postId, content },
        })
        .then(result => console.log("post: ", result));
      },
    };
  },
});

export default withMutations(Comments);
