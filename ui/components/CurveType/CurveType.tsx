import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectLabel,
  SelectValue,
  SelectGroup,
} from '@components/ui/select';
import { curvesTypes, curveSubTypes } from '@constants/curves';
import useColorPicker from '@store/colorPicker';
import { getRelativePositionForHandles } from './utils';

function CurveType() {
  const {
    freeHandMode,
    curveType,
    updateCurveType,
    curveSubType,
    updateCurveSubType,
    startPoint,
    endPoint,
    updateStartPointHandle,
    updateEndPointHandle,
  } = useColorPicker(
    useShallow((state) => {
      const {
        freeHandMode: freeHandModeState,
        curveType: curveTypeState,
        updateCurveType: updateCurveTypeState,
        curveSubType: curveSubTypeState,
        updateCurveSubType: updateCurveSubTypeState,
        startPoint: startPointState,
        endPoint: endPointState,
        updateStartPointHandle: updateStartPointHandleState,
        updateEndPointHandle: updateEndPointHandleState,
      } = state;
      return {
        freeHandMode: freeHandModeState,
        curveType: curveTypeState,
        updateCurveType: updateCurveTypeState,
        curveSubType: curveSubTypeState,
        updateCurveSubType: updateCurveSubTypeState,
        startPoint: startPointState,
        endPoint: endPointState,
        updateStartPointHandle: updateStartPointHandleState,
        updateEndPointHandle: updateEndPointHandleState,
      };
    }),
  );
  const curveTypeOptions = Object.values(curvesTypes);
  const subTypeOptions = Object.values(curveSubTypes);

  useEffect(() => {
    if (
      !freeHandMode &&
      curveType &&
      ((curvesTypes[curveType].subTypes && curveSubType) ||
        !curvesTypes[curveType].subTypes)
    ) {
      const { startHandleX, startHandleY, endHandleX, endHandleY } =
        getRelativePositionForHandles(
          startPoint,
          endPoint,
          curveType,
          curveSubType,
        );
      updateStartPointHandle({
        x: startHandleX,
        y: startHandleY,
      });

      updateEndPointHandle({
        x: endHandleX,
        y: endHandleY,
      });
    }
  }, [
    curveType,
    curveSubType,
    updateStartPointHandle,
    startPoint,
    endPoint,
    updateEndPointHandle,
    freeHandMode,
  ]);

  useEffect(() => {
    if (curveType && !curvesTypes[curveType].subTypes) {
      updateCurveSubType('');
    }
  }, [curveType, updateCurveSubType]);

  return (
    <>
      <div className="w-40 flex flex-col gap-2">
        <SelectGroup>
          <SelectLabel className="px-0">Curve</SelectLabel>
          <Select
            onValueChange={updateCurveType}
            value={curveType}
            disabled={freeHandMode}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Curve" />
            </SelectTrigger>
            <SelectContent>
              {curveTypeOptions.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </SelectGroup>
      </div>
      <div className="w-56 flex flex-col gap-2">
        <SelectGroup>
          <SelectLabel className="px-0">Curve Transition</SelectLabel>
          <Select
            onValueChange={updateCurveSubType}
            value={curveSubType}
            disabled={
              freeHandMode ||
              !curveType ||
              !!(curveType && !curvesTypes[curveType].subTypes)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Curve Transition" />
            </SelectTrigger>
            <SelectContent>
              {curveType &&
                curvesTypes[curveType].subTypes &&
                subTypeOptions.map((subType) => (
                  <SelectItem key={subType.id} value={subType.id}>
                    {subType.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </SelectGroup>
      </div>
    </>
  );
}

export default CurveType;
