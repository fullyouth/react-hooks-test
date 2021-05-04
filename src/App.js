import React, {useState, useEffect} from 'react'
import api from './api'
import Posts from './components/Posts'
import Paginations from './components/Paginations'

import './App.css';

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [pageNo, setPageNo] = useState(0)
  const [pageCount, setPageCount] = useState(5)
  const [pageTotal, setPageTotal] = useState(1)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const res = await api.posts.getPostList({
        pageNo,
        pageCount
      })
      setPosts(res.data.list)
      setPageTotal(res.data.pageTotal)
      setLoading(false)
    }
    fetchPosts()
  }, [pageNo])

  const handleChangePage = (pageNo) => {
    setPageNo(pageNo)
  }

  return (
    <div className="App">
      <h1 className='App__title'>我的文章</h1>
      <Posts loading={loading} posts={posts} />
      <Paginations 
        className='App__paginations'
        pageTotal={pageTotal} 
        pageNo={pageNo} 
        onChange={handleChangePage}
      />
    </div>
  );
}

export default App;
