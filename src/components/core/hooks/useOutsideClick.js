import { useEffect } from 'react';

const UseOutsideClick = (ref, callback) => {
    console.log("Reference printing",ref);
    const handleClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            handleClick(e);
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [ref, callback]);
};

export default UseOutsideClick;
