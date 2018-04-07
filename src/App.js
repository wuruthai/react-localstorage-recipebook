import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deneme: [
        1,
        2,
        3,
        4,
        5,
        6
      ],
      button: {
        add: false,
        edit: false,
        delete: false,
        eyes: true
      },
      addRecipe: {
        header: "",
        mats: [""]
      },
      recipes: [
        {
          header: "Domaets Çorbası",
          mats: ["şeker", "yağ", "yumurta"]
        }, {
          header: "Mercimek Çorbası",
          mats: ["şeker", "yağ", "yumurta"]
        }
      ]
    };
    this.handleClick = this.handleClick.bind(this);
    this.addChange = this.addChange.bind(this);
  }
  componentDidUpdate() {
    let recipes = this.state.recipes;
    let getLocal = JSON.parse(localStorage.getItem('myrecipes'));
    if (getLocal !== recipes) {

      localStorage.setItem("myrecipes", JSON.stringify(recipes));

    }

  }
  componentDidMount() {

    let getLocal = JSON.parse(localStorage.getItem('myrecipes'));

    if (getLocal !== null && getLocal !== undefined) {
      console.log(getLocal)
      for (let i in getLocal) {
        if (getLocal[i] === null) {
          delete getLocal[i];
        }
      }
      this.setState({recipes: getLocal})
    }

  }
  handleClick(e) {
    let id = e.target.id;
    if (id === "add") {
      this.setState({
        button: {
          add: true,
          edit: false,
          delete: false,
          eyes: false
        }
      });
    }
    if (id === "edit") {
      this.setState({
        button: {
          add: false,
          edit: true,
          delete: false,
          eyes: false
        }
      });
    }
    if (id === "delete") {
      this.setState({
        button: {
          add: false,
          edit: false,
          delete: true,
          eyes: false
        }
      });
    }
    if (id === "eyes") {
      this.setState({
        button: {
          add: false,
          edit: false,
          delete: false,
          eyes: true
        }
      });
    }
  }
  delete(i) {
    let rec = this.state.recipes;
    delete rec[i];
    this.setState({recipes: rec});
  }
  addChange(event) {
    event.preventDefault();
    let name = event.target.name;
    let value = event.target.value;
    let id = event.target.id;
    var recipe = this.state.addRecipe;
    //onChange
    if (name === "header") {
      recipe.header = value;
    }
    if (name === "list") {
      recipe.mats[id] = value;
    }
    //onClick
    if (id === "add-mat") {
      recipe.mats.push(null);
    }
    if (id === "delete-mat" && recipe.mats.length > 1) {
      recipe.mats.splice(recipe.mats.length - 1, 1);
    }
    if (id === "save") {
      if (recipe.header === "" || recipe.mats[0] === "") {
        alert("u must fill mat-1 and header");
      } else {
        this.state.recipes.push(recipe);
        this.setState({
          recipes: this.state.recipes,
          button: {
            add: false,
            edit: false,
            delete: false,
            eyes: true
          }
        });
      }
    }
    this.setState({addRecipe: recipe});
  }
  render() {
    const Add = (<div className="container" style={{
        backgroundColor: "rgb(12, 138, 130)"
      }}>
      <input name="header" type="text" placeholder="write your recipe name" style={{
          backgroundColor: "rgb(12, 138, 130)"
        }} onChange={this.addChange}/> {
        this.state.addRecipe.mats.map(function(mat, i) {
          return (<input id={i} name="list" className="item" type="text" defaultValue={""} placeholder="write your mats" onChange={this.addChange}/>);
        }.bind(this))
      }

      <div className="container-button">
        <button id="add-mat" onClick={this.addChange} style={{
            border: "3px solid black"
          }}>
          add mat
        </button>
        <button id="delete-mat" onClick={this.addChange} style={{
            border: "3px solid black"
          }}>
          delete mat
        </button>
        <button id="save" onClick={this.addChange} style={{
            border: "3px solid black"
          }}>
          save
        </button>
      </div>
    </div>);

    return (<div className="concon">
      <div className="container-button">
        <button id="add" onClick={this.handleClick} disabled={this.state.button.add}>
          Add
        </button>
        <button id="eyes" onClick={this.handleClick} disabled={this.state.button.eyes}>
          Eyes
        </button>
        <button id="edit" onClick={this.handleClick} disabled={this.state.button.edit}>
          Edit
        </button>
        <button id="delete" onClick={this.handleClick} disabled={this.state.button.delete}>
          Delete
        </button>
      </div>
      {
        this.state.button.add
          ? Add
          : null
      }
      {
        this.state.recipes.map(function(recipe, i) {
          return (<div className="container" style={{
              backgroundColor: "rgb(12, 138, 130)"
            }} onClick={() => {
              if (this.state.button.delete) {
                this.delete(i);
              }
            }}>
            <input type="text" defaultValue={recipe.header} onChange={(event) => {
                event.preventDefault();
                const changeHeader = this.state.recipes;
                changeHeader[i].header = event.target.value;
                this.setState({recipes: changeHeader})

              }} style={{
                backgroundColor: "rgb(12, 138, 130)"
              }} readOnly={this.state.button.edit
                ? false
                : true}/> {
              recipe.mats.map(function(mat, j) {
                return (<input className="item" type="text" onChange={(event) => {
                    event.preventDefault();
                    const changeMat = this.state.recipes;
                    changeMat[i].mats[j] = event.target.value;
                    this.setState({recipes: changeMat})
                  }} defaultValue={mat} readOnly={this.state.button.edit
                    ? false
                    : true}/>);
              }.bind(this))
            }
          </div>);
        }.bind(this))
      }
    </div>);
  }
}
export default App;
