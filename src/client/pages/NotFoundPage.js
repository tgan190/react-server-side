import React from 'react'

const NotFoundPage = ({staticContext = {}} ) => {
    staticContext.notFound = true;
    return (
    <h1>
        Ooops, Route Not Found.
    </h1>
    )
};

export default {
    component: NotFoundPage
};