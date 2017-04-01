import {TimestampPipe} from './timestamp.pipe';
import {IAnalogData} from '../../../../../../server/entities/data.interface';

describe('TimestampPipe', () => {
  it('create an instance', () => {
    const pipe = new TimestampPipe();
    expect(pipe).toBeTruthy();
  });
  it('test timestamp attribute of IAnalogData', () => {
    const pipe = new TimestampPipe();
    const analogData: IAnalogData = {timestamp: 1};
    expect(pipe.transform(analogData)).toEqual(1);
  });
  it('test empty IAnalogData', () => {
    const pipe = new TimestampPipe();
    const analogData: IAnalogData = {};
    expect(pipe.transform(analogData)).toBeUndefined();
  });
  it('test null', () => {
    const pipe = new TimestampPipe();
    expect(pipe.transform(null)).toBeNull();
  });
});
