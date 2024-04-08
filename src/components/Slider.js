import { Slider } from "@rmwc/slider";
import debounce from "debounce";
import React from "react";

export default ({ label = 'value', value = 0, min, max, step, discrete, color, onInput }) => (
    <div>
        <div>{[label, value].join(': ')}</div>
        <Slider
            min={min}
            max={max}
            step={step}
            value={value}
            discrete={discrete}
            color={color}
            onInput={onInput && debounce(onInput, 250, true)}
        />
    </div>
)
