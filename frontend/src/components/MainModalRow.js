import "./Modal.css";

const MainModalRow = ({rowsData2, rowsData, selectedRows, updateSelectedRows, containsIndex }) => {
    
    return (
        ([...rowsData, ...rowsData2]).map((data, index)=>{
            const {port, streamName, type, mode} = data;
            return(
                <tr key={index}>
                    <td>
                        <input type="checkbox" value = {index} checked = {selectedRows.includes(index.toString())}
                        onChange={(e) => {updateSelectedRows(e.currentTarget.value, e.currentTarget.checked)}}
                         ></input>
                    </td>
                <td> {index} </td>
                <td> {port} </td>
                <td> {streamName}
                </td>
                <td> {type} </td>
                <td> {mode} </td>
                <td>
                    <input type="text" disabled = {!(selectedRows[index])}/>
                </td>
            </tr>
            )
        })
    )
}
export default MainModalRow;