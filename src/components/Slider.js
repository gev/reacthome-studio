import { Slider } from "@rmwc/slider";
import React from "react";

export default ({ label = 'value', value = 0, min, max, step, discrete, onInput }) => {
    // const debounced = debounce(event => onInput(event), 100);
    return (
        <div>
            <div>{[label, value].join(': ')}</div>
            <Slider
                min={min}
                max={max}
                step={step}
                value={value}
                discrete={discrete}
                onInput={onInput}
            />
        </div>
    )
}
