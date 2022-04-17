/**
 * Copyright (c) 2021-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {useEffect, useRef, useState} from 'react';

export const NO_TOTAL_PAGES_ERROR = 'The UsePagination hook must receive a totalPages argument for it to work';

const usePagination = ({totalPages, initialCursor, onChange} = {}) => {
    if (!totalPages) {
        throw new Error(NO_TOTAL_PAGES_ERROR);
    }

    const [cursor, setInternalCursor] = useState(initialCursor || 0);

    const setCursor = (newCursor) => {
        if (newCursor >= 0 && newCursor < totalPages) {
            setInternalCursor(newCursor);
        }
    };

    const goNext = () => {
        const nextCursor = cursor + 1;
        setCursor(nextCursor);
    };

    const goPrev = () => {
        const prevCursor = cursor - 1;
        setCursor(prevCursor);
    };

    const isHookInitializing = useRef(true);

    useEffect(() => {
        if (isHookInitializing.current) {
            isHookInitializing.current = false;
        } else {
            onChange?.(cursor);
        }
    }, [cursor]);

    return {totalPages, cursor, goNext, goPrev, setCursor};
};

export default usePagination;
