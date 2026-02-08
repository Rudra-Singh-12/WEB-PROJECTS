const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");

document.addEventListener('DOMContentLoaded', loadBookmarks)

addBookmarkBtn.addEventListener("click", function () {
    const name = bookmarkNameInput.value.trim()
    const url = bookmarkUrlInput.value.trim()

    if (!name || !url) {
        alert("Please enter both name and url")
        return
    } else {
        // validation check
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            alert("Please enter the valid URL starting with https:// or http://")
            return
        }
        addBookMark(name, url)
        saveBookMark(name, url)
        bookmarkUrlInput.value = ""
        bookmarkNameInput.value = ""
    }
})

function addBookMark(name, url) {
    const li = document.createElement('li')
    const link = document.createElement('a')

    link.href = url
    link.textContent = name
    link.target = "_blank"

    const removeBtn = document.createElement('button')
    removeBtn.textContent = "Remove"
    removeBtn.addEventListener('click', function () {
        bookmarkList.removeChild(li)
        removeBookMarkFromStorage(name, url)
    })

    li.appendChild(link)
    li.appendChild(removeBtn)

    bookmarkList.appendChild(li)
}

function getBookmarksFromStorage(name, url) {
    const bookmarks = localStorage.getItem("bookmarks")

    return bookmarks ? JSON.parse(bookmarks) : []
}

function saveBookMark(name , url){
    const bookmarks = getBookmarksFromStorage()
    bookmarks.push({name , url})
    localStorage.setItem("bookmarks" , JSON.stringify(bookmarks))
}

function loadBookmarks() {
    const bookmarks = getBookmarksFromStorage()
    bookmarks.forEach(bookmark => {
        addBookMark(bookmark.name , bookmark.url)
    });
}

function removeBookMarkFromStorage(name,url){
    let bookmarks = getBookmarksFromStorage()
    bookmarks = bookmarks.filter((bookmark) => bookmark.name !== name || bookmark.url!== url)
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
}