export class Movie {
    imdbID: number;
    public Title: string;
    Poster: string;
    Year: number;
    Plot: string;

    constructor (title) {
        this.Title = title;
    }
}