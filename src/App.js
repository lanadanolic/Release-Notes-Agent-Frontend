import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeContext, ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import GenerateReleaseNotes from './pages/GenerateReleaseNotes';
import ViewReleaseNotes from './pages/ViewReleaseNotes';
import Settings from './pages/Settings';
import Documentation from './pages/Documentation';
import Statistics from './pages/Statistics';
import VersionDetails from './pages/VersionDetails';
import { SnackbarProvider } from 'notistack';

function ThemeWrapper({ children }) {
  const { theme } = useContext(ThemeContext);
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

function AppContent() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generate" element={<GenerateReleaseNotes />} />
            <Route path="/view" element={<ViewReleaseNotes />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/version/:id" element={<VersionDetails />} />
          </Routes>
        </Layout>
      </Router>
    </SnackbarProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <AppContent />
      </ThemeWrapper>
    </ThemeProvider>
  );
}

export default App; 