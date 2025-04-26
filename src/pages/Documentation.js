import React from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Help as HelpIcon,
  Description as DescriptionIcon,
  Settings as SettingsIcon,
  ViewList as ViewListIcon,
} from '@mui/icons-material';

const faqItems = [
  {
    question: 'How do I generate release notes?',
    answer: 'Navigate to the "Generate Notes" page, enter your version number, and click the generate button. The system will automatically create release notes based on your repository changes.',
  },
  {
    question: 'What formats are supported for export?',
    answer: 'Currently, we support Word (.docx), PDF, and Markdown formats. You can choose your preferred format in the settings.',
  },
  {
    question: 'How do I customize the release notes template?',
    answer: 'Go to Settings > Release Notes Template to choose from predefined templates or create your own custom template.',
  },
  {
    question: 'Can I edit generated release notes?',
    answer: 'Yes, you can edit the generated release notes before exporting them. The changes will be saved automatically.',
  },
];

const quickStartSteps = [
  {
    icon: <DescriptionIcon />,
    title: 'Generate Release Notes',
    description: 'Create new release notes by analyzing your repository changes.',
  },
  {
    icon: <ViewListIcon />,
    title: 'View History',
    description: 'Browse and manage your existing release notes.',
  },
  {
    icon: <SettingsIcon />,
    title: 'Customize Settings',
    description: 'Adjust templates, export formats, and other preferences.',
  },
];

const Documentation = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Documentation
      </Typography>

      {/* Quick Start Guide */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Quick Start Guide
          </Typography>
          <List>
            {quickStartSteps.map((step, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemIcon>{step.icon}</ListItemIcon>
                  <ListItemText
                    primary={step.title}
                    secondary={step.description}
                  />
                </ListItem>
                {index < quickStartSteps.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Typography variant="h5" gutterBottom>
        Frequently Asked Questions
      </Typography>
      {faqItems.map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography>{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Additional Resources */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Additional Resources
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText
                primary="Contact Support"
                secondary="Need help? Contact our support team for assistance."
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Documentation; 