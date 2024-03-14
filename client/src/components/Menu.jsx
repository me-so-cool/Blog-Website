import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';



export const Menu = ({cat}) => {
  
  const [posts,setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get(`http://localhost:8800/api/posts/?cat=${cat}`);
        setPosts(res.data);
      } catch(err){
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  const handleButton = async (id) => {
    try{
      navigate(`/post/${id}`);
    } catch(error){
      console.error("Navigation to post failed");
    }
  }
  /** 
    const posts = [
        {
          id:1,
          title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
          img: "https://dummyimage.com/640x360/fff/aaa",
        },
        {
          id:2,
          title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
          img: "https://dummyimage.com/640x360/fff/aaa",
        },
        {
          id:3,
          title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
          img: "https://dummyimage.com/640x360/fff/aaa",
        },
        {
          id:4,
          title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
          img: "https://dummyimage.com/640x360/fff/aaa",
        },
        {
          id:5,
          title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
          img: "https://dummyimage.com/640x360/fff/aaa",
        },
      ]

*/
  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
    {posts.map((post) => (
        <div className='post' key={post.id}>
            <img src={post.img} alt="Post Image" />
            <h2>{post.title}</h2>
            <button onClick={() => handleButton(post.id)}>Read More</button>    
        </div>
    ))}
    </div>
  )
}

export default Menu
