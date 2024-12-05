import React, { useState, useEffect } from "react";

function MainComponent() {
  const [userList, setUserList] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [bookList, setBookList] = useState([]);
  const [bookTitle, setBookTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [postList, setPostList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPostList, setFilteredPostList] = useState([]);
  const [movieQuery, setMovieQuery] = useState("");
  const [movieResults, setMovieResults] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUserList(data));
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPostList(data);
        setFilteredPostList(data);
      });
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUser = { id: userList.length + 1, name: userName, email: userEmail };
    setUserList([...userList, newUser]);
    setUserName("");
    setUserEmail("");
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    const newBook = {
      id: bookList.length + 1,
      title: bookTitle,
      author: authorName,
      status: "Unread",
    };
    setBookList([...bookList, newBook]);
    setBookTitle("");
    setAuthorName("");
  };

  const handleToggleBookStatus = (id) => {
    const updatedBooks = bookList.map((book) =>
      book.id === id
        ? { ...book, status: book.status === "Read" ? "Unread" : "Read" }
        : book
    );
    setBookList(updatedBooks);
  };

  const handleDeleteBook = (id) => {
    setBookList(bookList.filter((book) => book.id !== id));
  };

  const handleSearchPosts = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredPostList(
      postList.filter((post) => post.title.toLowerCase().includes(query))
    );
  };

  const fetchMovieData = () => {
    const apiKey = "c5c6095";
    const url = `http://www.omdbapi.com/?s=${movieQuery}&apikey=${apiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "False") {
          setErrorMsg("No movies found!");
          setMovieResults([]);
        } else {
          setMovieResults(data.Search);
          setErrorMsg("");
        }
      })
      .catch(() => {
        setErrorMsg("An error occurred. Please try again later.");
        setMovieResults([]);
      });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gray-50 rounded shadow mt-10 space-y-8">
      <h1 className="text-2xl font-bold text-center">All Functionalities</h1>

      <section>
        <h2 className="text-xl font-bold mb-4">Users</h2>
        <form onSubmit={handleAddUser} className="space-y-4 mb-4">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Add User
          </button>
        </form>
        <ul>
          {userList.map((user) => (
            <li key={user.id} className="p-3 border-b">
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default MainComponent;
