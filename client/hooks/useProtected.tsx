import React from "react";
import { redirect } from "next/navigation";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import LinearLoading from "@/components/common/LinearLoading";


export default function Protected({ children }: { children: React.ReactNode }) {
    const { isError, isLoading } = useLoadUserQuery({});

    if (isLoading) {
        return <LinearLoading />;
    }
    
    if (isError) {
        redirect('/');
    }

    return children;
}