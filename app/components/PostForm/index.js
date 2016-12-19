/**
*
* PostForm
*
*/

import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import styles from './styles.css';

class PostForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
    this.sendPost = this.sendPost.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeContent = this.changeContent.bind(this);
  }

  sendPost(e) {
    e.preventDefault();
    const post = { ...this.state };
    this.props.createList(post);
  }

  changeTitle(e) {
    const title = e.target.value;
    this.setState({ title: title.trim() });
  }

  changeContent(e) {
    const description = e.target.value;
    this.setState({ description: description.trim() });
  }

  render() {
    console.log("post props: ",this.props);
    return (
      <div>
        <input type="text" onChange={this.changeTitle} placeholder="title" />
        <input type="text" onChange={this.changeContent} placeholder="description" />
        <button onClick={this.sendPost}>Submit Post</button>
        {/*<PostList />*/}
      </div>
    );
  }
}

const POST_MUTATION = gql`
  mutation createList($title: String!, $description: String!) {
    createList(
      list: {
        title: $title,
        description: $description
      }
    ) {
      _id
      title
      description
      author {
        _id
        username
      }
    }
  }
`;

// const withMutations = graphql(POST_MUTATION, {
//   props({ ownProps, mutate }) {
//     return {
//       createPost({ title, description }) {
//         return mutate({
//           variables: { title, description },
//           optimisticResponse: {
//             __typename: 'Mutation',
//             createPost: {
//               __typename: 'Post',
//               title: title,
//               description: description,
//             },
//           },
//           updateQueries: {
//             Post: (previousResult, { mutationResult }) => {
//               console.log("mutationResult: ",mutationResult);
//               const newPost = mutationResult.data.createPost;
//               return Object.assign(previousResult, {
//                 entry: {
//                   posts: {
//                     $unshift: [newPost],
//                   },
//                 },
//               });
//             },
//           },
//         });
//       },
//     };
//   },
// });

const withMutations = graphql(POST_MUTATION, {
  props({ mutate }) {
    return {
      createList({ title, description }) {
        return mutate({
          variables: { title, description },
        })
        .then(result => console.log("post: ", result));
      },
    };
  },
});

export default withMutations(PostForm);
