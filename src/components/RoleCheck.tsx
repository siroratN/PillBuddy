'use client';
import { RoleContext } from '@/app/AuthProvider/page';
import { useContext } from 'react';
const RoleCheck = () => {
    const { role } = useContext(RoleContext);

    if (role === null) {
        return <p>ไม่มีคับอ้วน</p>;
    }

    return (
        <div>
            {role === 'patient' ? (
                <p>You are a Patient</p>
            ) : role === 'caregiver' ? (
                <p>You are a Caregiver</p>
            ) : (
                <p>You do not have a defined role.</p>
            )}
        </div>
    );
};

export default RoleCheck;
