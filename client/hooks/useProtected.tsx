'use client'
import React from "react";
import { redirect } from "next/navigation";
import { useLoadUserQuery, useRefreshTokenQuery } from "@/redux/features/apiSlice";
import LinearLoading from "@/components/common/LinearLoading";


export default function Protected({ children }: { children: React.ReactNode }) {
    const { isError, isLoading, data } = useLoadUserQuery();
    const { isError: isRefreshError, isLoading: isRefreshLoading } = useRefreshTokenQuery({});
    console.log(data);
    
    
    if (isLoading || isRefreshLoading) {
        return <LinearLoading />;
    }
    
    if (isError || isRefreshError) {
        redirect('/');
    }

    return children;
}