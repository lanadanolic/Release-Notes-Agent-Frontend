import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Stack,
  Fade,
} from '@mui/material';
import { Description as DescriptionIcon } from '@mui/icons-material';
import axios from 'axios';

const GenerateReleaseNotes = () => {
  const [version, setVersion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleGenerate = async () => {
    if (!version) {
      setError('Please enter a version number');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post(`http://localhost:8080/api/release-notes/generate?version=${version}`);
      
      // Download the generated document
      const documentResponse = await axios.get(
        `http://localhost:8080/api/release-notes/document/${version}`,
        { responseType: 'blob' }
      );

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([documentResponse.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `release-notes-${version}.docx`);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate release notes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ 
        fontWeight: 600,
        color: 'text.primary',
        mb: 4
      }}>
        Generate Release Notes
      </Typography>

      <Card
        elevation={0}
        sx={{
          maxWidth: 600,
          mx: 'auto',
          overflow: 'visible'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ 
            color: 'text.secondary',
            mb: 3
          }}>
            Enter Version Information
          </Typography>

          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Version Number"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="e.g., 1.0.0"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.paper',
                }
              }}
            />

            {error && (
              <Fade in={true}>
                <Alert 
                  severity="error" 
                  sx={{ 
                    borderRadius: 2,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  {error}
                </Alert>
              </Fade>
            )}

            {success && (
              <Fade in={true}>
                <Alert 
                  severity="success"
                  sx={{ 
                    borderRadius: 2,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                >
                  Release notes generated successfully!
                </Alert>
              </Fade>
            )}

            <Button
              variant="contained"
              onClick={handleGenerate}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <DescriptionIcon />}
              sx={{
                py: 1.5,
                px: 3,
                alignSelf: 'flex-end'
              }}
            >
              {loading ? 'Generating...' : 'Generate Release Notes'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default GenerateReleaseNotes; 