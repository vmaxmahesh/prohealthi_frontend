import React from 'react';
import { PuffLoader } from 'react-spinners';

export default function LoadingSpinner(props) {
    return (
        <>
        <tr>
          <td colSpan={props.colSpan}
          style={{
          alignItems: "center"
        }}>
          <PuffLoader  color="#59d8f1" />
          </td>

          </tr>
    </>
    )

}