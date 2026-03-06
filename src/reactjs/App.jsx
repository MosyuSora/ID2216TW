import React from "react";
import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Sidebar } from "./sidebarPresenter.jsx";
import { Search } from "./searchPresenter.jsx";
import { Summary } from "./summaryPresenter.jsx";
import { Details } from "./detailsPresenter.jsx";

/**
 * App Layout Component
 * Renders the Sidebar and an Outlet for the routed content.
 */
const AppLayout = observer(function AppLayout(props) {
    return (
        <>
            <Sidebar model={props.model} />
            <Outlet />
        </>
    );
});

/**
 * App Component
 * Defines the routing structure and provides the RouterProvider.
 */
const App = observer(function App(props) {
    const router = createHashRouter([
        {
            path: "/",
            element: <AppLayout model={props.model} />,
            children: [
                {
                    index: true,
                    element: <Search model={props.model} />,
                },
                {
                    path: "search",
                    element: <Search model={props.model} />,
                },
                {
                    path: "summary",
                    element: <Summary model={props.model} />,
                },
                {
                    path: "details",
                    element: <Details model={props.model} />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
});

export default App;
