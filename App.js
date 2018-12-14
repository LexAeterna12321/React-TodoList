class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { term: "" };
    this.ref = React.createRef();
  }

  onInputChange = e => {
    this.setState({ term: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();

    if (!this.state.term) {
      this.ref.current.className = "inline field error";
      return;
    } else {
      this.ref.current.className = "inline field";
      this.props.addTodoItem(this.state);
    }
    this.setState({ term: "" });
  };

  render() {
    const { state, onInputChange, onFormSubmit } = this;

    return (
      <React.Fragment>
        <form className="ui big inverted form segment" onSubmit={onFormSubmit}>
          <div className="inline field" ref={this.ref}>
            <label htmlFor="task">Add your task here</label>
            <input
              id="task"
              type="text"
              value={state.term}
              onChange={onInputChange}
            />
          </div>
        </form>
      </React.Fragment>
    );
  }
}

// --------------------------------------------------------

const Todo = ({ todo: { term, id }, deleteTodoItem }) => {
  return (
    <div
      className="item"
      style={{
        width: "400px",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <i className="thumbtack icon" />
      <div
        className="content"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="header">{term}</div>
        <button
          className="ui button negative"
          onClick={() => {
            deleteTodoItem(id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// --------------------------------------------------------

const Todos = ({ todos, deleteTodoItem }) => {
  return todos.map((todo, index) => {
    return (
      <Todo
        todo={todo}
        key={index}
        id={index}
        deleteTodoItem={deleteTodoItem}
      />
    );
  });
};

// --------------------------------------------------------

class App extends React.Component {
  state = { todos: [] };

  addTodoItem = item => {
    item.id = Date.now();
    this.setState({ todos: [...this.state.todos, item] });
  };

  deleteTodoItem = id => {
    const todos = this.state.todos.filter(item => {
      return item.id !== id;
    });
    this.setState({ todos });
  };

  renderTodos = () => {
    const { todos } = this.state;
    return (
      <div className="ui big middle aligned animated list segment">
        {todos.length ? (
          <Todos todos={todos} deleteTodoItem={this.deleteTodoItem} />
        ) : (
          <h3>Add some tasks...</h3>
        )}
      </div>
    );
  };

  render() {
    return (
      <div className="ui container segments">
        <h1 style={{ textAlign: "center" }}>Almighty Todo</h1>
        <TodoForm addTodoItem={this.addTodoItem} />
        {this.renderTodos()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
