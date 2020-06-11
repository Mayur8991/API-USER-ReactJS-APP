import React, { Component } from "react";
import axios from "axios";

import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  Input,
  Label,
  FormGroup,
} from "reactstrap";

class App extends Component {
  state = {
    books: [],
    newBookData: {
      name: "",
      origin: "",
    },
    editBookData: {
      id: "",
      name: "",
      origin: "",
    },
    newBookModal: false,
    editBookModal: false,
  };

  componentDidMount() {
    this._refreshBooks();
  }

  toggleNewBookModal() {
    this.setState({
      newBookModal: !this.state.newBookModal,
    });
  }
  toggleEditBookModal() {
    this.setState({
      editBookModal: !this.state.editBookModal,
    });
  }

  addBook() {
    axios
      .post("http://localhost:3000/brands", this.state.newBookData)
      .then((response) => {
        let { books } = this.state;
        books.push(response.data);
        this.setState({
          books,
          newBookModal: false,
          newBookData: {
            name: "",
            origin: "",
          },
          editBookData: {
            name: "",
            origin: "",
          },
        });
      });
  }
  updateBook() {
    let { name, origin } = this.state.editBookData;
    axios
      .put("http://localhost:3000/brands/" + this.state.editBookData.id, {
        name,
        origin,
      })
      .then((response) => {
        this._refreshBooks();
        this.setState({
          editBookModal: false,
          editBookData: { id: "", name: "", origin: "" },
        });
      });
  }

  editBook(id, name, origin) {
    console.log(id, name, origin);
    this.setState({
      editBookData: { id, name, origin },
      editBookModal: !this.state.editBookModal,
    });
  }
  deleteBook(id) {
    axios.delete("http://localhost:3000/brands/" + id).then((response) => {
      this._refreshBooks();
    });
  }

  _refreshBooks() {
    axios.get("http://localhost:3000/brands").then((response) => {
      this.setState({
        books: response.data,
      });
      console.log(this.state.books);
    });
  }

  render() {
    let books = this.state.books.map((book) => {
      return (
        <tr key={book.id}>
          <td scope="row">{book.id}</td>
          <td>{book.name}</td>
          <td>{book.origin}</td>
          <td>{book.alternative}</td>
          <td>
            <Button
              color="success"
              size="sm"
              className="mr-4"
              onClick={this.editBook.bind(
                this,
                book.id,
                book.name,
                book.origin
              )}
            >
              Edit
            </Button>
            <Button
              color="danger"
              size="sm"
              onClick={this.deleteBook.bind(this, book.id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <div className="App container">
        <h1>Brands API Support</h1>
        <Button
          className="my-3"
          color="primary"
          onClick={this.toggleNewBookModal.bind(this)}
        >
          Add Item
        </Button>

        <Modal
          isOpen={this.state.newBookModal}
          toggle={this.toggleNewBookModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>
            Add as New Brand
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                id="name"
                value={this.state.newBookData.name}
                onChange={(e) => {
                  let { newBookData } = this.state;
                  newBookData.name = e.target.value;
                  this.setState({ newBookData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="origin">Origin</Label>
              <Input
                id="origin"
                value={this.state.newBookData.origin}
                onChange={(e) => {
                  let { newBookData } = this.state;
                  newBookData.origin = e.target.value;
                  this.setState({ newBookData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addBook.bind(this)}>
              Add
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleNewBookModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.editBookModal}
          toggle={this.toggleEditBookModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleEditBookModal.bind(this)}>
            Add as New Brand
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                id="name"
                value={this.state.editBookData.name}
                onChange={(e) => {
                  let { editBookData } = this.state;
                  editBookData.name = e.target.value;
                  this.setState({ editBookData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="origin">Origin</Label>
              <Input
                id="origin"
                value={this.state.editBookData.origin}
                onChange={(e) => {
                  let { editBookData } = this.state;
                  editBookData.origin = e.target.value;
                  this.setState({ editBookData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateBook.bind(this)}>
              Update
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleEditBookModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Table dark>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Origin</th>
              <th>Alternative</th>
            </tr>
          </thead>
          <tbody>{books}</tbody>
        </Table>
      </div>
    );
  }
}
export default App;
