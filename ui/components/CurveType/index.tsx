import { Label } from '@components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { curvesTypes, subTypes } from '@constants/curves';
import type { CurveTypeProps } from './types';

function CurveType({
  curveType,
  curveSubType,
  handleCurveType,
  handleCurveSubType,
}: CurveTypeProps) {
  const curveTypeOptions = Object.values(curvesTypes);
  const subTypeOptions = Object.values(subTypes);

  return (
    <>
      <div className="w-40 flex flex-col gap-2">
        <Label>Curve Type</Label>
        <Select onValueChange={handleCurveType} value={curveType}>
          <SelectTrigger>
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            {curveTypeOptions.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-48 flex flex-col gap-2">
        {curvesTypes[curveType].subTypes ? (
          <>
            <Label>Sub Type</Label>
            <Select onValueChange={handleCurveSubType} value={curveSubType}>
              <SelectTrigger>
                <SelectValue placeholder="Select Sub Type" />
              </SelectTrigger>
              <SelectContent>
                {subTypeOptions.map((subType) => (
                  <SelectItem key={subType.id} value={subType.id}>
                    {subType.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        ) : null}
      </div>
    </>
  );
}

export default CurveType;
