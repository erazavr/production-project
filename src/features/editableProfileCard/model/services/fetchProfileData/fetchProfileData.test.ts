import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchProfileData } from './fetchProfileData';

const data = {
  username: 'Ernie',
  age: 21,
  country: Country.Kyrgyzstan,
  first: 'Ernur',
  lastname: 'Kurmanbekov',
  city: 'Bishkek',
  currency: Currency.KGS,
};

describe('fetchProfileData.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);

    thunk.api.get.mockReturnValue(Promise.resolve({ data }));
    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toBeCalled();
    expect(result.meta.requestStatus).toEqual('fulfilled');
    expect(result.payload).toEqual(data);
  });
  test('error', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toBeCalled();
    expect(result.meta.requestStatus).toEqual('rejected');
    expect(result.payload).toEqual('error');
  });
});
