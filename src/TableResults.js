import styled from "styled-components"
import { Loader } from './Loader';
import { useFetch } from "./hooks";
import { useState } from "react";

const QueryArray = styled.table`
  table-layout: fixed;
  width: 80%;
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
  padding-bottom: 10px;
  padding-top: 10px;
`
const TableTd = styled.td`
  border: 3px solid purple;
  padding: 7px;
`

const SpanError = styled.span`
    font-size: 3em;
  font-weight: bold;
  border: 5px double red;
`

function format_date(date) {
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}

function custom_selector(set_unit_func, name, values) {

  return (
    <select id={name} onChange={() => set_unit_func(document.getElementById(name).value)}>
        {values.map((value, id) =>
          <option key={id} value={value}>{value}</option>
        )}
    </select>
  )
}

function format_diameter_data(estimated_diameters) {
  const min_value = estimated_diameters["estimated_diameter_min"]
  const max_value = estimated_diameters["estimated_diameter_max"]

  return `${Number(min_value).toFixed(3)} - ${Number(max_value).toFixed(3)}`
}

function TableResults({startDate, endDate}) {

  const start_date = format_date(startDate)
  const end_date = format_date(endDate)
  const { data, isLoading, error } = useFetch(start_date, end_date);

  const [distance_unit, set_distance_unit] = useState("astronomical")
  const [diameter_unit, set_diameter_unit] = useState("kilometers")

  if (error) {
      return (
          <div style={{display: "flex", flexDirection: "column"}}>
              <SpanError>Service indisponible🛰️❌</SpanError>
              <span style={{fontSize: '2em'}}>Veuillez réessayer ultérieurement</span>
          </div>
      );
  }

  return (
      <QueryArray>

      <thead>
        <tr>
          <TableTh scope="col" style={{width: '5%'}}>Date</TableTh>
          <TableTh scope="col" style={{width: '10%'}}>Observation Time</TableTh>
          <TableTh scope="col" style={{width: '20%'}}>Asteroid's Name</TableTh>
          <TableTh scope="col">Distance to Earth (
            {custom_selector(set_distance_unit, "distance_unit", ["astronomical", "lunar", "kilometers", "miles"])}
          )</TableTh>
          <TableTh scope="col">Estimated Diameter (
            {custom_selector(set_diameter_unit, "diameter_unit", ["kilometers", "meters", "miles", "feet"])}
          )</TableTh>
        </tr>
      </thead>
        { isLoading ? (
          <Loader />
        ) : (
        <tbody>
          {data.map((data_at_date) => { return (
            data_at_date[1].map((asteroid_data, id) => (
                <tr key={id}>
                  { id === 0 ? (
                      <TableTd rowSpan={data_at_date[1].length} style={{fontSize: '2em', writingMode: 'vertical-rl', rotate: '180deg'}}>
                        {asteroid_data["date"].slice(0,-6)}
                      </TableTd>
                    ) : null
                  }
                  <TableTd>{asteroid_data["date"].slice(-5)}</TableTd>
                  <TableTd>{asteroid_data["name"]}</TableTd>
                  <TableTd>{Number(asteroid_data["distance"][distance_unit]).toFixed(3)}</TableTd>
                  <TableTd>{format_diameter_data(asteroid_data["estimated_diameter"][diameter_unit])}</TableTd>
                </tr>
            ))
          )
          })}
        </tbody>
        )}
    </QueryArray>
  )
}

export default TableResults;