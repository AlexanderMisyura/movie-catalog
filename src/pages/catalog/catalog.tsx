import { MovieGrid } from '@/components';

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

  return (
    <>
      <title>Movie Catalog</title>

      <div style={{ alignSelf: 'flex-start' }}>
        You searched for: {searchTerm} <span>338 results</span>
      </div>

      <MovieGrid movies={tempMovies} />

      <p>pagination</p>
    </>
  );
};
