import { Box, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Title } from 'react-admin';
import { checkServices } from "../http/health";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const services = await checkServices();

const Health = () => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: '50px' }}>
        <Title title="Health Services"/>
        {services.map((service, index) => (
            <Card key={index} sx={{ flex: '1 1 calc(33.333% - 16px)', minWidth: 275 }}>
                
                <CardContent>
                    <Typography variant="h5" component="div">
                            {service.name}
                    </Typography>
                    {service.health.status === 'ok' ? (
                        <Typography variant="h5" component="div" style={{ color: 'green' }}>
                            Service is UP
                        </Typography>
                    ) : (
                        <Typography variant="h5" component="div" style={{ color: 'red' }}>
                            Service is DOWN
                        </Typography>
                    )}                    
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        Detail: {service.root}
                    </Typography>
                    {service.health.details && (
                        <List>                        
                            {Object.entries(service.health.details).map(([key, value]) => {
                                const typedValue = value as { status: string }; // Explicitly cast value to a known type
                                return (
                                    <ListItem key={key} disablePadding>
                                        <ListItemText primary={key} />
                                        <ListItemIcon>
                                            {typedValue.status === 'up' ? (
                                                <CheckCircleIcon style={{ color: 'green' }} />
                                            ) : (
                                                <ErrorIcon style={{ color: 'red' }} />
                                            )}
                                        </ListItemIcon>
                                    </ListItem>
                                );
                            })}
                        </List>
                    )}
                </CardContent>
            </Card>
        ))}
    </Box>
);

export default Health;