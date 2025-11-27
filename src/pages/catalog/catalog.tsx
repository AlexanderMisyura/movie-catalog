import { MovieGrid } from '@/components';

import styles from './catalog.module.css';

export const Catalog = () => {
  const searchTerm = 'Batman';

  const tempMovies = [
    {
      Title: 'Batman',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg',
      imdbID: 'tt0372784',
      Type: 'movie',
      Year: '2005',
    },
    {
      Title: 'Batman',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg',
      imdbID: 'tt0372784',
      Type: 'movie',
      Year: '2005',
    },
    {
      Title: 'Batman',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg',
      imdbID: 'tt0372784',
      Type: 'movie',
      Year: '2005',
    },
    {
      Title: 'Batman',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg',
      imdbID: 'tt0372784',
      Type: 'movie',
      Year: '2005',
    },
    {
      Title: 'Batman',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg',
      imdbID: 'tt0372784',
      Type: 'movie',
      Year: '2005',
    },
    {
      Title: 'Batman',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg',
      imdbID: 'tt0372784',
      Type: 'movie',
      Year: '2005',
    },
    {
      Title: 'Batman',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg',
      imdbID: 'tt0372784',
      Type: 'movie',
      Year: '2005',
    },
    {
      Title: 'Batman',
      Poster:
        'https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg',
      imdbID: 'tt0372784',
      Type: 'movie',
      Year: '2005',
    },
  ];

  const tempResultsNumber = 338;

  return (
    <>
      <title>Movie Catalog</title>

      <div className={styles.searchLine}>
        <div className={styles.searchTitle}>
          You searched for:{' '}
          <span className={styles.searchTerm}>{searchTerm}</span>{' '}
        </div>
        <span
          className={styles.searchNumber}
        >{`${tempResultsNumber} results`}</span>
      </div>

      <MovieGrid movies={tempMovies} />

      <p>pagination</p>
    </>
  );
};
