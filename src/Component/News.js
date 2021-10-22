import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  
  static defaultProps = {
    country : 'in',
    pageSize : 6,
    category : 'general'
  }

  static propTypes ={
    country :  PropTypes.string,
    pageSize : PropTypes.number,
    category :  PropTypes.string
  }

  capitalizeFirstletter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
   document.title= `${this.capitalizeFirstletter(this.props.category)} - NewsMonkey`;
  }
  async upDateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0be12ee02a4f4ba6852364285f969e3f&pageSize=${this.props.pageSize}`;
    this.setState({loading:true}) 
    let data = await fetch(url);
    let parsedata = await data.json()
    this.setState({articles : parsedata.articles, 
      totalResults: parsedata.totalResults, 
      loading:false
    })
    this.props.setProgress(100);
  }

  
  async componentDidMount() {
    this.upDateNews();
}

  fetchMoreData = async()=>{
  this.setState({page: this.state.page + 1})
   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0be12ee02a4f4ba6852364285f969e3f&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedata = await data.json()
    this.setState({articles : this.state.articles.concat(parsedata.articles), 
      totalResults: parsedata.totalResults, 
      loading:false
    })
}
  
  render() {
    return (
      <>
      <h1 className='text-center' style={{ margin: '35px 0px' }}>
        NewsMonkey - Top {this.capitalizeFirstletter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}


        <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >

          <div className="container">
          <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4 my-4" key={element.url}>
                <NewsItem
                  title={element.title?element.title.slice(0, 40):""}
                  description={element.description?element.description.slice(0, 82):""}
                  ImageUrl={element.urlToImage?element.urlToImage:""}
                  Newsurl={element.url?element.url:""}
                  author= {element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                  />
              </div>
            );
          })
          }
        </div>
        </div>
        </InfiniteScroll>
        </>
    );
  }
}

export default News;
