import React, { Suspense } from 'react'
import FerbyLoading from '../FerbyLoading/FerbyLoading'

const FerbySuspense = ({ children }) => {
    return <Suspense fallback={<FerbyLoading />}>{children}</Suspense>
}

export default FerbySuspense