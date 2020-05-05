import React from 'react';
import MovieLists from '../components/MovieLists';
import { Link } from 'react-router-dom';
import Button from '../components/Button.js';
import HeaderSmall from '../components/HeaderSmall';
import '../styles/Result.css';
import Drawer from '../components/Drawer';

class Result extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      getInfo: false,
      matchList: this.props.matchList,
      filmId: null,
      renderedDrawer: false
    };
  }

  closeDrawer = () => {
    this.setState({ getInfo: false });  
    };

  getDrawer = (e) => {
    this.setState({ filmId: e.target.id, getInfo: true, renderedDrawer: true});
  }

  render () {
    return (
      <div className='result'>
        {this.state.matchList.length === 0 ? (
          <>
            <div className='centered'>
              <HeaderSmall />

              <h2 className='subtitle'>Oh non, vous n’avez aucun match !</h2>
              <Link to='/matchroom'>
                <Button content="Continuer d'explorer la liste" className='button' />
              </Link>
            </div>
            <MovieLists />
          </>
        ) : (
          <>
            <div className='centered'>
              <HeaderSmall />
              <h2 className='title'>{this.state.matchList.length === 1 ? 'Bravo, vous avez 1 match !' : `Bravo, vous avez ${this.state.matchList.length} matchs !`}</h2>
              <div className='matched-movie-container'>
                {this.state.matchList.map((film) => {
                  return (
                    <div
                      className='matched-movie'
                      style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4)), url(http://image.tmdb.org/t/p/w342/${film.poster_path})` }}
                      key={film.id}
                      id={film.id}
                      onClick={this.getDrawer}
                    />
                  );
                })}
              </div>
              {this.state.renderedDrawer && <Drawer matchList={this.state.matchList} getInfo={this.state.getInfo} handleCloseDrawer={this.closeDrawer} filmId={this.state.filmId}/>}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Result;
