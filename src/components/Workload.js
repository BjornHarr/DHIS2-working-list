import React, { useEffect, useState } from 'react';
import { useDataQuery } from "@dhis2/app-runtime"
import {
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableCell,
    TableRow,
    TableBody,
    Button,
    DropdownButton
} from '@dhis2/ui';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




const Workload = () => {
  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(null);

  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
    />
  );
}

export default Workload;
