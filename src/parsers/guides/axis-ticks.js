import {Top, Left, Bottom, Value, Label} from './constants';
import guideMark from './guide-mark';
import {RuleMark} from '../marks/marktypes';
import {AxisTickRole} from '../marks/roles';
import {encoder} from '../encode/encode-util';

export default function(spec, config, userEncode, dataRef) {
  var orient = spec.orient,
      sign = (orient === Left || orient === Top) ? -1 : 1,
      size = spec.tickSize != null ? spec.tickSize : config.tickSize,
      zero = {value: 0},
      encode = {}, enter, exit, update, tickSize, tickPos;

  encode.enter = enter = {
    opacity: zero,
    stroke: {value: config.tickColor},
    strokeWidth: {value: config.tickWidth}
  };

  encode.exit = exit = {
    opacity: zero
  };

  encode.update = update = {
    opacity: {value: 1}
  };

  tickSize = encoder(size);
  tickSize.mult = sign;

  tickPos = {
    scale:  spec.scale,
    field:  Value,
    band:   config.bandPosition,
    round:  true
  };

  if (orient === Top || orient === Bottom) {
    update.y = enter.y = zero;
    update.y2 = enter.y2 = tickSize;
    update.x = enter.x = exit.x = tickPos;
  } else {
    update.x = enter.x = zero;
    update.x2 = enter.x2 = tickSize;
    update.y = enter.y = exit.y = tickPos;
  }

  return guideMark(RuleMark, AxisTickRole, Label, dataRef, encode, userEncode);
}
