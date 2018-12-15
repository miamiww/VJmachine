const URL="http://arj247.itp.io:7000";

//GLOBAL VARIABLES
let modeState ={
  value: "0"
};
let keyWord={
  gifword: ""
}
let fgColor = {
  h: "0",
  s: "0",
  l: "0"
};
let bgColor = {
  h: "0", 
  s: "0",
  l: "0"
};
let shapes = {
  square: "0",
  circle: "0",
  triangle: "0",
  squiggle: "0",
  arc: "0",
};



//GET DOM ELEMENTS
window.addEventListener('load', function() {
  //get gif dom elements
  let gifMode = document.getElementById("gifMode");
  let getGifWord = document.getElementById("getGifWord");
  //get abstract visual dom elements
  let avMode = document.getElementById("avMode");
  //foreground colors
  let fgHue = document.getElementById("fgHue");
  let fgSat = document.getElementById("fgSat");
  let fgLig = document.getElementById('fgLig');
  //background colors
  let bgHue = document.getElementById("bgHue");
  let bgSat = document.getElementById("bgSat");
  let bgLig = document.getElementById("bgLig");
  //shapes
  let square = document.getElementById("square");
  let circle = document.getElementById("circle");
  let triangle = document.getElementById("triangle");
  let squiggle = document.getElementById("squiggle");
  let arc = document.getElementById("arc");


  //set gif mode
  gifMode.addEventListener('click', function() {
    //can't have both modes on at the same time
    if (gifMode.checked && avMode.checked) {
      gifMode.checked = true;
      avMode.checked = false;
    }
    if (gifMode.checked) {
      //gif mode on
      modeState.value = "1";
    } else {
      //both modes off
      modeState.value = "0";
    }
    let value = modeState.value;
    console.log("POST", modeState);
    axios({
      method: 'post',
      url: URL + "/mode",
      data:{
        value 
      }
    })
  });

  //set abstract visual mode
  avMode.addEventListener('click', function() {
    //can't have both modes on at the same time
    if (gifMode.checked && avMode.checked) {
      gifMode.checked = false;
      avMode.checked = true;
    }
    if (avMode.checked) {
      //visual mode on
      modeState.value = "2";
    } else {
      //both modes off
      modeState.value = "0";
    };
    // console.log("POST", modeState);
    let value = modeState.value;
 
    axios({
      method: 'post',
      url: URL+"/mode",
      data:{
        value
      }
    })
  });

  //get the gif keyword
  getGifWord.addEventListener('keyup', function(e) {
    e.preventDefault();
    //post when user hits enter
    //field cannot be empty
    if (e.keyCode === 13 && this.value != "") {
      console.log("POST", this.value);
      let word = this.value;
      axios({
        method: 'post',
        url: URL+"/gifword",
        data:{
          word
        }
      });
    }
  });

  //for all slider inputs
  //post updated color objects
  function bgpostSlider(elemName, key, obj) {
    elemName.addEventListener('mouseup', function() {
      obj[key] = this.value;
      console.log("POST", obj);
      axios({
        method: 'post',
        url: URL + "/background",
        data: bgColor
      })
    });
  }

  function fgpostSlider(elemName, key, obj) {
    elemName.addEventListener('mouseup', function() {
      obj[key] = this.value;
      console.log("POST", obj);
      axios({
        method: 'post',
        url: URL + "/foreground",
        data: fgColor
      })
    });
  }
  fgpostSlider(fgHue, "h", fgColor);
  fgpostSlider(fgSat, "s", fgColor);
  fgpostSlider(fgLig, "l", fgColor);

  bgpostSlider(bgHue, "h", bgColor);
  bgpostSlider(bgSat, "s", bgColor);
  bgpostSlider(bgLig, "l", bgColor);

  //for all checkboxes
  //post updated shape object
  function postCheckbox(shapeName, key, obj) {
    shapeName.addEventListener("click", function() {
      if(this.checked){
        obj[key] = "1";
      } else{
        obj[key] = "0";
      }
  
      console.log("POST", obj);
      axios({
        method: 'post',
        url: URL + "/shapes",
        data: shapes
      })
    });
  }

  postCheckbox(square, "square", shapes);
  postCheckbox(circle, "circle", shapes);
  postCheckbox(triangle, "triangle", shapes);
  postCheckbox(squiggle, "squiggle", shapes);
  postCheckbox(arc, "arc", shapes);

});
