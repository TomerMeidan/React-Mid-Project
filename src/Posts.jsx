import { useEffect, useState } from "react";
import { updateObjectByID,getObjectByID } from "./utils";

const Posts = ({ userID }) => {
  const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    buildUserPostsList();
  }, []);

  const buildUserPostsList = async () => {
    const { data: posts } = await getObjectByID(POSTS_URL, userID, 5);
    setUserPosts(posts);
  };

  return (
    <div>
      <b>Posts</b><br/>
      {userPosts.length > 0
        ? userPosts.map((post) => {
            return (
              <div className="todos-box" key={post.id}>
                <p>
                  <b>Title:</b> {post.title}
                </p>

                <div className="completed-box">
                  <p>
                    <b>Body:</b> {post.body}
                  </p>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Posts;
