import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./assets/Style/index.css";
import { StyledEngineProvider, ThemeProvider, createTheme } from "@mui/material/styles";


const CustomTheme = createTheme({
  palette: {
    primary: {
      main: '#2ED573',

    },
    secondary: {
      main: '#4E81FB',
    },
  },
  direction: 'rtl',
  typography: {
    fontFamily: [
      'Dana',
      'Tahoma'
    ].join(','),
    letterSpacing: 'normal',
    fontSize : 16,
    htmlFontSize: 16,
    color: '#3f3f46'
  },
  shape: {
    borderRadius: 8,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={CustomTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StyledEngineProvider>
);
