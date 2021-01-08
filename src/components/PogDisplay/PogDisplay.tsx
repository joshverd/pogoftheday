import React from 'react';
const { useState, useEffect } = React;
import style from './PogDisplay.scss';
import axios from 'axios';

// Components
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';

// Utils
import timeUtils from '../../utils/time';

// Types
import EmoteDayObject from 'types/EmoteDayObject';

type PogDisplayProps = {}

const PogDisplay = (props: PogDisplayProps) => {
  const [dayEmoteObject, setDayEmoteObject] = useState<EmoteDayObject | null>();
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);

  // On load, grab today's emote
  useEffect(() => {
    setLoading(true);

    axios.post('/api/today/get')
      .then(response => {
        setLoading(false);

        if(!response.data.success) return setError(response.data.message);

        return setDayEmoteObject(response.data.data);
      })
      .catch(err => {
        console.error(err);

        return setError('Internal error.');
      });
  }, []);

  return (
    <div className={style.pogchampWrapper}>
      <div className={style.pogchampDisplay}>
        {loading ? (
          <LoadingIcon />
        ) : error ? ( 
          <div className={style.errorWrapper}>
            <span className={style.error}>{error}</span>
            <img src="/img/widepeepoSad.png" />
          </div>
        ) : (
          <img src={dayEmoteObject?.emoteImageURL} />
        )}
      </div>
      <div className={style.lastUpdatedTextWrapper}>
        {dayEmoteObject && (
          <span>Updated at {timeUtils.localized(dayEmoteObject.lastUpdatedAt).format('h:mm A')}</span>
        )}
      </div>
    </div>
  );
}

export default PogDisplay;