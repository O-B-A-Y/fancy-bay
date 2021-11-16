import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ThunkFetchState from '../../constants/fetch';
import { TreasureBayType } from './types';

const TREASURE_BAY_NAME = 'TREASURE_BAY';
export const TREASURE_BAY_ACTION_CREATE_NEW_BAY = `${TREASURE_BAY_NAME}/CREATE_NEW_BAY`;
export const TREASURE_BAY_ACTION_FETCH_TREASURE_BAY = `${TREASURE_BAY_NAME}/FETCH_TREASURE_BAY`;

interface TreasureBayState {
  status: ThunkFetchState;
  data: {
    fetching: boolean;
    treasureBays: TreasureBayType[];
    yourTreasureBays: TreasureBayType[];
  };
  error: null | object | string;
}

const initialState: TreasureBayState = {
  status: ThunkFetchState.Idle,
  data: {
    fetching: false,
    treasureBays: [],
    yourTreasureBays: [],
  },
  error: null,
};

// export const fetchTreasureBays = createAsyncThunk(
//   TREASURE_BAY_ACTION_FETCH_TREASURE_BAY,
//   async () => {
//     const treasureBayFactoryContract = useTreasureBayFactoryContract();
//     const treasureBayContractMethods: TreasureBayFactory =
//       treasureBayFactoryContract.methods;
//     try {
//       const treasureBayAddresses = await treasureBayContractMethods
//         .getAllBays()
//         .call();
//       if (treasureBayAddresses.length === 0) {
//         return [];
//       }
//       const treasureBays = await Promise.all(
//         treasureBayAddresses.map(async (address) => {
//           const treasureBayContract = useTreasureBayContract(address);
//           const treasureBayContractMethods: TreasureBay =
//             treasureBayContract.methods;

//           const [name] = await Promise.all([
//             treasureBayContractMethods.name().call(),
//           ]);
//           return {
//             name,
//             address,
//           };
//         })
//       );
//       return treasureBays;
//     } catch (error: any) {
//       console.log(error.message);
//       return [];
//     }
//   }
// );

const treasureBaySlice = createSlice({
  name: TREASURE_BAY_NAME,
  initialState,
  reducers: {
    setFetching(state, action: PayloadAction<boolean>) {
      state.data.fetching = action.payload;
    },
    setTreasureBays(state, action: PayloadAction<TreasureBayType[]>) {
      state.data.treasureBays = action.payload;
    },
    setYourBays(state, action: PayloadAction<TreasureBayType[]>) {
      state.data.yourTreasureBays = action.payload;
    },
  },
});

export const { setTreasureBays, setYourBays, setFetching } =
  treasureBaySlice.actions;

export default treasureBaySlice.reducer;
