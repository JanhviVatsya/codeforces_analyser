import React, { ReactNode } from "react";
import './Error.css';

class ErrorComponent extends React.Component <any, any> {
    constructor(props: any){
        super(props);
    }

    render(): ReactNode {
        return (
            <div className="errorModal">
                {this.props.code === 400 ? 'User not found, please make sure the handle is correct!' : 'We ran into some unexpected error, please try again.'}
            </div>
        )
    }
}

export default ErrorComponent