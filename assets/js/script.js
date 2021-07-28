document.addEventListener("DOMContentLoaded", function() {

    const formAdd = document.getElementById("addBook");
    const formSearch = document.getElementById("searchBook");
    const searchValue = document.getElementById("searchBookKeyword");

    formAdd.addEventListener("submit", function(event) {
        event.preventDefault();
        addBook();

        document.getElementById("addBookTitle").value = "";
        document.getElementById("addBookAuthor").value = "";
        document.getElementById("addBookYear").value = "";
        document.getElementById("addBookIsComplete").checked = false;
    });

    formSearch.addEventListener("submit", function(event) {
        event.preventDefault();

        const getByTitle = getBook().filter(a => a.title.toUpperCase().includes(searchValue.value.toUpperCase()));
        if (getByTitle.length == 0) {
            const getByAuthor = getBook().filter(a => a.author.toUpperCase().includes(searchValue.value.toUpperCase()));
            if (getByAuthor.length == 0) {
                const getByYear = getBook().filter(a => a.year.includes(searchValue.value));
                if (getByYear.length == 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Buku yang Dicari Tidak Ada!'
                    })
                } else {
                    Swal.fire(
                        'Buku Ditemukan!',
                        '',
                        'success'
                    )
                    bookSearch(getByYear);
                }
            } else {
                Swal.fire(
                    'Buku Ditemukan!',
                    '',
                    'success'
                )
                bookSearch(getByAuthor);
            }
        } else {
            Swal.fire(
                'Buku Ditemukan!',
                '',
                'success'
            )
            bookSearch(getByTitle);
        }
        searchValue.value = '';
    })

    if (isStorageSupported()) {
        fetchJson();
    }
});

document.addEventListener("onjsonfetched", function() {
    renderFromBooks();
});

const scrollTop = document.getElementById('scrollTop')
window.onscroll = () => {
    if (window.scrollY > 0) {
        scrollTop.style.visibility = "visible";
        scrollTop.style.opacity = 1;
    } else {
        scrollTop.style.visibility = "hidden";
        scrollTop.style.opacity = 0;
    }
};