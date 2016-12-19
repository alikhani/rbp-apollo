/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { setViewer } from './actions';

import styles from './styles.css';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    const { loading, viewer } = this.props;
    console.log("viewer: ",this.props);

    return (
      <div className={styles.container}>
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

const ViewerQuery = gql`
  query viewer {
    viewer {
      _id
      username
    }
  }
`;

// const withViewer = graphql(ViewerQuery, {
//   options: { },
//   props({ ownProps, data: { loading, viewer } })
//     .then(),
// })(App);

export default graphql(ViewerQuery, {
  options: { },
  props({ data: { loading, viewer } }) {
    return { loading, viewer };
  },
})(App);

// function mapDispatchToProps(dispatch) {
//   return {
//     setViewer: () => dispatch(setViewer()),
//     dispatch,
//   };
// }
//
// const mapStateToProps = createStructuredSelector({
//   token: selectToken(),
//   currentUser: selectCurrentUser(),
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(App);
//
// const withCloneList = graphql(CLONE_LIST, {
//   props: ({ ownProps, mutate }) => ({
//     cloneList() {
//       return mutate()
//         .then(result => {
//           ownProps.onSelectList(result.id);
//         });
//     },
//   }),
// });
// const ListWithData = withCloneList(List);

// export default connect(
//   (state) => ({ viewer: state.viewer }),
//   (dispatch) => ({
//     onSetViewer(viewer) {
//       dispatch(setViewer(viewer));
//     }
//   }),
// )(withViewer);
