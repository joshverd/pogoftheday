import React from 'react';
import style from './App.scss';

// Components
import PogDisplay from '../../components/PogDisplay/PogDisplay';

type AppProps = {};

const App = (props: AppProps) => {
  return (
    <div className={style.appWrapper}>
      <div className={style.logoWrapper}>
        <img src="/img/logo.png" />
      </div>
      <div className={style.pogDisplayWrapper}>
        <PogDisplay />
      </div>
    </div>
  );
}

export default App;
