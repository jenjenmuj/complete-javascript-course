export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = {id, title, author, img};
        this.likes.push(like);

        //Persist data in localStorage
        this.persistData();

        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);

        
        //Persist data in localStorage
        this.persistData();
    }

    isLiked(id) {
        // return -1 if there is nothing nad true if there is not
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        //will return null if there is nothing
        const storage = JSON.parse(localStorage.getItem('likes'));

        // restoring likes from a local storage
        if(storage) this.likes = storage;
    }
}