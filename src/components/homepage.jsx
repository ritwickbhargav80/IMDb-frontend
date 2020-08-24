import React, { Component } from "react";
import axios from "axios";
import StickyVideo from "react-sticky-video";

import CustomSlider from "./common/customSlider";

import "react-sticky-video/dist/index.css";
import "../stylesheets/homepage.css";

import { getDateFunction } from "./../utils/common";
import Spinner from "./common/spinner";
import Carousel from "./common/carousel";

require("dotenv").config();

class HomePage extends Component {
  state = {
    media: { upcoming: [], trending: [], popular: [], genres: [], latest: [] },
    people: { popular: [], link: "" },
  };

  getTrailer = async (id) => {
    const { data: trailer } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    const obj = trailer.results.find((o) => o.type.toLowerCase() === "trailer");
    return obj?.key;
  };

  async componentDidMount() {
    try {
      const { data: apiGenres } = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
      );
      const { data: movies } = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`
      );
      movies.results.map(
        async (m) => (m.trailer = await this.getTrailer(m.id))
      );
      this.setState({
        media: {
          popular: movies.results,
          genres: apiGenres.genres,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  loadLink = (link) => {
    this.setState({ link });
  };

  render() {
    const { date, month } = getDateFunction();
    let { popular, genres } = this.state.media;
    let { link } = this.state;

    return (
      <div className="container">
        {link ? (
          <StickyVideo
            className="mt-4"
            url={link}
            stickyConfig={{
              position: "bottom-right",
            }}
          />
        ) : popular.length !== 0 ? (
          <Carousel movies={popular} />
        ) : (
          <Spinner />
        )}
        <h3 className="h3">What to Watch</h3>
        <div className="left-border">
          <h5 className="sub-heading">Fan Favorites</h5>
        </div>
        <p className="sub-script">This week's top TV and movies</p>
        {popular.length === 0 ? (
          <Spinner />
        ) : (
          <CustomSlider
            movies={popular}
            genres={genres}
            props={this.props}
            loadLink={this.loadLink}
          />
        )}
        <h3 className="h3 margin-bottom-10">Popular TV Shows and Movies</h3>
        {popular.length === 0 ? (
          <Spinner />
        ) : (
          <CustomSlider movies={popular} genres={genres} props={this.props} />
        )}
        <h3 className="h3">Today's Exclusive</h3>
        <div className="left-border">
          <h5 className="sub-heading">Top Coverage &gt;</h5>
        </div>
        <p className="sub-script">
          People born on {month} {date}
        </p>
      </div>
    );
  }
}

export default HomePage;
