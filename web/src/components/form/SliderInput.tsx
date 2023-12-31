import { Input, SliderSingleProps } from "antd";
import { Slider } from "antd";
import { useControllableValue } from "ahooks";
export default function SliderInput(
  props: SliderSingleProps
) {
  const [value, setValue] = useControllableValue(props);
  return (
    <div className="flex justify-around gap-2 w-full">
      {props.step && (
        <Slider
          {...props}
          value={value}
          onChange={setValue}
          className="w-[70%]"
        ></Slider>
      )}
      <Input
        className="flex-1"
        type="number"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></Input>
    </div>
  );
}
