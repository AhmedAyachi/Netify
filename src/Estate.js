
export const apikey="aae71d5d8af4086bbd44a5c4602200a5";
export const guestsessionid="658c6fe570030590b466e8161795e685";

export class Movie{
    constructor(props){
        Object.assign(this,props);
        this.poster_path=`https://image.tmdb.org/t/p/w500/${this.poster_path}`;
        if(props.backdrop_path){
            this.backdrop_path=`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${this.backdrop_path}`;   
        }
        this.keywords=this.title+this.original_title+this.overview;
    }
}