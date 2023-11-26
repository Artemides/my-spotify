import * as RadixSlider from "@radix-ui/react-slider";

type SliderProps = {
  value?: number;
  onChange?: (value: number) => void;
};

export const Slider = ({ value = 1, onChange }: SliderProps) => {
  const handleRangeChange = (values: number[]) => {
    onChange?.(values[0]);
  };

  return (
    <RadixSlider.Root
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleRangeChange}
      max={1}
      step={0.1}
      aria-label="volume"
      className="relative w-full flex items-center select-none touch-none "
    >
      <RadixSlider.Track className="relative  bg-neutral-400 grow rounded-full h-[3px]">
        <RadixSlider.Range className="absolute bg-white rounded-full h-full" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};
