'use client'
import React from "react";
import { redirect } from "next/navigation";
import LinearLoading from "@/components/common/LinearLoading";
import useProfile from "./useProfile";


export default function Protected({ children }: { children: React.ReactNode }) {
    const { isError, isLoading } = useProfile();
    
    if (isError) {
        redirect('/');
    }
    
    if (isLoading) {
        return <LinearLoading />;
    }

    return children;
}