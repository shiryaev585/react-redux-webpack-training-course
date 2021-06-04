import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getRepos } from '../../store/actions/repos';
import { setCurrentPage } from '../../store/reducers/reposReducer';
import { createPages } from '../../utils/pagesCreator';
import './Main.less';
import Repo from './Repo/Repo';

const Main = () => {
  const dispatch = useDispatch();
  const repos = useSelector((state) => state.repos.items);
  const isFetching = useSelector((state) => state.repos.isFetching);
  const currentPage = useSelector((state) => state.repos.currentPage);
  const totalCount = useSelector((state) => state.repos.totalCount);
  const perPage = useSelector((state) => state.repos.perPage);
  const isFetchError = useSelector((state) => state.repos.isFetchError);
  const [searchValue, setSearchValue] = useState('');
  const pagesCount = Math.ceil(totalCount / perPage);
  const pages = [];
  createPages(pages, pagesCount, currentPage);

  useEffect(() => {
    dispatch(getRepos(searchValue, currentPage, perPage));
  }, [currentPage]);

  function searchHandler() {
    dispatch(setCurrentPage(1));
    dispatch(getRepos(searchValue, currentPage, perPage));
  }

  return (
    <div>
      {isFetchError && (
        <div class='alert alert-danger' role='alert'>
          Что-то пошло не так!
        </div>
      )}
      <div className='search'>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type='text'
          placeholder='Search repo'
          className='search-input'
        />
        <button onClick={() => searchHandler()} className='search-btn'>
          Search
        </button>
      </div>

      {isFetching === false ? (
        repos.map((repo, index) => <Repo repo={repo} key={index} />)
      ) : (
        <div className='fetching'></div>
      )}

      <div className='pages'>
        {pages.map((page, index) => (
          <span
            key={index}
            className={currentPage == page ? 'current-page' : 'page'}
            onClick={() => dispatch(setCurrentPage(page))}
          >
            {page}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Main;
