import React from 'react';
import { PuffLoader } from 'react-spinners';

export default function LoadingSpinner(props) {
    return (
        <>
        <div
          style={{
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
                >
                <PuffLoader  color="#59d8f1" />
          </div>
    </>
    )

}