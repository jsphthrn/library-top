function Book(title, author, pages, isRead, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = id;

}

function addBookToLibrary (title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead, crypto.randomUUID());
    myLibrary.push(book);
}

const myLibrary = [];
