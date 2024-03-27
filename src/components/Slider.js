import { Slider } from "@rmwc/slider";
import React from "react";

export default ({ label = 'value', value = 0, min, max, step, discrete, onInput }) => (
    <div>
        <div>{[label, value].join(': ')}</div>
        <Slider value={value} min={min} max={max} step={step} onInput={onInput} discrete={discrete} />
    </div>
)
