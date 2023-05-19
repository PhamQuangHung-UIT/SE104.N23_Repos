import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const Staffs = () => {
  const [staffs, setStaffs] = useState([]);
  const [originStaffs, setOriginStaffs] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState();
  const [searchText, setSearchText] = useState("");
  const componentRef = useRef();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const columns = [
    { id: "id", label: "Mã nhân viên" },
    { id: "fullname", label: "Tên nhân viên" },
    {
      id: "phone",
      label: "Số điện thoại",

      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "gender",
      label: "Giới tính",
    },
  ];

  const searchTextHandler = (e) => {
    setSearchText(e.target.value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="main staffs">
      <div className="search_name">
        <div className="search_name-wrapper">
          <input
            className="search_name-input"
            id="search_name-input"
            value={searchText}
            onChange={searchTextHandler}
            placeholder="Nhập tên hoặc SĐT nhân viên"
          />
          <label
            htmlFor="search_name-input"
            className="search_name-icon bx bx-search"
          ></label>
        </div>
      </div>
      <div className="main_list">
        <div className="list_left">
          <div className="action-btn">
            <button className="btn">
              <i className="bx bx-plus action-btn-icon"></i>
              Thêm nhân viên{" "}
            </button>
          </div>
        </div>
        <div className="list_right">
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table
                ref={componentRef}
                stickyHeader
                aria-label="sticky table"
                style={{ boxShadow: "0 2px 15px rgb(0 0 0 / 25%) !important" }}
              >
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          backgroundImage:
                            "-webkit-linear-gradient(90deg, #fd501b, #ff861a)",
                          color: "#fff",
                          fontSize: "17px",
                          fontWeight: "bold",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                    <TableCell
                      style={{
                        backgroundImage:
                          "-webkit-linear-gradient(90deg, #fd501b, #ff861a)",
                      }}
                    ></TableCell>
                    <TableCell
                      style={{
                        backgroundImage:
                          "-webkit-linear-gradient(90deg, #fd501b, #ff861a)",
                      }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {staffs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          key={row.code}
                          style={
                            index % 2 === 1
                              ? { backgroundColor: "#ff861a24" }
                              : {}
                          }
                        >
                          {columns.map((column) => {
                            let value = row[column.id];
                            if (column.id === "id") {
                              value = value?.substr(value.length - 7);
                            }

                            return (
                              <TableCell
                                key={column.id}
                                style={{ fontSize: "16px" }}
                              >
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                          <TableCell
                            onClick={() => {
                              setSelectedStaff(row);
                            }}
                          >
                            <i
                              style={{
                                fontSize: 18,
                                color: "#005059",
                                cursor: "pointer",
                              }}
                              className="bx bxs-edit hide-on-print"
                            ></i>
                          </TableCell>
                          <TableCell
                            onClick={() => {
                              setSelectedStaff(row);
                            }}
                          >
                            <i
                              style={{
                                fontSize: 18,
                                color: "#fd501b",
                                cursor: "pointer",
                              }}
                              className="bx bx-trash hide-on-print"
                            ></i>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[6]}
              component="div"
              count={staffs.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Số hàng hiển thị"
            />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Staffs;
