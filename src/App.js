import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

const UIForList = props => {
  const { title, authors, imageLinks, shelf, selected } = props;

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${imageLinks.thumbnail})`
            }}
          />
          <div className="book-shelf-changer">
            <select>
              <option value="move" disabled>
                Move to...
              </option>
              <option
                value="currentlyReading"
                selected={selected.currentlyReading}
              >
                Currently Reading
              </option>
              <option value="wantToRead" selected={selected.wantToRead}>
                Want to Read
              </option>
              <option value="read" selected={selected.read}>
                Read
              </option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.map(a => <div>{a}</div>)}</div>
      </div>
    </li>
  );
};

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    booksData: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        booksData: books
      });
    });
  }

  render() {
    console.log(
      "booksData: ".toUpperCase() + JSON.stringify(this.state.booksData)
    );

    const { booksData } = this.state;

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a
                className="close-search"
                onClick={() => this.setState({ showSearchPage: false })}
              >
                Close
              </a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid" />
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {booksData
                        .filter(
                          bd => bd.shelf.toLowerCase() === "currentlyreading"
                        )
                        .map(book => {
                          return (
                            <UIForList
                              {...book}
                              selected={{
                                currentlyReading: true,
                                wantToRead: false,
                                read: false
                              }}
                            />
                          );
                        })}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {booksData
                        .filter(bd => bd.shelf.toLowerCase() === "wanttoread")
                        .map(book => {
                          return (
                            <UIForList
                              {...book}
                              selected={{
                                currentlyReading: false,
                                wantToRead: true,
                                read: false
                              }}
                            />
                          );
                        })}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {booksData
                        .filter(bd => bd.shelf.toLowerCase() === "read")
                        .map(book => {
                          return (
                            <UIForList
                              {...book}
                              selected={{
                                currentlyReading: false,
                                wantToRead: false,
                                read: true
                              }}
                            />
                          );
                        })}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
