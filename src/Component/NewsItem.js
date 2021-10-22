import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
       let { title,description,ImageUrl,Newsurl,author,date,source} = this.props;
        return (    
            <div>
                <div className="card position-relative">
                   <span className='position-absolute top-0 translate-middle badge rounded-pill bg-secondary' style={{ fontSize: '14px', color: 'white', zIndex: '1'}}> 
                        {source} </span>
                    <img src={!ImageUrl?"https://images.cnbctv18.com/wp-content/uploads/2021/02/BSE.jpg":ImageUrl} 
                    className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}
                        
                        </h5>
                        <p className="card-text">{!description?"This news description is not founded": description}</p>
                        <p className="card-text"><small className="text-muted">By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
                        <a href={Newsurl} target="_blank" rel="noreferrer" className="btn btn-danger">Read more</a>
                    </div>
                    </div>
            </div>
        )
    }
}
export default NewsItem
