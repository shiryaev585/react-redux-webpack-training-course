import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCotributors, getCurrentRepo } from '../../store/actions/repos';
import './Page.less';

const Page = (props) => {
  const { username, reponame } = useParams();
  const [repo, setRepo] = useState({owner: {}})
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    getCurrentRepo(username, reponame, setRepo);
    getCotributors(username, reponame, setContributors);
  }, []);

  return (
    <div>
      <button onClick={() => props.history.goBack()} className='back-btn'>
        BACK
      </button>
      <div className='page'>
        <img src={repo.owner.avatar_url} alt='img' />
        <div className='name'>{repo.name}</div>
        <div className='stars'>{repo.stargazers_count}</div>
      </div>
      {contributors.map((c, index) => (
        <div>
          {index + 1}. {c.login}
        </div>
      ))}
    </div>
  );
};

export default Page;
