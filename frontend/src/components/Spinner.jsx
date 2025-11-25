import React from 'react';
import { Loader2 } from 'lucide-react';

const Spinner = () => {
    return (
        <div className="flex justify-center items-center">
            <Loader2 className="animate-spin h-5 w-5 text-white" />
        </div>
    );
};

export default Spinner;
