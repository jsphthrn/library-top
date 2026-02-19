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

function deployLibrary () {
    bookshelf.innerHTML = null;
    for (let i = 0; i < myLibrary.length; i++) {

        const newItem = document.createElement("div");
        newItem.setAttribute("class", "book-item");
        newItem.setAttribute("id", myLibrary[i].id);

        const itemTitle = document.createElement('div');
        itemTitle.setAttribute("class", 'book-title');
        itemTitle.textContent = myLibrary[i].title;

        const itemAuthor = document.createElement('div');
        itemAuthor.setAttribute("class", 'book-author');
        itemAuthor.textContent = "by " + myLibrary[i].author;

        const itemPages = document.createElement('div');
        itemPages.setAttribute("class", 'book-pages');
        itemPages.textContent = myLibrary[i].pages + " pages";

        const itemStatus = document.createElement('div');
        itemStatus.setAttribute("class", 'book-status');
        if (myLibrary[i].isRead) {
            itemStatus.textContent = "Read";           
        } else {
            itemStatus.textContent = "Not read";
        }

        newItem.appendChild(itemTitle);
        newItem.appendChild(itemAuthor);
        newItem.appendChild(itemPages);
        newItem.appendChild(itemStatus);

        bookshelf.appendChild(newItem);

    }
}

const myLibrary = [];

const bookshelf = document.getElementById("bookshelf");


