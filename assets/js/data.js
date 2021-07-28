const BOOKS_STORAGE = "BOOKSHELF_APPS";

let books = [];

function isStorageSupported() {
    if (typeof Storage === "undefined") {
        alert("Browser Anda Tidak Mendukung Web Storage!!!");
        return false;
    } else {
        return true;
    }
}

function updateBook() {
    if (isStorageSupported()) {
        localStorage.setItem(BOOKS_STORAGE, JSON.stringify(books));
    }
}

function fetchJson() {
    let data = JSON.parse(localStorage.getItem(BOOKS_STORAGE));

    if (data !== null) {
        books = data;
    }

    document.dispatchEvent(new Event("onjsonfetched"));
}

function composeBookObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete,
    };
}

function renderFromBooks() {
    for (book of books) {
        const newBook = createBook(book.id, book.title, book.author, book.year, book.isComplete);

        if (book.isComplete) {
            document.getElementById(FINISH_BOOK).append(newBook);
        } else {
            document.getElementById(UNFINISH_BOOK).append(newBook);
        }
    }
}

function deleteBook(idBook) {
    for (let arrayPosition = 0; arrayPosition < books.length; arrayPosition++) {
        if (books[arrayPosition].id == idBook) {
            books.splice(arrayPosition, 1);
            break;
        }
    }
}

function getBook() {
    return JSON.parse(localStorage.getItem(BOOKS_STORAGE)) || [];
}