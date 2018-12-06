import React from "react";
import { render,ReactDOM } from "react-dom";
import { BookListComponent } from './bookList';

import styles from './css/home.css';


class HomeComponent extends React.Component{

    constructor(){
        super();
        this.search = this.search.bind(this);
        this.state = {
            listVisible: false,
            books: []
        }
    };

    search(){
        let query = document.getElementById('query').value;
        // let query = ReactDOM.findDOMNode(this.refs.query).value;
        if(!query){
            alert('Search Field Cannot Be Blank');
        }else{
            fetch("https://www.googleapis.com/books/v1/volumes?q="+query)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        books: result.items
                    })
                },
                (error) => {
                    console.log(error)
                }
            )
            this.setState({
                listVisible: true
            });
        }
        
    }

    renderBooks(){
        let { listVisible,books } = this.state;
        return (books.length>0)?(
            <div>
                <BookListComponent
                visible={listVisible}
                books={books}
                />
            </div>
        ):(<span>No Books Found !!!</span>);
    }

    render(){
        return(
            <div className="container">
                <div>
                    <h2>Book Search App</h2>
                </div>
                <div style={{paddingTop: '30px'}}>
                    <input type="text" id="query" placeholder="Search book by title,aurthor" />
                    <button onClick={this.search}>Search</button>
                </div>
                {this.renderBooks()}
            </div>
        );
    }
}

render(<HomeComponent/>,window.document.getElementById("app"));