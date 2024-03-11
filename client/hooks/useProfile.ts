import { useLoadUserQuery, useRefreshTokenQuery } from '@/redux/features/apiSlice';

const useProfile = () => {
    const { isError, isLoading, data } = useLoadUserQuery();
    const { isError: isRefreshError, isLoading: isRefreshLoading } = useRefreshTokenQuery();

  return {
    isError: isError || isRefreshError,
    isLoading: isLoading || isRefreshLoading,
    isAdmin: data?.user.role === 'admin'
  }
}

export default useProfile;