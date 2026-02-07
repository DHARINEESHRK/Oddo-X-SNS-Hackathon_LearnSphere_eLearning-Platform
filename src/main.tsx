
  import { createRoot } from "react-dom/client";
  import { BrowserRouter } from "react-router-dom";
  import App from "./App.tsx";
  import "./index.css";

  // Global unhandled error / rejection handlers
  window.addEventListener('error', (event) => {
    console.error('[LearnSphere] Unhandled error:', event.error);
  });
  window.addEventListener('unhandledrejection', (event) => {
    console.error('[LearnSphere] Unhandled promise rejection:', event.reason);
  });

  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  