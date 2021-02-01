import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import VisibilityIcon from "../../assets/visibility-24px.svg";
import VisibilityOffIcon from "../../assets/visibility_off-24px.svg";
import DeleteIcon from "../../assets/delete-24px.svg";
import ArrowIcon from  "../../assets/swap_vert.svg";
import Header from "./../header/Header"

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const getRenderElementWithData = (param) => {
  let elementList = [];
  for (const stateKey in param) {
    const stateObj = param[stateKey];
    for (const distKey in stateObj) {
      const distObj = stateObj[distKey];
      for (let innerKey in distObj) {
        elementList.push({
          state: stateKey ? stateKey: 'Other',
          district: innerKey ? innerKey: 'Other',
          active: distObj[innerKey].active ? distObj[innerKey].active : 0,
          confirmed: distObj[innerKey].confirmed ? distObj[innerKey].confirmed : 0,
          deceased: distObj[innerKey].deceased ? distObj[innerKey].deceased : 0,
          recovered: distObj[innerKey].recovered ? distObj[innerKey].recovered : 0,
          show: false,
          searched:true,
        });
      }
    }
  }

  return elementList;
};



const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const DataDipslay = (props) => {
  const { data } = props;
  const [search, setSearch] = useState();
  let [covidData, setCovidData] = useState(
    getRenderElementWithData(data) || []
  );
  console.log(covidData);
  
  const [sorting, setSorting] = useState(0);
  let [watching, setWatching] = useState(0);
 
    
  const onInputChange = e => {
    let s = e.target.value;
    setSearch(s);
    covidData = covidData.map(item => {
      let name = item.state ? item.state.toLocaleLowerCase(): '';
      let key = s ? s.toLocaleLowerCase(): ''
      if(key) {
        if(name && name.includes(key)) {
          item.searched = true;
        } else {
          item.searched = false;
        }
      }
      else {
        item.searched = true;
      }
      
      return item;
    })
    // console.log(e.target.value)

  };

  const onSearchClick = () => {
    // const all = clone(covidData);
  };
  const handleClick = (position, action) => {
    const tableData = [...covidData];
    let count = watching;

    switch (action) {
      case "show":
        count++;
        tableData[position].show = true;
        break;

      case "hide":
        if(count){
          count--;
        }
        tableData[position].show = false;
        break;

      case "delete":
        if (tableData[position].show) {
          count--;
        }
        tableData.splice(position, 1);
        break;

      default:
        console.log("invalid action");
    }
    setWatching(count);
    setCovidData(tableData);
    
  };
  const sortedData = (records = [],property = undefined) => {
    let direction = sorting ? false: true;
    setSorting(direction ? 1 : 0);
    if(property){
     direction = sorting ? 1: -1;
    return records.sort(function (a, b) {
      if (a[property] < b[property]) {
      return -1 * direction;
      }
      else if (a[property] > b[property]) {
      return 1 * direction;
      }
      else return 0;
      })
    }
    
  }
  const classes = useStyles();
  return (
    <React.Fragment>
      
      <Header
        search={search}
        onInputChange={onInputChange}
      />
      <TableContainer component={Paper}>
        <div style={{ fontSize: "20px", fontWeight: "600" }}>
          Watching: {watching}
        </div>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell align="inherit">State
              
              <img
                      style={{ cursor: "pointer" }}
                      src={ArrowIcon}
                      alt="sort"
                      onClick={() =>{
                        covidData =  sortedData(covidData,'state' )
                      }}
                    /></TableCell>
              <TableCell align="inherit">District
                  <img
                      style={{ cursor: "pointer" }}
                      src={ArrowIcon}
                      alt="sort"
                      onClick={() =>{
                        covidData =  sortedData(covidData,'district' )
                      }}
                    />
                    </TableCell>
              <TableCell align="inherit">Active
                    <img
                      style={{ cursor: "pointer" }}
                      src={ArrowIcon}
                      alt="sort"
                      onClick={() => {
                        covidData = sortedData(covidData,'active' )
                      }}
                    />
                    </TableCell>
              <TableCell align="inherit">Confirmed
              </TableCell>
              <TableCell align="inherit">deceased
              </TableCell>
              <TableCell align="inherit">Recovered</TableCell>
              <TableCell align="inherit">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {covidData.filter(item => item && item.searched).map((item, index) => {
              return (
                <TableRow>
                  <TableCell>{++index}</TableCell>
                  <TableCell>{item.state}</TableCell>
                  <TableCell>{item.district}</TableCell>

                  <TableCell>{item.show ? item.active : ""}</TableCell>
                  <TableCell>{item.show ? item.confirmed : ""}</TableCell>
                  <TableCell>{item.show ? item.deceased : ""}</TableCell>
                  <TableCell>{item.show ? item.recovered : ""}</TableCell>

                  <TableCell>
                    {item.show ? (
                      <img
                        style={{ cursor: "pointer" }}
                        src={VisibilityIcon}
                        alt="hide"
                        onClick={() => handleClick(index - 1, "hide")}
                      />
                    ) : (
                      <img
                        style={{ cursor: "pointer" }}
                        src={VisibilityOffIcon}
                        alt="show"
                        onClick={() => handleClick(index - 1, "show")}
                      />
                    )}
                    <img
                      style={{ cursor: "pointer" }}
                      src={DeleteIcon}
                      alt="delete"
                      onClick={() => handleClick(index - 1, "delete")}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default DataDipslay;
