const myLibrary = new Map();

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.details = [this.title, this.author, this.pages, this.read];
    this.info = function () {

        let read_status;
        this.read ? read_status = "you have read this book" : read_status = "not read yet";

        return `${this.title} by ${this.author}, ${pages} pages, ${read_status}`
    }

    this.toggleReadStatus = function () {
        this.read = !this.read;
    }
}

const new_book_button = document.querySelector("header button"),
    blanket = document.querySelector(".blanket"),
    books = document.querySelector(".books"),
    body = document.querySelector("body"),
    form = document.querySelector("form"),
    close_button = document.querySelector("form svg");

new_book_button.addEventListener("click", toggleProperties);

close_button.addEventListener("click", toggleProperties);

blanket.addEventListener("click", toggleProperties);

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let newBook = new Book(form.elements["title"].value, form.elements["author"].value, form.elements["pages"].value, form.elements["read"].checked);

    myLibrary.set(myLibrary.size + 1, newBook);

    createNewBook(newBook.details);

    form.reset();

    toggleProperties();
});

function toggleProperties() {
    blanket.classList.toggle("show");
    form.classList.toggle("show");
    body.classList.toggle("no-overflow");
}

function createNewBook(data) {
    let img = document.createElement("img");
    img.setAttribute("src", "./generic book cover.jpg");
    img.setAttribute("width", "300px");
    img.setAttribute("alt", "generic book cover");

    let title = document.createElement("h4");
    title.classList.add("book-title");
    title.textContent = data[0];

    let author = document.createElement("h5");
    author.classList.add("book-author");
    author.textContent = data[1];

    let read_status = document.createElement("h6");
    read_status.classList.add("book-read-status");
    data[3] ? read_status.textContent = "Read" : read_status.textContent = "Not Read";

    let read_btn = document.createElement("button");
    read_btn.classList.add("read-btn");
    read_btn.textContent = "Read"; 

    read_btn.addEventListener("click", setReadStatus);
    
    let delete_btn = document.createElement("button");
    delete_btn.classList.add("delete-btn");
    delete_btn.textContent = "Remove";    

    delete_btn.addEventListener("click", removeBook)

    let page_number = document.createElement("span");
    page_number.classList.add("page-number");
    page_number.textContent = `${data[2]} pages`;

    let div = document.createElement("div");
    div.setAttribute("data-index", myLibrary.size);
    div.append(read_btn);
    div.append(delete_btn);
    div.append(page_number);

    let book_data = [img, title, author, read_status, div];

    let book = document.createElement("div");
    book.classList.add("book");
    
    // create the book node using the data provided
    book_data.forEach(dt => {
        book.append(dt);
    });

    books.append(book);

}

function setReadStatus(e) {

    // update the myLibrary array
    let index = Number.parseInt(e.target.parentNode.getAttribute("data-index"));
    myLibrary.get(index).toggleReadStatus();

    // update the ui
    let read_statement = e.target.parentNode.previousElementSibling;    
    read_statement.textContent === "Read" ? read_statement.textContent = "Not Read" : read_statement.textContent = "Read";
}

function removeBook(e) {

    // remove the book from the myLibrary array
    let index = Number.parseInt(e.target.parentNode.getAttribute("data-index"));
    myLibrary.delete(index);
    
    // update the ui
    e.target.parentNode.parentNode.remove();
}