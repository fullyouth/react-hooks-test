import './Paginations.css'

const Paginations = ({ pageNo, pageTotal, onChange, className }) => {
  let liArr = Array.from({ length: Number(pageTotal) }, (v, i) => i + 1)

  if (liArr.length > 10) {
    // 1. 当前页码小于5
    if (pageNo < 5) {
      liArr = [...liArr.slice(0, 5), '...',  pageTotal]
    }else {
      if (pageNo < pageTotal - 2) {
        liArr = [1, '....', ...liArr.slice(pageNo - 2, pageNo + 1), '...', pageTotal]
      } else {
        liArr = [1, '....', ...liArr.slice(pageTotal - 4, pageTotal)]
      }
    }
  }
  liArr = ['<', ...liArr, '>']
  const handleChange = (nextPageNo) => {
    if (nextPageNo === '...' || nextPageNo === '....') return

    if (nextPageNo === '>') {
      if (pageNo < pageTotal) return onChange(pageNo + 1)
      else return
    }
    if (nextPageNo === '<') {
      if (pageNo > 1) return onChange(pageNo - 1)
      else return 
    }

    onChange(nextPageNo)
  }
  return (
    <div className={`${className} paginations`}>
      {
        liArr.map(item => {
          return (
            <a 
              href='javascript:void(0)'
              className={`paginations__item ${pageNo == item ? 'active' : ''} ${item === '...' ||  item === '....' ? 'dot' : ''} `} 
              key={item}
              onClick={() => handleChange(item)}
            >
              {item}
            </a>
          )
        })
      }
    </div>
  )
}

export default Paginations