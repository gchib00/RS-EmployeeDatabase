import React from 'react'
import { Pagination } from 'semantic-ui-react'

interface Props {
  cardsPerPage: number;
  listSize: number;
  paginate: (pageNum: number) => void
}

const PaginationTab = ({cardsPerPage, listSize, paginate}: Props) => {
  let totalPages = 0
  for (let i=1; i<=Math.ceil(listSize/cardsPerPage); i++) {
    totalPages++
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (e: any) => {
    e.preventDefault()
    paginate(e.target.outerText)
  }

  return(
    <Pagination 
      defaultActivePage={1} 
      totalPages={totalPages} 
      onClick={handleClick} 
      firstItem={null}
      lastItem={null}
      nextItem={null}
      prevItem={null}
    />
  )

}

export default PaginationTab