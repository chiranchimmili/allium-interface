import "./Modal.css";

const ModalRow = ({rowsData2, rowsData, handleChange, modalNum, selectedRow, setSelectedRow, selectedRow2, setSelectedRow2}) => {

    if (modalNum == 0) {
    return(
        rowsData.map((data, index)=>{
            const {name, type, mode} = data;
            return(
                <tr key={index}>
                    <td>
                        <input type="checkbox" value = {index} onChange={(e) => {setSelectedRow(e.currentTarget.value)}}
                        checked = {selectedRow == index}></input>
                    </td>
                <td> {name}
                </td>
                <td> {type} </td>
                <td> {mode} </td>
            </tr>
            )
        })
    )
    } else {
        return(
            rowsData2.map((data, index)=>{
                const {name, type, mode} = data;
                return(
                    <tr key={index} className = "tableRowElement">
                        <td>
                        <input type="checkbox" value = {index} onChange={(e) => {setSelectedRow2(e.currentTarget.value)}}
                        checked = {selectedRow2 == index}></input>
                        </td>
                    <td> {name}
                    </td>
                    <td> {type} </td>
                    <td> {mode} </td>
                </tr>
                )
            })
        )
    }
    
}
export default ModalRow;