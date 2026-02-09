import {createSystem, defaultConfig, defineConfig} from "@chakra-ui/react";

const config = defineConfig({
    theme: {
        tokens: {
            colors: {
                text: {
                    primary: {value: "#1C1C1C"},
                    btnLight: {value: "#F1F1F1"},
                    placeholderSearch: {value: "#ABABAB"},
                },

                icon: {
                    search: {value: "#B0B0B0"},
                },

                border: {
                    default: {value: "#D9E1EC"},
                    headerPopup: {value: "#DDDDDD"},
                },

                surface: {
                    white: {value: "#FFFFFF"},
                },
            },

            fonts: {
                heading: {value: `'Inter', sans-serif`},
                body: {value: `'Inter', sans-serif`},
            },
        },
    },
});

export const system = createSystem(defaultConfig, config);
