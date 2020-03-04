import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Search extends Component {
  displayName = Search.name

  constructor(props) {
      super(props);
      let detail = this.props.location.pathname.includes("detail");
      let id = 0;
      if (detail) {
          id = parseInt(props.match.params.id);
      }
      this.state = { id:id,detail: detail,name: props.match.params.name,loading: true,page:1,totalpage:1,totallist:[],page1list:[],page2list:[] };
      document.getElementsByTagName("BODY")[0].classList.remove("backimage");
      fetch('https://www.omdbapi.com/?apikey=d68a562e&s=' + props.match.params.name).then(response => response.json())
          .then(data => {
              console.log(data.Search.length > 5);
              let totallist = this.state.totallist;
              let page1list = this.state.page1list;
              let page2list = this.state.page2list;
              if (data.Search.length > 0)
              {
                  if (data.Search.length > 5) {
                      this.setState({ totalpage: 2 });
                  }
                  data.Search.map((movie, i) => {
                      var omovie = {
                          id: i,
                          title: movie.Title,
                          year: movie.Year,
                          url: movie.Poster
                      };
                      totallist.push(omovie);
                      if (i < 5) {
                          page1list.push(omovie);
                      }
                      else {
                          page2list.push(omovie);
                      }
                  });
                  console.log(totallist);
                  console.log(page1list);
                  console.log(page2list);
              }
              this.setState({
                  loading: false,
                  totallist: totallist,
                  page1list: page1list,
                  page2list: page2list
              });
          });
  }

  static getDerivedStateFromProps(props, nextProps, state) {
      console.log(props.match.params.page);
      if (!isNaN(parseInt(props.match.params.page))) {
          nextProps.page = parseInt(props.match.params.page);
          nextProps.select = false;
      }
        return nextProps;
    }

  static renderSearch(searchlist,name,totalpage) {
    return (
      <table className='table'>
        <tbody>
          {searchlist.map(movie =>
            <tr key={movie.id}>
              <td><Link to={"/detail/"+ name+"/" +movie.id}><img src={movie.url} style={{height:'50px'}} /></Link></td>
              <td colSpan={7}><Link to={"/detail/"+ name+"/" +movie.id}>{movie.title}</Link></td>
              <td>{movie.year}</td>
            </tr>
          )}
        <tr>
            <td colSpan={3}></td>
            <td><Link className="btn btn-primary" to={"/search/" + name +"/1"}>1</Link></td>
            {totalpage===2?<td><Link className="btn btn-primary" to={"/search/" + name +"/2"}>2</Link></td>:""}
            <td colSpan={3}></td>
        </tr>
        </tbody>
      </table>
    );
  }

    static renderDetail(id, totallist) {
    return (
        <table className='table'>
            {totallist.map(movie => {
                    if (movie.id === id) {
                    <tbody>
                        <tr>
                            <td colSpan={7}>{movie.title}</td>
                            <td>{movie.year}</td>
                        </tr>
                        <tr>
                            <td><img src={movie.url} style={{ height: '50px' }} /></td>
                        </tr>
                    </tbody>
                }
                }
                )}
        </table>
        );
  }

  render() {
    let {page,totalpage,name,detail,id}=this.state;
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : page===1? Search.renderSearch(this.state.page1list,name,totalpage):Search.renderSearch(this.state.page2list,name,totalpage);
      let details = Search.renderDetail(id,this.state.totallist);
    return (
      <div>
        <h1>{detail?"details":"Search Results"}</h1>
        {detail?details:contents}
      </div>
    );
  }
}
