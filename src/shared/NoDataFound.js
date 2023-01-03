//Empty component no data found from DB
import React from "react";

export default function EmptyRowComponent(props) {
    return (
        <>
            <tr>
                <td  colSpan={props.colSpan} align={'center'}>No Data Found</td>
            </tr>
        </>
    )
}