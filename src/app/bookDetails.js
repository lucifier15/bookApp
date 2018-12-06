import React from "react";
import { render } from 'react-dom';

export class BookDetails extends React.Component{

    renderImage(){
        let { details } = this.props; 
        return (details.volumeInfo.imageLinks)?
                (<img src={details.volumeInfo.imageLinks.thumbnail} alt="" />):
                null
    }

    renderAuthors(){
        let { details } = this.props; 
        return (details.volumeInfo.authors)?
                (
                    details.volumeInfo.authors.map((author,idx)=>{
                        return(
                            <span key={idx}>{author} ,</span>
                        );
                    })
                ):
                (<span>No authors found</span>)
    }

    render(){
        let { details } = this.props;
        console.log(details);
        return(
            <div id="myModal" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4 className="modal-title">{details.volumeInfo.title}</h4>
                        </div>
                        <div className="modal-body">
                        {this.renderImage()}<br /><br />
                        <p><b>Authors</b> : {this.renderAuthors()}</p>
                        <p><b>Publisher</b> : {details.volumeInfo.publisher}</p>
                        <p>{details.volumeInfo.description}</p>
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}