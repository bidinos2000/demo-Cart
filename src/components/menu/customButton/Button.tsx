import React from 'react';
import './Button.css'
const STYLES = ['btn--primary', 'btn--out-line'];

const SIZES = ['btn--medium', 'btn--large', 'btn--mobile', 'btn--wide']


const COLOR = ['primary', 'blue', 'red', 'greeb'];

export const Button = (prop:any) => {
    const checkButtonStyle = STYLES.includes(prop.buttonStyle) ? prop.buttonStyle : STYLES[0]

    const checkButtonSize = SIZES.includes(prop.buttonSize) ? prop.buttonSize : SIZES[0]

    const checkButtonColor = COLOR.includes(prop.buttonColor) ? prop.buttonColor : COLOR[0]

    return (
        <button
            className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonColor} btn-border`}
            onClick={prop.onClick} type={prop.type}
        >
            {prop.children}
        </button>
    )
};
