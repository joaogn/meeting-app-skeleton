import React, { useEffect, useState, useMemo } from 'react';
import { format } from 'date-fns';

import { Container, Timer, Shedule } from './styles';

const MINUTE_IN_MS = 60000;

function Sheduler() {
  const [date, setDate] = useState(new Date());

  const hourFormatted = useMemo(() => format(date, 'HH:mm'), [date]);

  const dateFormatted = useMemo(() => format(date, 'EEEE MMMM dd , yyyy'), [
    date,
  ]);

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, MINUTE_IN_MS);
  }, []);

  return (
    <Container>
      <Timer>
        <h1>{hourFormatted}</h1>
        <p>{dateFormatted}</p>
      </Timer>
      <Shedule>
        <p>No upcoming meetings today</p>
      </Shedule>
    </Container>
  );
}

export default Sheduler;
