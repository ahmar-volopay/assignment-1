# Assignment-1
Assignment-1, basically creating a table by taking data from props.

Taking Enums (headers from ./src/components/constants/tableHeaders.js) defining the structure of the table/(header of table).

Using these headers, in `./App.jsx`, we create an array to store the objects, i.e., `values`.

Then these values (`tableHeaders`, `values`) are passed as props to the `./src/components/table/table.jsx`.

Throught `PropTypes`, we ensured that the props are passed in correct format as required.

In `./src/components/table/table/jsx` through data received from the `./src/App.jsx`, we showcase the table using `.map()` function to individually iterate through the objects, and the create the table's rows.

The styling was done with tailwind, using tailwind cdn, using `<script>` tag, in `./index.hmtl` (`<head>` section).