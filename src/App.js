import styled from 'styled-components';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useState } from 'react';

const Page = styled.div`
  text-align: center;
  background-color: #282c34;
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

const QueryArray = styled.table`
  table-layout: fixed;
  width: 70%;
  border-collapse: collapse;
  border: 3px solid purple;
`

const QueryCaption = styled.caption`
  font-weight: bold;
  font-size: 129.5%;
  margin-bottom: 10px;
  text-decoration: underline;
`

const TableTh = styled.th`
  border: 3px solid purple;
  padding: 6px;
`
const TableTd = styled.td`
  border: 3px solid purple;
  padding: 20px;
`



function App() {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (

    <Page>
      <h1>Nasa Neo Asteroïds</h1>
      <DateInputsForm>
        <DateInput>
          <span>Start Date</span>
          <DatePicker showIcon selected={startDate} onChange={(date) => setStartDate(date)} />
        </DateInput>
        <DateInput>
          <span>End Date</span>
          <DatePicker showIcon selected={endDate} onChange={(date) => setEndDate(date)} />
        </DateInput>
      </DateInputsForm>
      <QueryArray>
        <QueryCaption>
          Query Results
        </QueryCaption>
        <thead>
          <tr>
            <TableTh scope="col">Date</TableTh>
            <TableTh scope="col">Name</TableTh>
            <TableTh scope="col">Mass (kg)</TableTh>
            <TableTh scope="col">Distance (km)</TableTh>
          </tr>
        </thead>
        <tbody>
          <tr>
            <TableTd>1</TableTd>
            <TableTd>1</TableTd>
            <TableTd>1</TableTd>
            <TableTd>1</TableTd>
          </tr>
        </tbody>
      </QueryArray>
    </Page>
  );
}

export default App;
