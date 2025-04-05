import { createSlice } from '@reduxjs/toolkit';
import { getCars, createCar, updateCarApi, deleteCarApi } from '../api';

const initialState = {
  cars: [],
  status: 'idle',
  error: null
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    fetchCarsStart(state) {
      state.status = 'loading';
    },
    fetchCarsSuccess(state, action) {
      state.status = 'succeeded';
      state.cars = action.payload;
    },
    fetchCarsFailure(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
    addCarSuccess(state, action) {
      state.cars.push(action.payload);
    },
    updateCarSuccess(state, action) {
      const { id, ...carData } = action.payload;
      const index = state.cars.findIndex(car => car._id === id);
      if (index !== -1) {
        state.cars[index] = { ...state.cars[index], ...carData };
      }
    },
    deleteCarSuccess(state, action) {
      state.cars = state.cars.filter(car => car._id !== action.payload);
    }
  }
});

export const {
  fetchCarsStart,
  fetchCarsSuccess,
  fetchCarsFailure,
  addCarSuccess,
  updateCarSuccess,
  deleteCarSuccess
} = carsSlice.actions;

export default carsSlice.reducer;

// Thunks
export const fetchCars = () => async (dispatch) => {
  dispatch(fetchCarsStart());
  try {
    const carsData = await getCars();
    dispatch(fetchCarsSuccess(carsData));
  } catch (error) {
    dispatch(fetchCarsFailure(error.message));
  }
};

export const addCar = (carData) => async (dispatch) => {
  try {
    const newCar = await createCar(carData);
    dispatch(addCarSuccess(newCar));
  } catch (error) {
    throw error;
  }
};

export const updateCar = (id, carData) => async (dispatch) => {
  try {
    await updateCarApi(id, carData);
    dispatch(updateCarSuccess({ id, ...carData }));
  } catch (error) {
    throw error;
  }
};

export const deleteCar = (id) => async (dispatch) => {
  try {
    await deleteCarApi(id);
    dispatch(deleteCarSuccess(id));
  } catch (error) {
    throw error;
  }
};