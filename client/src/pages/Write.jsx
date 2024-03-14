import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import {useLocation, useNavigate} from "react-router-dom"
import moment from "moment"


const Write = () => {

  const state = useLocation().state;
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat,setCat] = useState(state?.cat || "");

  const navigate = useNavigate()

  const upload = async () => {
    try{
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("http://localhost:8800/api/upload", formData);
      return res.data;
    } catch(err){
      console.log(err);
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try{
      state
      ? await axios.put(`http://localhost:8800/api/posts/${state.id}`, {
        title,
        desc: value,
        cat,
        img: file ? imgUrl : "",
      },{ withCredentials: true })
      : await axios.post(`http://localhost:8800/api/posts/`, {
        title,
        desc: value,
        cat,
        img: file ? imgUrl : "",
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      }, { withCredentials: true });

      navigate("/")
    }catch(err){
      console.log(err);
    }
  }



  return (
    <div classname='add'>
      <div className="content">
        <input type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)}/>
        <div className="editorContainer">
          <ReactQuill className="editor" theme='snow' value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b>
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{ display: "none" }} type="file" name="" id="file" onChange={(e) => setFile(e.target.files[0])}/>
          <label className="file" htmlFor="file">upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Update</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className='cat'>
            <input type="radio" name="cat" checked={cat === "technology"} id="technology" value="technology" onChange={(e) => setCat(e.target.value)}/>
            <label htmlFor="technology">Technology</label>
            <input type="radio" name="cat" checked={cat === "food"} id="food" value="food" onChange={(e) => setCat(e.target.value)}/>
            <label htmlFor="food">Food</label>
            <input type="radio" name="cat" checked={cat === "cinema"} id="cinema" value="cinema" onChange={(e) => setCat(e.target.value)}/>
            <label htmlFor="cinema">Cinema</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write