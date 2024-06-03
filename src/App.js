import styled from 'styled-components';
import { useLayoutEffect, useRef, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TableResults from './TableResults';
import SpaceObjects from './SpaceObjects';
import SkyObjects from './SkyObjects';

const Page = styled.div`
  text-align: center;
  background: linear-gradient(180deg, rgba(4,32,89,1) 23%, rgba(66,85,187,1) 66%, rgba(0,175,170,1) 90%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`

const DateInputsForm = styled.div`
  display: flex;
  gap: 50px;
  margin-bottom: 20px;
`

const DateInput = styled.div`
  display: flex;
  gap: 10px;
`

const PageSpan = styled.span`
  margin: 5px;
  color: blue;
  text-decoration: underline;
`

function clamp(a, x, b) {
  return Math.max(a, Math.min(x, b));
}

function nb_weeks_btween(startDate, endDate) {

  const startDate_timestamp = startDate.getTime();
  const endDate_timestamp = endDate.getTime();

  const diff = Math.abs(endDate_timestamp - startDate_timestamp);
  const oneDay = 1000 * 60 * 60 * 24;

  const nb_days = Math.floor(diff / oneDay);
  const nb_pages = Math.floor(nb_days / 7) + 1;

  return nb_pages;
}

function getInterDates(currentPage, startDate, endDate) {

  const OneDay = 24 * 60 * 60 * 1000;

  const start_timestamp = startDate.getTime()
  const end_timestamp = endDate.getTime()

  const real_startDate = new Date(Math.min(start_timestamp, end_timestamp))
  const real_endDate = new Date(Math.max(start_timestamp, end_timestamp))

  const start_interDate = new Date(real_startDate.getTime() + (currentPage-1) * 7 * OneDay);
  const end_interDate = new Date(Math.min(real_startDate.getTime() + (currentPage * 7 - 1) * OneDay, real_endDate.getTime()));

  return [start_interDate, end_interDate];
}

const PageNav = (nb_pages, currentPage, setPage) => (
  <PageSpan>
      See more results (1-{nb_pages})
      <input type="number" id="page" name="page"
      style={{'width': '50px', 'margin': '5px'}}
      defaultValue={clamp(1, currentPage, nb_pages)} min={1} max={nb_pages}
      onChange={() => setPage(document.getElementById("page").value)}
      />
  </PageSpan>
)

function App() {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [currentPage, setPage] = useState(1);

  const nb_pages = nb_weeks_btween(startDate, endDate);
  const [start_interDate, end_interDate] = getInterDates(clamp(1, currentPage, nb_pages), startDate, endDate);

  const date_format = "yyyy/MM/dd";

  let container = useRef(null);
  let [page_height, setpageHeight] = useState(null);
  useLayoutEffect(() => setpageHeight(container.current.offsetHeight), [])

  console.log(page_height)

  return (
      <Page ref={container}>
        <h1>Nasa Neo Asteroïds🪐</h1>
        <p>Simple application to query data about asteroïds passing near earth between two dates</p>
        <DateInputsForm>
          <DateInput>
            <span>Start Date</span>
            <DatePicker showIcon dateFormat={date_format} selected={startDate} onChange={(date) => setStartDate(date)} />
          </DateInput>
          <DateInput>
            <span>End Date</span>
            <DatePicker showIcon dateFormat={date_format} selected={endDate} onChange={(date) => setEndDate(date)} />
          </DateInput>
        </DateInputsForm>
        <SpaceObjects />
        {nb_pages > 1 ? (
          PageNav(nb_pages, clamp(1, currentPage, nb_pages), setPage)
        ) : null }
        <TableResults startDate={start_interDate} endDate={end_interDate}/>
        <SkyObjects />
      </Page>
  );
}

export default App;
