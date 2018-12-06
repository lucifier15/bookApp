import React from "react";
import { render } from 'react-dom';
import styles from './css/bookList.css';
import { BookDetails } from "./bookDetails";

export class BookListComponent extends React.Component{
    constructor(props){
        super(props);
        this.state=({
            bookVisible: false,
            activeBook: {}
        });
        this.showBook = this.showBook.bind(this);
    };

    showBook(book){
        // console.log(book);
        this.setState({
            activeBook: book,
            bookVisible: true
        })
    }

    renderBookDetailsPopup(){
        let { activeBook,bookVisible } = this.state;
        return (bookVisible)?(
            <div>
                <BookDetails
                details={this.state.activeBook}
                />
            </div>
        ): null;
    }

    renderBookList(){
        let {books} = this.props;
        return (
            <div>{books && books.map((book,index)=>{
                let image_url='';
                if(!book.volumeInfo.imageLinks){
                    image_url = 'http://www.bsmc.net.au/wp-content/uploads/No-image-available.jpg';
                }else{
                    image_url = book.volumeInfo.imageLinks.thumbnail;
                }
            return(
                <div key={index} className="col-xs-18 col-sm-6 col-md-4">
                    <div className="thumbnail">
                        <img src={image_url} alt="" />
                        <div className="caption">
                            <span>
                                <h4>{book.volumeInfo.title}</h4>
                            </span>
                            <p>
                                <a href="#" className="btn btn-info btn-xs" role="button" data-toggle="modal" data-target="#myModal" onClick={() => this.showBook(book)}>
                                    Read More
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                );
            })
        }
        </div>
        );  
    }

    render(){
        let { visible,books } = this.props;
        let display='none';
        if(visible){
            display= 'block';
        }
        return(
            <div style={{display:display}} className="row">
                {this.renderBookList()}
                {this.renderBookDetailsPopup()}
            </div>
        );
    }
}