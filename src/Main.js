import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import DragItem from "./DragItem";
import { Grid, GridImage, GridItem } from "./Grid";
import GridContext from "./GridContext";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
import {firebaseApp} from "./firebase.js";

var firebaseDatabase = firebaseApp.database();
var firebaseStorageRef = firebase.storage().ref();


function Main(props) {
  const [isAuth, setIsAuth] = useState(true);
  const { items, moveItem } = useContext(GridContext);
  if (isAuth) {
    console.log("isAuth")
    console.log(props.location.search)
  }
  if(!isAuth) {
    return <Redirect to="/login"/>
  }
  // const [state, setState] = useState({
  //  itemsState: items
  // });
  function uploadGridToDatabase(array) {
    firebaseDatabase.ref('/grids/' + 1).set({
      grid: array
    })
  }
  function fileUpload(event, items, item, index) {
    console.log(items)
    const file = event.target.files[0]; 
    console.log(file)
    const name = (+new Date()) + '-' + file.name;
    const metadata = { contentType: file.type };
    const task = firebaseStorageRef.child(name).put(file, metadata);
    task
      .then(res => {
        const image = firebaseStorageRef.child(name);
        const urlPromise = image.getDownloadURL();
        urlPromise.then(url => {
          console.log(url)
          items[index].src = url;
          // setItems(items)
          uploadGridToDatabase(items)
        })  
      })
  }
  return (
    <div className="Main">
      <button onClick={() => setIsAuth(false)}>Log Out</button>
      <div>isAuth: {isAuth.toString()}</div>
      <Grid>
        {items.map((item, index) => (
          <DragItem key={item.id} id={item.id} onMoveItem={moveItem}>
            <GridItem userid={props.location.search}>
              <GridImage src={item.src}>
                <input style={{opacity: 0, width: "100%", height: "100%"}} title="" type="file" 
                  onChange={(e) => {
                    fileUpload(e, items, item, index)
                }}/>
              </GridImage>
            </GridItem>
          </DragItem>
        ))}
      </Grid>
    </div>
  );
}

export default Main;