import React from 'react'

const ErrorMsg = (props) => {

    const test_style = {
        border: "2px solid #4ed9b6",
        backgroundColor: "#4ed9b6",      
    }

    if(props.errorMsg){
        return (
            <div className="alert alert-danger" role="alert">
                Error: {props.errorMsg}
            </div>
        )
    } else {
        return(<div></div>)
    }
}
export default ErrorMsg;