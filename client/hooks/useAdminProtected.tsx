'use client'
import React from "react";
import { redirect } from "next/navigation";
import LinearLoading from "@/components/common/LinearLoading";
import useProfile from "./useProfile";


export default function AdminProtected({ children }: { children: React.ReactNode }) {
    const { isError, isLoading, isAdmin } = useProfile();
    
    if (isError || !isAdmin) {
        redirect('/');
    }
    
    if (isLoading) {
        return <LinearLoading />;
    }

    return children;
}