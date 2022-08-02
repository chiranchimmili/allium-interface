import "./Modal.css";

const MainModalRow = ({rowsData2, rowsData, selectedRow3, setSelectedRow3 }) => {
    
    return (
        ([...rowsData, ...rowsData2]).map((data, index)=>{
            const {name, type, mode} = data;
            return(
                <tr key={index}>
                    <td>
                        <input type="checkbox" value = {index} onChange={(e) => {setSelectedRow3(e.currentTarget.value)}}
                        checked = {selectedRow3 == index}></input>
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
export default MainModalRow;