import React from 'react'

const useStringState = (initial: string) => {
    const [value, setValue] = React.useState<string>('');
    const onChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setValue(event.target.value);
    }, []);
    return {
        value,
        onValueChange: onChange
    }
};

export default useStringState;