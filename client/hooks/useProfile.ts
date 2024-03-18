import { useLoadUserQuery, useRefreshTokenQuery } from '@/redux/features/apiSlice';

const useProfile = () => {
  const { isError, isLoading, isSuccess, data, refetch } = useLoadUserQuery();
  const { isError: isRefreshError, isLoading: isRefreshLoading, isSuccess: isRefreshSuccess } = useRefreshTokenQuery();

  return {
    isError: isError || isRefreshError,
    isLoading: isLoading || isRefreshLoading,
    isAdmin: data?.user.role === 'admin',
    isLoggedIn: isSuccess && !isLoading,
    refetch
  }
}

export default useProfile;