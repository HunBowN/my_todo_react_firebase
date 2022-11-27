import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

const AddTodo = ({ todo, setTodo }) => {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [time, setTime] = useState();
  const [fileList, setFileList] = useState([]);

  const fileListRef = ref(storage, "files/");
  
  /**
   * Функция для загрузки выбранного файла в firebase
   * @returns если файл не подгружен не возвращаем ничего
   */

  function uploadFile() {
    if (file === null) {
      return;
    }
    const fileRef = ref(storage, `files/${file.name}`);
    uploadBytes(fileRef, file).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then((url) => {
        setFileList((prev) => [...prev, url]);
      });

      alert("File upload!");
    });
  }

  useEffect(() => {
    listAll(fileListRef).then((res) => {
      console.log("Ответ сервера", res);
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setFileList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  let today = new Date();
  let now = today.toLocaleDateString("en-US");

  /**
   * Функция конструктор для создании модели todo
   */

  function saveTodo() {
    setTodo([
      ...todo,
      {
        id: uuidv4(),
        title: value,
        description: description,
        status: true,
        file: file,
        time: time,
        timeEnd: new Date(now) > new Date(time),
      },
    ]);

    setValue("");
    setDescription("");
    setFile(null);
  }

  return (
    <div className="input-wrapper">
      <input
        type="text"
        name="todo"
        value={value}
        placeholder="Todo title"
        onChange={(event) => setValue(event.target.value)}
      />
      <input
        type="text"
        name="todo"
        value={description}
        placeholder="Add todo description"
        onChange={(event) => setDescription(event.target.value)}
      />

      <input
        type="file"
        onChange={(e) => {
          if (e.target.value) {
            setFile(fileList[fileList.length - 1]);
          } else setFile(null);
        }}
      ></input>
      <button className="add-btn" onClick={uploadFile}>
        Add File
      </button>
      <p>Expiration date: </p>
      <input
        type="date"
        placeholder="Expiration date"
        onChange={(e) => setTime(e.target.value)}
      ></input>

      {/* {fileList.map(url => {
          return <a href={url} >DownloadLink</a>
        })} */}

      <button className="add-btn" onClick={saveTodo}>
        Add ToDo
      </button>
    </div>
  );
};

export default AddTodo;
