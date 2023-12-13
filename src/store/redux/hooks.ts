import { TypedUseSelectorHook, useSelector } from 'react-redux';

import rootReducer from './reducer';

export type RootState = ReturnType<typeof rootReducer>

export type AppSelector = TypedUseSelectorHook<RootState>;

export const useAppSelector: AppSelector = useSelector;
