// models for movie
// {"Title":"Spider-Man","Year":"2002","Rated":"PG-13","Released":"03 May 2002","Runtime":"121 min","Genre":"Action, Adventure, Sci-Fi",
// "Director":"Sam Raimi","Writer":"Stan Lee, Steve Ditko, David Koepp","Actors":"Tobey Maguire, Kirsten Dunst, Willem Dafoe",
// "Plot":"When bitten by a genetically modified spider, a nerdy, shy, and awkward high school student gains spider-like abilities that he eventually must use to fight evil as a superhero after tragedy befalls his family.",
// "Language":"English","Country":"United States","Awards":"Nominated for 2 Oscars. 16 wins & 63 nominations total","Poster":"https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg","Ratings":[{"Source":"Internet Movie Database","Value":"7.3/10"},{"Source":"Rotten Tomatoes","Value":"90%"},{"Source":"Metacritic","Value":"73/100"}],"Metascore":"73","imdbRating":"7.3","imdbVotes":"782,656","imdbID":"tt0145487","Type":"movie","DVD":"01 Nov 2002","BoxOffice":"$407,022,860","Production":"N/A","Website":"N/A","Response":"True"}
export interface IRatings {
  Source: string;
  Value: string;
}

export default class Ratings implements IRatings {
  Source: string;
  Value: string;

  constructor(source: string, value: string) {
    this.Source = source;
    this.Value = value;
  }

  static normalize(value: string): number {
    if (value.endsWith('%')) {
      const percentage = parseFloat(value.substring(0, value.length - 1));
      return percentage / 100;
    }
    if (value.endsWith('/10')) {
      return parseFloat(value.substring(0, value.length - 3));
    }
    if (value.endsWith('/100')) {
      return parseFloat(value.substring(0, value.length - 4)) / 10;
    }
    return parseFloat(value);
  }
}