import AppRoutes from "./routes/AppRoutes";
import {Toaster} from "react-hot-toast";

function App() {
    return (
        <>
        <Toaster
    position="top-right"
    toastOptions={{
        duration: 3000,
        style: {
            fontSize: "16px",
            padding: "16px 20px",
            minWidth: "360px",
            borderRadius: "10px",
            border: "1px solid #e2e8f0",
            boxShadow: "none",
        },
    }}
/>
        <AppRoutes />
        </>
    );
}

export default App;