import { Label } from '@components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { curvesTypes, curveSubTypes } from '@constants/curves';
import useColorPicker from '@store/colorPicker';

function CurveType() {
  const { curveType, updateCurveType, curveSubType, updateCurveSubType } =
    useColorPicker();
  const curveTypeOptions = Object.values(curvesTypes);
  const subTypeOptions = Object.values(curveSubTypes);

  return (
    <>
      <div className="w-40 flex flex-col gap-2">
        <Label>Curve Type</Label>
        <Select onValueChange={updateCurveType} value={curveType}>
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
            <Select onValueChange={updateCurveSubType} value={curveSubType}>
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
