import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);


    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        // console.log(this.state.page);
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        // console.log(parsedData);
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
        document.title = `${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - NewsMonkey`;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // async componentDidMount() {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=25237a0478114d0caa5442538bbd898a&page=1&pageSize=${props.pageSize}`;


    //     // this.setState({ loading: true });
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // // console.log(parsedData);
    //     // this.setState({
    //     //     articles: parsedData.articles,
    //     //     totalResults: parsedData.totalResults,
    //     //     loading: false
    //     // })
    //     // console.log(parsedData);
    //     this.updateNews();
    // }

    // const handlePrevClick = async () => {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=25237a0478114d0caa5442538bbd898a&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
    //     // this.setState({ loading: true });
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // // console.log(parsedData);
    //     // this.setState({
    //     //     page: this.state.page - 1,
    //     //     articles: parsedData.articles,
    //     //     loading: false
    //     // })
    //     setPage(page - 1);
    //     updateNews();

    // }

    // const handleNextClick = async () => {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=25237a0478114d0caa5442538bbd898a&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    //     // this.setState({ loading: true });
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // // console.log(parsedData);
    //     // this.setState({
    //     //     page: this.state.page + 1,
    //     //     articles: parsedData.articles,
    //     //     loading: false
    //     // })

    //     setPage(page + 1);
    //     updateNews();
    // }

    const fetchMoreData = async () => {
        // console.log(this.state.page);
        // await this.setState({ page: this.state.page + 1 ,});
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        // console.log(this.state.page+1);
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        // console.log(parsedData);


        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        setPage(page + 1)
    };


    return (
        <>
            <h1 className='text-center' style={{ marginTop: '80px' }} >NewsMonkey - {props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner></Spinner>}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>

            </InfiniteScroll>

            {/* <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button type="button" disabled={this.state.page >= Math.ceil(this.state.totalResults / props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
        </>
    )

}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
