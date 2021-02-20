import React, { Component, createContext } from "react";
import { Redirect, useParams, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import sampleItems from './sampleItems';

import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
import {firebaseApp} from './firebase';

var firebaseDatabase = firebaseApp.database();
var firebaseStorageRef = firebase.storage().ref();


// Helper functions
function uploadGridToDatabase(array) {
  firebaseDatabase.ref('/grids/' + 1).set({
    grid: array
  })
}

function move(array, oldIndex, newIndex) {
  if (newIndex >= array.length) {
    newIndex = array.length - 1;
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  uploadGridToDatabase(array);
  return array;
}

function moveElement(array, index, offset) {
  const newIndex = index + offset;

  return move(array, index, newIndex);
}

// Context

const GridContext = createContext({ items: [] });

export class GridProvider extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      items: sampleItems,
      moveItem: this.moveItem,
      setItems: this.setItems
    };
  }
  // let { userid } = useParams();
  componentDidMount() {
    // const { match: { params } } = this.props;
    // console.log(params.id)
    // let { id } = useParams();
    // const { handle } = this.props.match.params
    
    console.log("grid context");
    console.log(this.props);
    this.getGrid();
    // console.log(id)
    // console.log(this.state)
  }
  getGrid() {
    console.log("grid")
    const { match, location, history } = this.props;
    console.log(this.props)
    // console.log(this.props.match.params)
    // console.log(userid)
    // console.log(this.props.match.params.id)
    // console.log(userid)
    var gridRef = firebase.database().ref('grids/' + 1);
    gridRef.on('value', (snapshot) => {
      const data = snapshot.val();
      this.setState({ items: data.grid })
    });
  }
  render() {
    return (
      <GridContext.Provider value={this.state}>
        {this.props.children}
      </GridContext.Provider>
    );
  }

  setItems = items => this.setState({ items });

  moveItem = (sourceId, destinationId) => {
    const sourceIndex = this.state.items.findIndex(
      item => item.id === sourceId
    );
    const destinationIndex = this.state.items.findIndex(
      item => item.id === destinationId
    );
    // If source/destination is unknown, do nothing.
    if (sourceId === -1 || destinationId === -1) {
      return;
    }
    const offset = destinationIndex - sourceIndex;
    this.setState(state => ({
      items: moveElement(state.items, sourceIndex, offset)
    }));
  };

}

// export default withRouter(connect()(GridContext));
export default GridContext;
