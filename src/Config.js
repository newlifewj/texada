"use strict";

const _config = {
    apiRoot: "/api",
    pageSize: 25,
    path: {
        rootPath: "/",
        equipments: "equipments",
        about: "about",
        home: "home"
    },

    apiUrl: {
        equipments: "/equipments"
    },

    tabs: [
        { label: "Equipments", path: "/equipments", value: "equipments", active: false },
        { label: "About", path: "/about", value: "about", active: false }
    ]
};

export default _config;

