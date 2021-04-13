import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import "./index.scss";
const App = () => {
  const [value, setValue] = useState("");
  const [web, setWeb] = useState(null);
  const [net, setNet] = useState(false);
  const [inc, setInc] = useState(false);
  const [isActive, setIsActive] = useState("")
  const [newTodo, setNewTodo] = useState(false);
   const [filtered, setFiltered] = useState([
    {
      text: "Play Cricket",
      isCompleted: false,
    },
    {
      text: "Breakfast",
      isCompleted: false,
    },
    {
      text: "Return Book",
      isCompleted: false,
    },
  ]);

  const [todos, setTodos] = useState([
    {
      text: "Play Cricket",
      isCompleted: false,
    },
    {
      text: "Breakfast",
      isCompleted: false,
    },
    {
      text: "Return Book",
      isCompleted: false,
    },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
    console.log(text);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    setFiltered(newTodos);
    setInc(!inc);
    setWeb(index);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    setFiltered(newTodos);
  };

  const editTodo = (index) => {
    const newTodos = [...todos];
    setValue(newTodos[index].text);
    setWeb(index);
    setNet(true);
    setFiltered(newTodos);
  };

  const updateTodo = () => {
    const newTodos = [...todos];
    newTodos[web].text = value;
    setTodos(newTodos);
    setValue("");
    setNet(false);
    setFiltered(newTodos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue(" ");
    setNewTodo(false);
  };

  const filterBy = (value) => {
      if (value === "completed")
      {
          let data = todos.filter(ele => ele.isCompleted === true)
          setFiltered( data );
          
      }
      else if (value === "active")
      {
          let data = todos.filter(ele => ele.isCompleted === false)
          setFiltered( data );
          
          
      }
      else
      {setFiltered(todos);
        
    }
    setIsActive(value); 

  }
  return (
    <div className="app">
      <Container>
        <div className="header">
          <div className="row">
            <div className="col-md-6">
              <div className="heading">
                <h1> Todo List </h1>
              </div>
            </div>
            <div className="col-md-6">
              <div className="filter">
                <div className={`filter-item ${isActive === "all" ? "active" :''}`}  onClick={ () => filterBy("all") } >  All</div>
                <div className={`filter-item ${isActive === "all" ? "active" :''}`}  onClick={ () => filterBy("completed") }>Completed</div>
                <div className={`filter-item ${isActive === "all" ? "active" :''}`}  onClick={ () => filterBy("active")}>Active</div>
                
              </div>
            </div>
          </div>
        </div>
        <div className="todo-list">
          {filtered.map((todo, index) => {
            return (
              <>
                <div className="todo-items">
                  <div className="row">
                    <div className="col-md-2">
                      <div className="all-btn">
                        <div className="">
                          <Button variant="success" onClick={() => completeTodo(index)}>
                            {todo.isCompleted ? (
                              <>
                                {" "}
                                <i
                                  class="fa fa-times"
                                  aria-hidden="true"
                                ></i>{" "}
                              </>
                            ) : (
                              <>
                                {" "}
                                <i class="fa fa-check" aria-hidden="true"></i>
                              </>
                            )}
                          </Button>
                        </div>
                        <div className="">
                          <Button
                            variant="danger"
                            onClick={() => removeTodo(index)}
                          >
                            <i class="fa fa-trash" aria-hidden="true"></i>
                          </Button>
                        </div>
                        <div className="">
                          <Button
                            variant="secondary"
                            onClick={() => editTodo(index)}
                          >
                            <i
                              class="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-10">
                      <div
                        style={{
                          textDecoration: todo.isCompleted
                            ? "line-through"
                            : "",
                        }}
                        className="todo"
                      >
                        <h6>{todo.text}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}

          {newTodo ? (
            <>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicText">
                  <Form.Control
                    type="text"
                    placeholder="Add New Todo"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </Form.Group>
              </Form>
              {/* <form onSubmit={handleSubmit}>
  <input
    type="text"
    className="input"
    placeholder="Add Todo"
    value={value}
    onChange={(e) => setValue(e.target.value)}
  />
</form> */}
            </>
          ) : (
              <div className="update-btn">
            <Button onClick={() => setNewTodo(true)}>Add New Todo</Button>
            </div>
          )}
          {net ? (
              
            <div className="update-btn">
              <Button variant="info" onClick={() => updateTodo()}>
                Update Todo
              </Button>
            </div>
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  );
};

export default App;
