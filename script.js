function Book(title, author, pages, isRead, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = id;
    this.changeStatus = function () {
        this.isRead = !this.isRead;
    }

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

        itemStatus.addEventListener("click", () => {    // toggle status function

            const aux = myLibrary.findIndex(item => item.id = itemStatus.parentElement.getAttribute("id"));
            myLibrary[aux].isRead = !myLibrary[aux].isRead;     // toggle for data

            if (myLibrary[aux].isRead) {                        // toggle for book display
                itemStatus.textContent = "Read";           
            } else {
                itemStatus.textContent = "Not read";
            }

        })

        newItem.appendChild(itemTitle);
        newItem.appendChild(itemAuthor);
        newItem.appendChild(itemPages);
        newItem.appendChild(itemStatus);

        bookshelf.appendChild(newItem);

    }
}

const myLibrary = [];

const bookshelf = document.getElementById("bookshelf");

addBookToLibrary("Foundation", "Isaac Asimov", 389, true);
addBookToLibrary("Foundation and Empire", "Isaac Asimov", 402, true);
deployLibrary();
