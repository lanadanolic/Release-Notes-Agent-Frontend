import React, { useContext } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  Stack,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { ThemeContext } from '../context/ThemeContext';
import { enqueueSnackbar } from 'notistack';

const Settings = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [language, setLanguage] = React.useState('en');
  const [template, setTemplate] = React.useState('default');

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    enqueueSnackbar('Language preference saved', { variant: 'success' });
  };

  const handleTemplateChange = (event) => {
    setTemplate(event.target.value);
    enqueueSnackbar('Template preference saved', { variant: 'success' });
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>

      <Stack spacing={3}>
        {/* Theme Settings */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Appearance
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={toggleDarkMode}
                  color="primary"
                />
              }
              label="Dark Mode"
            />
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Language
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Language</InputLabel>
              <Select
                value={language}
                onChange={handleLanguageChange}
                label="Language"
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="hr">Hrvatski</MenuItem>
                <MenuItem value="de">Deutsch</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Card>

        {/* Template Settings */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Release Notes Template
            </Typography>
            <FormControl fullWidth>
              <InputLabel>Template</InputLabel>
              <Select
                value={template}
                onChange={handleTemplateChange}
                label="Template"
              >
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="detailed">Detailed</MenuItem>
                <MenuItem value="minimal">Minimal</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Card>

        {/* Export Settings */}
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Export Settings
            </Typography>
            <Stack direction="row" spacing={2}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Include Version History"
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label="Include Statistics"
              />
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default Settings; 