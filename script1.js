/* will refactor with class syntax

function Book(title, author, pages, isRead, id) { // constructor for books
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.id = id;
    this.changeStatus = function () {
        this.isRead = !this.isRead;
    }

}

*/

class Book {

    constructor (title, author, pages, isRead) {

        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this._id = crypto.randomUUID();

    }

    get id () {

        return this._id;

    }

    /*

    set id (idNo) {

        if (this._id === null) {

            this._id = idNo;

        } else {

            console.log("Cannot change book ID!");

        }

    }

    */

}

class Library {

    constructor (books) {

        this._books = books;

    }

    get books () {

        return this._books;

    }

    set books (input) {  

        this._books = input;
        
    }

    addBook = (book) => {
        
        let aux = this._books;
        console.log(typeof aux);
        aux.push(book);
        this._books = aux;
        deployLibrary();
    
    };

    removeBook = (id) => {
    
        let aux = this._books;
        for (let i = 0; i < aux.length; i++) {

            if (id === aux[i].id) {

                aux.splice(i,1);
                myLibrary._books = aux; 
                deployLibrary();
                break;
            }

        };

    }

}

/* function addBook (book) {
    
    let aux = myLibrary.books;
    aux.push(book);
    myLibrary.books = aux;

}

function removeBook (idToRemove) {

    let aux = myLibrary.books;
    for (let i = 0; i < aux.length; i++) {

        if (idToRemove === aux[i]) {
            
            aux.splice(i, 1);
            myLibrary.books = aux;
            return;

        }

    }

}

function addBookToLibrary (title, author, pages, isRead) { // self-explanatory
    const book = new Book(title, author, pages, isRead, crypto.randomUUID());
    myLibrary.push(book);
    deployLibrary();
}

*/

function deployLibrary () { // display books in 'bookshelf'
    bookshelf.innerHTML = null;
    let aux = myLibrary.books;
    for (let i = 0; i < aux.length; i++) {

        const newItem = document.createElement("div");
        newItem.setAttribute("class", "book-item");
        newItem.setAttribute("id", aux[i].id);

        const itemTitle = document.createElement('div');
        itemTitle.setAttribute("class", 'book-title');
        itemTitle.textContent = aux[i].title;

        const itemAuthor = document.createElement('div');
        itemAuthor.setAttribute("class", 'book-author');
        itemAuthor.textContent = "by " + aux[i].author;

        const itemDeleteButton = document.createElement('img');
        itemDeleteButton.setAttribute("class", "delete-book-button");
        itemDeleteButton.setAttribute("src", "./assets/trash-can-outline-inactive.svg");
        itemDeleteButton.addEventListener("click", () => {
            emergentRemove.showModal();
        });
        itemDeleteButton.addEventListener("mouseenter", () => {
            itemDeleteButton.setAttribute("src", "./assets/trash-can-outline-active.svg");
        });
         itemDeleteButton.addEventListener("mouseleave", () => {
            itemDeleteButton.setAttribute("src", "./assets/trash-can-outline-inactive.svg");
        });

        const itemPages = document.createElement('div');
        itemPages.setAttribute("class", 'book-pages');
        itemPages.textContent = aux[i].pages + " pages";

        const itemStatus = document.createElement('div');
        itemStatus.setAttribute("class", 'book-status');
        if (aux[i].isRead) {
            itemStatus.textContent = "Read";           
        } else {
            itemStatus.textContent = "Not read";
        }

        itemStatus.addEventListener("click", () => {    // toggle status function

            const helper = aux.findIndex(item => item.id = itemStatus.parentElement.getAttribute("id"));
            aux[helper].isRead = !aux[helper].isRead;     // toggle for data

            if (aux[helper].isRead) {                        // toggle for book display
                itemStatus.textContent = "Read";           
            } else {
                itemStatus.textContent = "Not read";
            }

        });

        newItem.appendChild(itemTitle);
        newItem.appendChild(itemAuthor);
        newItem.appendChild(itemDeleteButton);
        newItem.appendChild(itemPages);
        newItem.appendChild(itemStatus);
        newItem.setAttribute("selected", false);

        newItem.addEventListener("click", () => {
            deselectBook();
            selectedBookId = newItem.getAttribute("id");
            document.getElementById(selectedBookId).setAttribute("selected", true);
        })

        bookshelf.appendChild(newItem);

    }
}

function deselectBook () {
    if (selectedBookId) {
        document.getElementById(selectedBookId).setAttribute("selected", false);
        selectedBookId = null;
    }
}


/*
function removeBook(bookId) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].id === bookId) {
            myLibrary.splice(i, 1);
            deployLibrary();
            break;
        } else {
            console.log("Index " + i + " is not selected book."); 
        }
    }
}

*/

// internal code

const myLibrary = new Library ([]); 
let selectedBookId;

// html elements

const container = document.getElementsByClassName("app-content");

const emergentAdd = document.getElementById("panel-add");
emergentAdd.close();

const addPanel = document.getElementById("add-book");
addPanel.addEventListener("click", () => {
    deselectBook();
    emergentAdd.showModal();
})

const addSubmit = document.getElementById("add-submit"); 
addSubmit.addEventListener("click", () => {
    const bookTitle = document.getElementById("input-title").value;
    const bookAuthor = document.getElementById("input-author").value;
    const bookPages = document.getElementById("input-pages").value;
    const bookStatus = document.getElementById("input-status").checked;
    const createdbook = new Book (bookTitle, bookAuthor, bookPages, bookStatus);
    myLibrary.addBook(createdbook);
    deployLibrary();
    document.getElementById("input-title").value = "";
    document.getElementById("input-author").value = "";
    document.getElementById("input-pages").value = "";
    document.getElementById("input-status").checked = false;
    emergentAdd.close();
});

const emergentRemove = document.getElementById("remove-warning");

const removePanel = document.getElementById("remove-book");
removePanel.addEventListener("click", () => {
    if (selectedBookId) {
        emergentRemove.showModal();
    } else {
        alert("Please select a book first.");
    }
});

const removeSubmit = document.getElementById("remove-submit");
removeSubmit.addEventListener("click", () => {
    myLibrary.removeBook(selectedBookId);
    selectedBookId = null;
    emergentRemove.close();
});

const exitPanel = document.getElementById("panel-exit");
exitPanel.addEventListener("click", () => {
    emergentAdd.close();
});

const cancelPanel = document.getElementById("panel-cancel");
cancelPanel.addEventListener("click", () => {
    emergentRemove.close();
});

document.addEventListener("keydown", (event) => {
    if (event.key === 'Escape') {
        deselectBook();
    }
});

myLibrary.addBook(new Book("Foundation", "Isaac Asimov", 389, true));
myLibrary.addBook(new Book("Foundation and Empire", "Isaac Asimov", 402, true));
deployLibrary();