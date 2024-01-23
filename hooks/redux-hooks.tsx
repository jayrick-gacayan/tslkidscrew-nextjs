import { AppDispatch, RootState } from '@/react-redux/redux-store'
import { useDispatch, useSelector } from 'react-redux'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();