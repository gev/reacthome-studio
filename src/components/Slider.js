import { Slider } from "@rmwc/slider";
import { Typography } from "@rmwc/typography";
import React from "react";

export default ({ label = 'value', value = 0, min, max, step, discrete, onInput }) => {
    return (
        <div>
            <div>
                <Typography use="caption">{label}{typeof value === 'number' && `: ${value.toFixed(1)}`}</Typography>
            </div>
            <Slider
                min={0}
                max={max - min}
                step={step}
                value={value - min}
                discrete={discrete}
                onInput={event => onInput({ ...event, detail: { value: event.detail.value + min } })}
            />
        </div>
    )
}
