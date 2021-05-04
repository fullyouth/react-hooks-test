import './Posts.css'

const Posts = ({ loading, posts }) => {
  if (loading) {
    return <h1>loading...</h1>
  }

  return (
    <ul className='posts'>
      {posts.map(item => {
        return (<li className='posts__item' key={item.id}>
          <h3 className='posts__item-title'>{item.title}</h3>
          <div className='posts__item-content'>{item.content}</div>
          <div className='posts__item-footer'>
            <span className='posts__item-author'>{item.author}</span>
            <span className='posts__item-time'>{item.time}</span>
          </div>
        </li>)
      })}
    </ul>
  )
}

export default Posts