import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  CircularProgress,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  CompareArrows as CompareIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

const VersionDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState(null);
  const [compareVersion, setCompareVersion] = useState('');
  const [availableVersions, setAvailableVersions] = useState([]);
  const [compareDialogOpen, setCompareDialogOpen] = useState(false);
  const [comparison, setComparison] = useState(null);

  useEffect(() => {
    const fetchVersionDetails = async () => {
      try {
        setLoading(true);
        const [versionResponse, versionsResponse] = await Promise.all([
          axios.get(`http://localhost:8080/api/versions/${id}`),
          axios.get('http://localhost:8080/api/versions'),
        ]);
        setVersion(versionResponse.data);
        setAvailableVersions(versionsResponse.data);
      } catch (error) {
        console.error('Error fetching version details:', error);
        enqueueSnackbar('Error loading version details', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchVersionDetails();
  }, [id]);

  const handleCompare = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/versions/compare/${id}/${compareVersion}`
      );
      setComparison(response.data);
      setCompareDialogOpen(true);
    } catch (error) {
      console.error('Error comparing versions:', error);
      enqueueSnackbar('Error comparing versions', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/versions/${id}/download`,
        { responseType: 'blob' }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `release-notes-${version.version}.docx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading version:', error);
      enqueueSnackbar('Error downloading version', { variant: 'error' });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (!version) {
    return (
      <Typography variant="h6" color="error">
        Version not found
      </Typography>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Version {version.version}
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<CompareIcon />}
            onClick={() => setCompareDialogOpen(true)}
            sx={{ mr: 2 }}
          >
            Compare
          </Button>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
          >
            Download
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Version Info */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Version Information
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Version Number"
                    secondary={version.version}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Release Date"
                    secondary={new Date(version.releaseDate).toLocaleDateString()}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Status"
                    secondary={
                      <Chip
                        label={version.status}
                        color={version.status === 'released' ? 'success' : 'warning'}
                        size="small"
                      />
                    }
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Changes */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Changes
              </Typography>
              <List>
                {version.changes.map((change, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={change.title}
                        secondary={change.description}
                      />
                      <Chip
                        label={change.type}
                        color="primary"
                        size="small"
                        sx={{ ml: 2 }}
                      />
                    </ListItem>
                    {index < version.changes.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Compare Dialog */}
      <Dialog
        open={compareDialogOpen}
        onClose={() => setCompareDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Compare Versions</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Compare with</InputLabel>
            <Select
              value={compareVersion}
              onChange={(e) => setCompareVersion(e.target.value)}
              label="Compare with"
            >
              {availableVersions
                .filter((v) => v.id !== id)
                .map((v) => (
                  <MenuItem key={v.id} value={v.id}>
                    Version {v.version}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {comparison && (
            <Box mt={2}>
              <Typography variant="h6" gutterBottom>
                Changes
              </Typography>
              <List>
                {comparison.changes.map((change, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={change.title}
                        secondary={change.description}
                      />
                      <Chip
                        label={change.type}
                        color={change.type === 'added' ? 'success' : 'error'}
                        size="small"
                        sx={{ ml: 2 }}
                      />
                    </ListItem>
                    {index < comparison.changes.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCompareDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleCompare}
            variant="contained"
            disabled={!compareVersion}
          >
            Compare
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VersionDetails; 