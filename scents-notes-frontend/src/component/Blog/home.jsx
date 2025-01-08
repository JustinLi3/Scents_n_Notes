import React, { useState, useEffect } from "react"; 
import moment from 'moment'; 
import axios from "axios";
import BaseLayout from "./baseLayout";

const Home = () => { 
  const date = moment();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/posts/")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);    


  return (  
    <BaseLayout title="Home">
        <div> 
            {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((post) => (  
                <article key={post.id} className="media content-section">    
                  <img className="rounded-circle article-img" src={post.author_img_url} alt="Profile Picture"/>
                  <div className="media_body">
                    <div className="article-metadata">
                      <a className="mr-2" href="#">{post.author_username}</a>
                      <small className="text-muted">{moment(post.date_posted).format('MMMM Do YYYY')}</small>
                    </div>  
                    <h2><a className="article-title" href="#">{post.title}</a></h2>
                    <p className="article-content">{post.content}</p>
                  </div>
                </article>
            ))) : (
            <p>No posts available.</p>
            )
            }
        </div>
    </BaseLayout>

  );
};

export default Home;

// posts.map((post) => (
//     <article key={post.id} className="media content-section">
//       <img
//         className="rounded-circle article-img"
//         src={post.author.profile.image?.url || "/default-profile.png"}
//         alt={`${post.author}'s profile`}
//       />
//       <div className="media-body">
//         <div className="article-metadata">
//           <a className="mr-2" href={`/user-posts/${post.author}`}>
//             {post.author}
//           </a>
//           <small className="text-muted">
//             {new Date(post.date_posted).toLocaleDateString("en-US", {
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </small>
//         </div>
//         <h2>
//           <a className="article-title" href={`/post-detail/${post.id}`}>
//             {post.title}
//           </a>
//         </h2>
//         <p className="article-content">{post.content}</p>
//       </div>
//     </article>
//   ))
// ) : (
//   <p>No posts available.</p>
// )}
