import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const columns = [
  { id: "id", label: "Mã sản phẩm" },
  { id: "name", label: "Tên sản phẩm" },
  {
    id: "costPrice",
    label: "Giá vốn (vnđ)",

    format: (value) => `${value.toLocaleString("en-US")}`,
  },
  {
    id: "salePrice",
    label: "Giá bán (vnđ)",

    format: (value) => `${value.toLocaleString("en-US")}`,
  },
];

const Products = () => {
  const componentRef = useRef();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);
  const [searchText, setSearchText] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  return (
    <div className="main products">
      <div className="search_name">
        <div className="search_name-wrapper">
          <input
            className="search_name-input"
            id="search_name-input"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            placeholder="Nhập mã hoặc tên sản phẩm"
          />
          <label
            htmlFor="search_name-input"
            className="search_name-icon bx bx-search"
          ></label>
        </div>
      </div>

      <div className="main_list">
        <div className="list_left">
          <div className="card">
            <label className="card_select-label">Thời trang:</label>
            <select
              className="card_select"
            >
              <option value="all">Tất cả</option>
              {categories.map((category, index) => {
                return (
                  <option key={index} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="list_right">
          <div>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table
                  ref={componentRef}
                  stickyHeader
                  aria-label="sticky table"
                  style={{
                    boxShadow: "0 2px 15px rgb(0 0 0 / 25%) !important",
                  }}
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
                    {products
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            key={row.code}
                            style={
                              index % 2 == 1
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
                            
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[6]}
                component="div"
                count={products.length}
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
    </div>
  );
};

export default Products;
