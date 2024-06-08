import "./table.css";
let i = 0;
const Table = ({ data, name, column }) => {
  var time;
  const tdData = () => {
    return data.map((d) => {
      let unixTimestamp = parseInt(d.timeStamp);
      let dateObj = new Date(unixTimestamp * 1000);
      let time = dateObj.toUTCString();
      // time = new Date(parseInt(d.timeStamp));
      return (
        <tr>
          <td>{name[i++]}</td>
          {/* <td>{d.from}</td> */}
          <td>{d.to}</td>
          {/* <td>{d.value}</td>
          <td>{d.gas}</td> */}
          {/* <td>{"Date: " + time}</td> */}
        </tr>
      );
    });
  };
  return (
    <table>
      <thead>
        <tr>
          {column.map((item, index) => (
            <TableHeadItem item={item} />
          ))}
        </tr>
      </thead>
      <tbody>{tdData()}</tbody>
    </table>
  );
};

const TableHeadItem = ({ item }) => <th>{item.heading}</th>;

export default Table;
