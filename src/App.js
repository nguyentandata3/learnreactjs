import { useState,useEffect } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
import { CloudRain, Sun, Wind } from 'react-feather';
import Example from "./effect";
import axios from "axios";

const SanPham = ({ name, price, stocked }) => (
  <tr>
    <td style={{ color: stocked ? "black" : "red" }}>{name}</td>
    <td>{price}</td>
  </tr>
);

const LoaiSanPham = ({ category }) => (
  <tr>
    <th colSpan={2}>{category}</th>
  </tr>
);

const HienThiSanPham = (props) => {
  const checkstocked = props.checkstocked;
  const rows = [];
  const products = props.products;
  const text_show = props.text_show;
  let lastCategory = "";
  products.forEach((product) => {
    if (!product.name.includes(text_show)) {
      return;
    }
    if (checkstocked) {
      if (!product.stocked) {
        return;
      }
    }
    if (product.category !== lastCategory) {
      rows.push(
        <LoaiSanPham key={product.category} category={product.category} />
      );
    }

    rows.push(
      <SanPham
        key={product.name}
        name={product.name}
        price={product.price}
        stocked={product.stocked}
      />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
        {rows}
      </tbody>
    </table>
  );
};

function ThanhSearch(props) {
  const ChangeText = (e, setText) => {
    setText(e.target.value);
  };

  let checkstocked = Number(props.checkstocked);

  console.log(props);
  return (
    <form>
      <input
        placeholder="Search..."
        value={props.text}
        onChange={(e) => ChangeText(e, props.setText)}
      />
      <br />
      <label>
        <input
          type="checkbox"
          checked={props.checkstocked}
          onChange={() => props.setcheckStocked(!props.checkstocked)}
        />
        {/* <input type='checkbox' /> */} in stock only
      </label>
    </form>
  );
}

function TimKiemSanPham(props) {
  const products = props.products;
  const [text, setText] = useState("");
  const [checkstocked, setcheckStocked] = useState(false);

  return (
    <div className="container">
      <ThanhSearch
        text={text}
        setText={setText}
        products={products}
        checkstocked={checkstocked}
        setcheckStocked={setcheckStocked}
      />
      <HienThiSanPham
        text_show={text}
        products={products}
        checkstocked={checkstocked}
      />
    </div>
  );
}

const products = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

// function App() {
//   return <TimKiemSanPham products={products} />;
// }

// export default App;

function ButtonDelete() {
  return <button>Delete</button>;
}

const ChangeClick = () => {
  const [text, setText] = useState("");
  console.log(text);
  return (
    <div>
      <Input name={text} setText={setText} />
      <Show1 name={text} />
      <Show2 name={text} />
    </div>
  );
};
const Input = (props) => {
  return (
    <input type="text" onChange={(e) => handleOnchange(e, props.setText)} />
  );
};

const Show1 = (props) => {
  return <div>{props.name}</div>;
};

const handleOnchange = (e, setText) => {
  setText(e.target.value);
};

const Show2 = (props) => {
  return <div>{props.name}</div>;
};

// export default ChangeClick;

// Todolist

// const array = [
//   { id: 1, name: "Make a todolist", complete: false },
//   { id: 2, name: "Check random a task", complete: false },
//   { id: 3, name: "Make a wireframe", complete: false },
//   { id: 4, name: "Finish the core", complete: true },
//   { id: 5, name: "Make a new example", complete: false },
//   { id: 6, name: "Make plan for new example", complete: false },
// ];

// const InputTodoList = (props) => {
//   const HandlesetText = (e) => {
//     props.setText(e.target.value);
//   };
//   const AddObject = (newtext) => {
//     const newObject = {
//       id: props.todos.length + 1,
//       name: newtext,
//       complete: false,
//     };
//     const newTodos = [...props.todos];
//     newTodos.push(newObject);
//     props.setTodos(newTodos);
//     props.setText("");
//   };
//   return (
//     <div>
//       <input
//         placeholder="Todo..."
//         value={props.text}
//         onChange={(e) => HandlesetText(e)}
//       />
//       <button
//         style={{ marginLeft: "20px" }}
//         onClick={() => AddObject(props.text)}
//       >
//         Add
//       </button>
//     </div>
//   );
// };

// const ListTodoList = (props) => {
//   const data = [...props.data]
//   const handleDeleteElm = (id) => {
//     const newarr = data.filter(item => {
//       if(item.id !== id) return item
//     })
//     props.setTodos(newarr);
//   };
//   const show_data = data.map((elm) => {
//     return (
//      <LiItem handleDeleteElm={handleDeleteElm} key={elm.id} elm = {elm}/>
//     );
//   });
//   return (
//     <ul
//       style={{
//         overflow: "scroll",
//         width: "300px",
//         margin: "20px",
//         border: "1px solid",
//         height: "550px",
//       }}
//     >
//       {show_data}
//     </ul>
//   );
// };

// const LiItem = (props) => {
//   const [checkbox, setCheckbox] = useState(props.elm.complete)
//   const handleCheckbox = () => {
//     setCheckbox(!checkbox);
//   };


//   const [isEdit, setIsedit] = useState(false)
//   const [textEdit, setTextEdit] = useState(props.elm.name)
//   const newtext = [...textEdit]
//   const handleEdit = () => {
//     setIsedit(!isEdit);
//   };
//   const changeTextEdit = (e) => {
//     setTextEdit(e.target.value);
//   }
//   const handleCancel = () => {
//     setTextEdit(newtext)
//     setIsedit(!isEdit);
//   }

//   return (
//   <li key={props.elm.id}>
//     <input
//       type="checkbox"
//       id={props.elm.id}
//       onChange={() => handleCheckbox()}
//       checked={checkbox}
//     />
//     <span id={props.elm.id} style={{display : isEdit ? 'none' : ''}}>{textEdit} </span>
//     <input type='text' value={textEdit} onChange={(e) => changeTextEdit(e)} style={{display : isEdit ? '' : 'none'}}/>
//     <button onClick={() => handleEdit()} style={{display : isEdit ? 'none' : ''}} >Edit</button>
//     <button onClick={() => handleEdit()} style={{display : isEdit ? '' : 'none'}}>Save</button>
//     <button onClick={() => props.handleDeleteElm(props.elm.id)} style={{display : isEdit ? 'none' : ''}}>Delete</button>
//     <button onClick={handleCancel} style={{display : isEdit ? '' : 'none'}}>Cancel</button>
//   </li>)
// }

// const Button = (props) => {
//   return (
//     <button
//       onClick={props.action}
//       style={{ color: props.isActive ? "red" : "black" }}
//       type="button"
//     >
//       {props.title}
//     </button>
//   );
// };

// const FilterAction = (props) => {
//   const handleAll = () => {
//     props.setFiltertodos("All");
//   };

//   const handleClickComplete = () => {
//     props.setFiltertodos("Complete");
//   };

//   const handleClickIncomplete = () => {
//     props.setFiltertodos("Incomplete");
//   };
//   return (
//     <div>
//       <Button
//         isActive={props.filtertodos === "All"}
//         title={"All"}
//         action={handleAll}
//       />
//       <Button
//         isActive={props.filtertodos === "Complete"}
//         title={"Complete"}
//         action={handleClickComplete}
//       />
//       <Button
//         isActive={props.filtertodos === "Incomplete"}
//         title={"Incomplete"}
//         action={handleClickIncomplete}
//       />
//     </div>
//   );
// };

// const TodoList = (props) => {
//   const [todos, setTodos] = useState(array);
//   const [text, setText] = useState("");
//   const [filtertodos, setFiltertodos] = useState("All");
//   const a = todos.filter((item) => {
//     if (filtertodos === "All") {
//       return todos;
//     } else if (filtertodos === "Complete") {
//       return item.complete;
//     } else if (filtertodos === "Incomplete") {
//       return !item.complete;
//     }
//   });
//   return (
//     <div style={{ marginLeft: "20px" }}>
//       <InputTodoList
//         text={text}
//         setText={setText}
//         todos={todos}
//         setTodos={setTodos}
//       />
//       <ListTodoList data={a} setTodos={setTodos} />
//       <FilterAction
//         filtertodos={filtertodos}
//         setFiltertodos={setFiltertodos}
//       />
//     </div>
//   );
// };

// export default TodoList;

// Todolist Code mẫu

// const data = [
//   { id: 1, text: 'do a', complete: false },
//   { id: 2, text: 'do b', complete: false },
//   { id: 3, text: 'do c', complete: false },
//   { id: 4, text: 'do d', complete: true },
//   { id: 5, text: 'do e', complete: false },
//   { id: 6, text: 'do f', complete: true },
//   { id: 7, text: 'do g', complete: false },
// ]

// function Todo({ text, complete, id, toggleTask, handleEdit, handleDelete }) {
//   const style = complete ? { textDecoration: 'line-through' } : {}
//   const [textEdit, setTextEdit] = useState(text)
//   const [isEdit, setEdit] = useState(false)

//   const handleSave = () => {
//     console.log(textEdit)
//     handleEdit(id, textEdit)
//     setEdit(false)
//   }

//   if (isEdit) return (
//     <>
//       <input type='text' value={textEdit} onChange={(e) => setTextEdit(e.target.value)} />
//       <button onClick={handleSave}>Save</button>
//     </>
//   )
//   return (
//     <div>
//       <div style={{...style, width: 150, display: 'inline-block'}} onClick={() => toggleTask(id)}>{text}</div>
//       <span>
//         <button onClick={() => setEdit(true)}>edit</button>
//         <button onClick={() => handleDelete(id)}>delete</button>
//       </span>
//     </div>
//   )
// }

// function Todos({ todos, toggleTask, handleEdit, handleDelete }) {
//   return (
//     <div>
//       {
//         todos.map(todo =>
//           <Todo
//             key={todo.id}
//             text={todo.text}
//             complete={todo.complete}
//             id={todo.id}
//             toggleTask={toggleTask}
//             handleEdit={handleEdit}
//             handleDelete={handleDelete}
//           />
//         )
//       }
//     </div>
//   )
// }

// function AddTodo({ handleAdd }) {
//   const [text, setText] = useState('')

//   const handleClick = () => {
//     handleAdd(text)
//     setText('')
//   }
//   return (
//     <>
//       <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
//       <button onClick={handleClick}>Add</button>
//     </>
//   )
// }

// function FilterButton({ action, title, isActive }) {
//   const style = isActive ? { border: '1px solid back', color: 'yellow', backgroundColor: 'black' } : {}
//   return (
//     <button style={style} onClick={action}>{title}</button>
//   )
// }

// function FitlerAction({ filter, setFilter }) {
//   return (
//     <div style={{ margin: 10, display: 'flex', width: 170, justifyContent: 'space-between' }}>
//       <FilterButton title={'all'} action={() => setFilter('all')} isActive={filter === 'all'} />
//       <FilterButton title={'done'} action={() => setFilter('done')} isActive={filter === 'done'} />
//       <FilterButton title={'undone'} action={() => setFilter('undone')} isActive={filter === 'undone'} />
//     </div>
//   )
// }

// function App() {
//   const [todos, setTodos] = useState(data)
//   const [filter, setFilter] = useState('all')

//   const handleAdd = (txt) => {
//     const newTodo = {
//       id: todos.length + 1,
//       text: txt,
//       complete: false
//     }

//     const newTodos = [...todos]
//     newTodos.push(newTodo)
//     setTodos(newTodos)
//   }
//   const handleEdit = (id, txt) => {
//     const newTodos = [...todos]
//     newTodos.forEach(todo => {
//       if (todo.id === id) {
//         todo.text = txt
//       }
//     })
//     setTodos(newTodos)
//   }
//   const handleDelete = (id) => {
//     setTodos(todos.filter(todo => todo.id !== id))
//   }
//   const toggleTask = (id) => {
//     const newTodos = [...todos]
//     newTodos.forEach(todo => {
//       if (todo.id === id) {
//         todo.complete = !todo.complete
//       }
//     })
//     setTodos(newTodos)
//   }

//   // đọc kỹ đoạn code dưới để hiểu 
//   // Từ khoá: "javascript array filter"
//   const filteredTodos = todos.filter(todo => {
//     if (filter === 'done') return todo.complete
//     if (filter === 'undone') return !todo.complete
//     return todo
//   })

//   return (
//     <div style={{ margin: 50 }}>
//       <AddTodo handleAdd={handleAdd} />
//       <FitlerAction
//         setFilter={setFilter}
//         filter={filter}
//       />
//       <Todos
//         todos={filteredTodos}
//         toggleTask={toggleTask}
//         handleEdit={handleEdit}
//         handleDelete={handleDelete}
//       />
//     </div>
//   );
// }

// export default App;

// ** Weather **

const array = [

]

const Search = (props) => {
  const handleTextSearch = (e) => {
    props.setTextSearch(e.target.value)
  }
  return(<div>
    <input value={props.textSearch} onChange={(e) => handleTextSearch(e)} placeholder="Search for a city"/>
    <button onClick={props.search}>Submit</button>
  </div>)
}

const ListCountry = (props) => {
  const newarr = [...props.list].map(item => {
    return <div className="col-4" key={item.id} id={item.id}>
      <ItemCountry item = {item}/>
    </div>
  })
  return <div className="row">{newarr}</div>;
}

const ItemCountry = (props) => {
  return(<div className="border rounded-4 backgrounditem">
    <div className="position-relative">
      <span>{props.item.city}</span>
      <span className="position-absolute" style={{margin: '-10px 0px 0px 0px'}}>({props.item.code})</span>
    </div>
    <div className="position-relative">
      <span>{props.item.temperature}</span>
      <span className="nhietdoO">o</span>
      <span className="nhietdoC">C</span>
    </div>
    <div>{props.item.status}</div>
    <CloudRain />
    <div>{props.item.title}</div>
  </div>)
}

function App() {
  const [list, setList] = useState(array);
  const [textSearch, setTextSearch] = useState('')
  const listData = () => {
    const filterData = [...list].filter(elm => {
      return elm.city.includes(textSearch)
    })
    const lat = filterData[0].lat
    const lon = filterData[0].lon
    const key = process.env.REACT_APP_API_KEY
    const url_a_city = `${process.env.REACT_APP_CITY_5day_API}lat=${lat}&lon=${lon}&appid=${key}`
    console.log(url_a_city)
    axios.get(url_a_city).then((res) => {
      const data = (res.data.list)
      const code_city = res.data.city.name
      const data_show = data.filter((item) => {
        return item.dt_txt.includes('03:00:00')
      })
      const days = [...array]
      const output = data_show.map((item) => {
        const day = {
          id : list.length+1,
          temperature : item.main.temp,
          city : item.dt_txt,
          code : code_city,
          status : item.weather[0].main,
          title : item.weather[0].description, 
        }
        days.push(day)
      })
      setList(days)
    })
  }

  useEffect(() => {
    const showLocation = (loc) => {
      
      const lat = loc.coords.latitude
      const lon = loc.coords.longitude
      const key = process.env.REACT_APP_API_KEY
      const url = `${process.env.REACT_APP_WEATHER_API}?lat=${lat}&lon=${lon}&appid=${key}`
      const data = axios.get(url).then((res) => {
        const data = res.data
        const cities = [...array]
        const city = {
          id : list.length+1,
          temperature : data.main.temp,
          city : data.name,
          code : data.sys.country,
          status : data.weather[0].main,
          title : data.weather[0].description, 
          lat : data.coord.lat,
          lon : data.coord.lon,
        }
        cities.push(city)
        setList(cities)
      });
    }
    navigator.geolocation.getCurrentPosition(showLocation)
  }, []);

  return (
    <div className="container text-center backgroundApp">
      <h1>Simple Weather App</h1>
      <Search textSearch={textSearch} setTextSearch={setTextSearch} search={listData}/>
      <ListCountry list={list}/>
    </div>
  )
}
export default App;
