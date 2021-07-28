const UNFINISH_BOOK = "unfinishBookList";
const FINISH_BOOK = "finishBookList";

function addBook() {
    const idBook = +new Date();
    const addBookTitle = document.getElementById("addBookTitle").value;
    const addBookAuthor = document.getElementById("addBookAuthor").value;
    const addBookYear = document.getElementById("addBookYear").value;
    const addBookIsComplete = document.getElementById("addBookIsComplete").checked;

    const book = createBook(idBook, addBookTitle, addBookAuthor, addBookYear, addBookIsComplete);
    const bookObject = composeBookObject(idBook, addBookTitle, addBookAuthor, addBookYear, addBookIsComplete);

    books.push(bookObject);

    if (addBookIsComplete) {
        document.getElementById(FINISH_BOOK).append(book);
    } else {
        document.getElementById(UNFINISH_BOOK).append(book);
    }
    Swal.fire(
        'Buku Baru Ditambahkan!',
        '',
        'success'
    )
    updateBook();
}

function createBook(idBook, addBookTitle, addBookAuthor, addBookYear, addBookIsComplete) {
    const book = document.createElement("article");
    book.setAttribute("id", idBook)
    book.classList.add("card", "m-3");

    const bookTitle = document.createElement("h5");
    bookTitle.classList.add("text-truncate");
    bookTitle.style.maxWidth = "1000px";
    bookTitle.innerText = addBookTitle;

    const bookAuthor = document.createElement("span");
    bookAuthor.classList.add("text-truncate", "d-inline-block");
    bookAuthor.style.maxWidth = "1000px";
    bookAuthor.innerText = addBookAuthor;

    const bookYear = document.createElement("span");
    bookYear.innerText = addBookYear;

    const br = document.createElement("br");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-body", "border-end", "border-4", "border-warning", "d-flex", "justify-content-between");

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const cardFitur = addFitur(addBookIsComplete, idBook);

    cardContent.append(bookTitle, bookAuthor, br, bookYear);
    cardContainer.append(cardContent);
    cardContainer.append(cardFitur);
    book.append(cardContainer);

    return book;
}

function addFitur(inputBookIsComplete, idBook) {
    const cardFiturs = document.createElement("div");

    const fiturReaded = createFiturReaded(idBook);
    const fiturDelete = createFiturDelete(idBook);
    const fiturUndo = createFiturUndo(idBook);

    cardFiturs.append(fiturDelete);

    if (inputBookIsComplete) {
        cardFiturs.append(fiturUndo);
    } else {
        cardFiturs.append(fiturReaded);
    }

    return cardFiturs;
}


function createFiturReaded(idBook) {
    const bookReaded = document.createElement("button");
    bookReaded.classList.add("btn", "btn-lg", "btn-primary", "rounded-circle");
    bookReaded.innerHTML = '<i class="bi bi-check"></i>';

    bookReaded.addEventListener("click", function() {
        Swal.fire(
            'Buku Selesai Dibaca!',
            '',
            'success'
        )
        const cardParent = document.getElementById(idBook);

        const bookTitle = cardParent.querySelector(".card-content > h5").innerText;
        const bookAuthor = cardParent.querySelectorAll(".card-content > span")[0].innerText;
        const bookYear = cardParent.querySelectorAll(".card-content > span")[1].innerText;

        cardParent.remove();

        const book = createBook(idBook, bookTitle, bookAuthor, bookYear, true);
        document.getElementById(FINISH_BOOK).append(book);

        deleteBook(idBook);
        const bookObject = composeBookObject(idBook, bookTitle, bookAuthor, bookYear, true);

        books.push(bookObject);
        updateBook();
    })

    return bookReaded;
}

function createFiturDelete(idBook) {
    const fiturDelete = document.createElement("button");
    fiturDelete.classList.add("btn", "btn-lg", "btn-danger", "mx-1", "rounded-circle");
    fiturDelete.innerHTML = '<i class="bi bi-trash"></i>';

    fiturDelete.addEventListener("click", function() {
        Swal.fire({
            title: 'Yakin Ingin Menghapus Buku?',
            text: "Anda harus Memasukkannya Lagi!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
        }).then((result) => {
            if (result.isConfirmed) {
                const cardParent = document.getElementById(idBook);
                cardParent.addEventListener("eventDelete", function(event) {
                    event.target.remove();
                });
                cardParent.dispatchEvent(new Event("eventDelete"));
                Swal.fire(
                    'Terhapus!',
                    'Buku Telah Terhapus.',
                    'success'
                )
                deleteBook(idBook);
                updateBook();
            }
        });
    });

    return fiturDelete;
}

function createFiturUndo(idBook) {
    const fiturUndo = document.createElement("button");
    fiturUndo.classList.add("btn", "btn-lg", "btn-secondary", "rounded-circle");
    fiturUndo.innerHTML = '<i class="bi bi-arrow-counterclockwise"></i>';

    fiturUndo.addEventListener("click", function() {
        Swal.fire({
            title: 'Yakin Ingin Mengembalikan Buku?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya!'
        }).then((result) => {
            if (result.isConfirmed) {
                const cardParent = document.getElementById(idBook);

                const bookTitle = cardParent.querySelector(".card-content > h5").innerText;
                const bookAuthor = cardParent.querySelectorAll(".card-content > span")[0].innerText;
                const bookYear = cardParent.querySelectorAll(".card-content > span")[1].innerText;

                cardParent.remove();

                const book = createBook(idBook, bookTitle, bookAuthor, bookYear, false);
                document.getElementById(UNFINISH_BOOK).append(book);

                deleteBook(idBook);
                const bookObject = composeBookObject(idBook, bookTitle, bookAuthor, bookYear, false);
                Swal.fire(
                    'Dikembalikan!',
                    'Selamat Membaca kembali.',
                    'success'
                )
                books.push(bookObject);
                updateBook();
            }
        });
    })

    return fiturUndo;
}

function bookSearch(books) {
    const searchResult = document.getElementById("searchResult");

    searchResult.innerHTML = '';

    books.forEach(book => {
        let el = `
        <div class="card mt-3 mb-3">
            <div class="card-body border-end border-4 border-warning">
                <h5 class="card-title text-center">${book.title}</h5>
                <p class="card-text">Penulis: ${book.author}</p>
                <p class="card-text">Tahun: ${book.year}</p>
                <p class="card-text ket"><small class="text-muted">${book.isComplete ? 'Selesai dibaca' : 'Belum selesai dibaca'}</small></p>
            </div>
        </div>
        
        `

        searchResult.innerHTML += el;
    });
}