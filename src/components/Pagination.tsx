import React, { useEffect, useState } from 'react';
import { setPage } from './utils';

import styles from './styles.module.scss';

interface Props {
  items: never[];
  onChangePage: (items: never[]) => void;
  title: string
}

interface State {
  totalPages: number;
  startIndex: number;
  endIndex: number;
  currentPage: number;
  pages: number[];
  pageSize: number;
  startPage: number;
  endPage: number;
}

export default function Pagination({ items, onChangePage, title }: Props) {
  const [state, setState] = useState<State>({
    totalPages: 0,
    startIndex: 0,
    endIndex: 0,
    currentPage: 1,
    pages: [],
    pageSize: 0,
    startPage: 0,
    endPage: 0,
  });


  const changePage = (page: number) => {
    const { totalPages } = state;
    const pager = setPage(items, page);
    if (page < 1 || page > totalPages) return;

    setState(pager.newState);
    onChangePage(pager.items);
  };

  useEffect(() => {
    const pager = setPage(items);
    setState(pager.newState);
    onChangePage(pager.items);
  }, [title]);

  return (
    <div className='d-none d-md-block my-5'>
    <div className={styles.container}>
      <button disabled={state.currentPage === 1} type="button" onClick={() => changePage(1)}>First</button>
      <button disabled={state.currentPage === 1} type="button" onClick={() => changePage(state.currentPage - 1)}>Previous</button>
      {state.pages.map((page, i) => (
        <button className={state.currentPage === page ? styles.active : ''} type="button" onClick={() => changePage(page)} key={i+1}>{page}</button>
      ))}
      <button disabled={state.currentPage === state.totalPages} type="button" onClick={() => changePage(state.currentPage + 1)}>Next</button>
      <button disabled={state.currentPage === state.totalPages} type="button" onClick={() => changePage(state.totalPages)}>Last</button>
    </div>
    </div>
  );
}
