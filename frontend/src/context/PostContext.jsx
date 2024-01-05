import React, { createContext, useState } from "react";

export const PostDataContext = createContext();

const PostProvider = ({ children }) => {
  const [postData, setPostData] = useState(null);

  return (
    <PostDataContext.Provider value={{ postData, setPostData }}>
      {children}
    </PostDataContext.Provider>
  );
};

export default PostProvider;
