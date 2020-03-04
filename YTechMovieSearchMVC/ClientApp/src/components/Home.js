import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
    displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = { name: '' };
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        let value = e.target.value;

        this.setState({
            [name]: value
        });
    }
    submit(e) {
        e.preventDefault();

        fetch('https://www.omdbapi.com/?apikey=d68a562e&s=' + this.state.name).then(response => response.json())
            .then(data => {
            console.log(data.Search.length>5);
            //console.log(x.data);
            //console.log(x.data);
            this.setState({
            });
        });
    }
  render() {
      return (
      <div className="center">
              <label>
                  Movie Name:
              </label>
              <input type="text" onChange={this.handleChange} name="name" value={this.state.name} />
              <Link className="btn btn-primary" to={"/search/" + this.state.name +"/1"}>Search Movie</Link>
      </div>
    );
  }
}
