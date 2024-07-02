function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function () {

        let read_status;
        this.read ? read_status = "you have read this book" : read_status = "not read yet";

        return `${this.title} by ${this.author}, ${pages} pages, ${read_status}`
    }
}

const harryPotter = new Book("Harry Potter", "J.K Rowling", 3407, true);
const aSongOfIceAndFire = new Book("A Song Of Ice And Fire", "George R.R Martin", 5178, true);
const ninteenEightyFour = new Book("1984", "George Orwell", 394, false);