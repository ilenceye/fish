import { Input } from '~/ui/input';
import { Label } from '~/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/ui/select';

import { Shape, useGlobalContext } from './context';

const SHAPES: Shape[] = ['square', 'rounded', 'circle'];

function ShapePicker() {
  const context = useGlobalContext();

  return (
    <Select
      value={context.shape}
      onValueChange={(value) => context.setShape(value as Shape)}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {SHAPES.map((shape) => (
          <SelectItem className="cursor-pointer" key={shape} value={shape}>
            {shape}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function ConfigureItem({ children }: React.PropsWithChildren) {
  return <div className="space-y-2">{children}</div>;
}

export default function Configure() {
  const context = useGlobalContext();

  return (
    <div className="space-y-4">
      <ConfigureItem>
        <Label htmlFor="text" className="font-bold">
          Text
        </Label>
        <Input
          id="text"
          type="text"
          value={context.text}
          onChange={(e) => context.setText(e.target.value)}
        />
      </ConfigureItem>
      <ConfigureItem>
        <Label htmlFor="shape" className="font-bold">
          Shape
        </Label>
        <ShapePicker />
      </ConfigureItem>
      <ConfigureItem>
        <Label htmlFor="color" className="font-bold">
          Text Color
        </Label>
        <Input
          id="color"
          type="text"
          value={context.color}
          onChange={(e) => context.setColor(e.target.value)}
        />
      </ConfigureItem>
      <ConfigureItem>
        <Label htmlFor="bg" className="font-bold">
          Background Color
        </Label>
        <Input
          id="bg"
          type="text"
          value={context.bg}
          onChange={(e) => context.setBg(e.target.value)}
        />
      </ConfigureItem>
    </div>
  );
}
