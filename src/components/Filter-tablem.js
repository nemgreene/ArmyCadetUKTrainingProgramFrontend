import React, { useState } from "react";
import DatePicker from "./DatePicker-table"; //import the Datepicker Component 
import { AiOutlineSync } from "react-icons/ai";
import { useAsyncDebounce } from "react-table";
import "./tabledata.css";
import moment from 'moment';

const Filters = (props) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [detachmentFilterValue, setDetachmentFilterValue] = useState(null);
  const [value, setValue] = React.useState(props.globalFilter);
  const count = props.preGlobalFilteredRows.length;
  // all search
  const onChange = useAsyncDebounce((value) => {
    props.setGlobalFilter(value || undefined);
  }, 200);
  // start-date 
  const handleStartDate = (date) => {   
    
    setStartDate(date);
  };
  //end-date
  const handleEndDate = (date) => {
    setEndDate(date);
  };
  
  const handleDetachmentOptionsChange = (event) => {
    setDetachmentFilterValue(event.target.value);
  };
  //filters in table
  const autoResetFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setDetachmentFilterValue(null);
    props.dispatch({ type: "resetFilters" });
    var radios = document.querySelectorAll('input[name="detachment-Filters"]');
    for (let i of radios) {
      if (i.checked) {
        i.checked = false;
        break;
      }
    }
  };
  
  const handleFilterByDetachment = () => {
    props.setFilter("detachment", detachmentFilterValue);
  };
  // Filter table by selected start-date and end-date
  const handleFilterByDate = () => {
    if (startDate && endDate) {
      let startDateformat = moment(startDate).utc().format('DD-MM-YYYY');
      let endDateformat = moment(endDate).utc().format('DD-MM-YYYY');
      console.log (startDateformat)
      console.log (endDateformat)
      props.setFilter("date", [startDateformat, endDateformat]);
     
    }
  };
  
  const applyFilter = () => {
    if (startDate && endDate) {   
      
      handleFilterByDate();
     
      // handleFilterByDetachment();
    }
    // if (startDate && endDate && !detachmentFilterValue) {
    //   handleFilterByDate();
    // }
    // if (!startDate && !endDate && detachmentFilterValue) {
    //   handleFilterByDetachment();
    // }
    if ((!startDate && endDate) || (startDate && !endDate)) {
      window.alert("Please Make sure you select start-date and end-date");
    }
  };
  return (
    <div className="spanText">
      {/** Datepicker and reset Button section */}
      <div className="filterParameters" id="filterParameters">
        <div className="datePickerWrapper">
          <div className="Datepicker-grid-container">
            {/* <div>Filter </div> */}
            <div className="startDate">
              From:{" "}
              <div className="datePickerLabel">
                {startDate ? startDate.toLocaleDateString('fr-CA') : null}
              </div>
              <DatePicker handleDateChange={handleStartDate} date={startDate}  format="dd-MM-yyyy"/>
            </div>
            <div className="verticalLine"></div>
            <div className="endDate">
              To:{" "}
              <div className="datePickerLabel">
                {endDate ? endDate.toLocaleDateString("fr-CA") : null}
              </div>
              <DatePicker handleDateChange={handleEndDate} date={endDate}  format="dd-MM-yyyy" />
            </div>
          </div>
        </div>
        <div className="resetFilter" onClick={autoResetFilter}>
          <span>Reset</span>
          <AiOutlineSync className="resetFilter_icon" />
        </div>
      </div>

      
      <div className="apply-filter">
        {/* <h3>All Transactions</h3> */}
        <button
          onClick={applyFilter}
          className="applyFilter-btn"
          id="applyFilter-btn"
        >
          {" "}
          Apply Filter{" "}
        </button>
      </div>
      {/** Search input box for Filtering the Table base on "search text"*/}
      <span className="globalFilterInput">
        Search:{" "}
        <input
          className="textbox"
          type="text"
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`records...`}
          //   style={{
          //     fontSize: "1rem",
          //     border: "2px solid black",
          //   }}
        ></input>
      </span>
    </div>
  );
};
export default Filters;
