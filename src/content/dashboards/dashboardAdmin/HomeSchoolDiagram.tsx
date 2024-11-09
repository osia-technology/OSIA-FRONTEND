import React, { useEffect, useState } from 'react';
import {
  Card,
  Box,
  Grid,
  Typography,
  CircularProgress,
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
  ButtonGroup,
} from '@mui/material';
import SnackbarNotification from 'src/components/SnackbarNotification';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { fetchSchoolCategories } from 'src/store/thunks/schoolThunks';
import { selectSchoolCategories } from 'src/store/selectors/schoolsSelectors';
import { useSnackbar } from 'src/utils/notifications/useSnackbar';
import { selectToken } from 'src/store';

const getWeeksOfMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const weeks = [];
  let currentWeek = new Date(year, month, 1);

  while (currentWeek.getMonth() === month) {
    const startOfWeek = new Date(currentWeek);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    if (endOfWeek > now) {
      endOfWeek.setDate(now.getDate());
    }

    weeks.push({
      start: `${startOfWeek.getDate()}-${endOfWeek.getDate()}/${startOfWeek.getMonth() + 1}/${year}`,
    });

    currentWeek.setDate(currentWeek.getDate() + 7);
  }

  const lastWeekEnd = weeks[weeks.length - 1].start.split('-')[1].split('/')[0];
  if (now.getDate() > lastWeekEnd) {
    weeks.push({
      start: `${now.getDate()}-${now.getDate()}/${
        now.getMonth() + 1
      }/${year}`,
    });
  }

  const totalWeeks = weeks.length;
  const weeksToShow = 4;

  return weeks.slice(Math.max(totalWeeks - weeksToShow, 0));
};




const getHoursOfDayUntilNow = () => {
  const now = new Date();
  const currentHour = now.getHours();
  const hours = [];
  for (let i = 0; i <= currentHour; i++) {
    hours.push(`${i}h`);
  }
  return hours;
};

const getPastMonthsOfYear = () => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];
  return months.slice(0, currentMonth + 1);
};

function HomeSchoolDiagram() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const {handleClose, severity, handleShowSnackbar, open, message } = useSnackbar();
  const schoolCategories = useSelector(selectSchoolCategories);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(5);
  const [chartData, setChartData] = useState({
    categories: [],
    schoolCounts: []
  });
  const [timeRange, setTimeRange] = useState('month');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchSchoolCategories(token));
      setLoading(false);
    };
    fetchData();
  }, [dispatch, token]);

  useEffect(() => {
    if (schoolCategories.length > 0) {
      const counts = schoolCategories.map(() => Math.floor(Math.random() * 100) + 1);
      setChartData({
        categories: schoolCategories.map((cat) => cat.name),
        schoolCounts: counts
      });
    }
  }, [schoolCategories]);

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = currentPage * itemsPerPage;
  const paginatedCategories = chartData.categories.slice(indexOfFirstItem, indexOfLastItem);
  const paginatedCounts = chartData.schoolCounts.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (indexOfLastItem < chartData.categories.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
  };

  let schoolRegistrationSeries = [];
  let categories = [];

  if (timeRange === 'today') {
    categories = getHoursOfDayUntilNow();
    schoolRegistrationSeries = [{
      name: 'Écoles enregistrées aujourd\'hui',
      data: Array.from({ length: categories.length }, () => Math.floor(Math.random() * 10) + 1)
    }];
  } else if (timeRange === 'month') {
    categories = getWeeksOfMonth().map((week) => week.start);
    schoolRegistrationSeries = [{
      name: 'Écoles enregistrées ce mois',
      data: [10, 20, 35, 50]
    }];
  } else if (timeRange === 'year') {
    categories = getPastMonthsOfYear();
    schoolRegistrationSeries = [{
      name: 'Écoles enregistrées cette année',
      data: Array.from({ length: categories.length }, () => Math.floor(Math.random() * 100) + 1)
    }];
  }

  const schoolRegistrationChartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      background: 'transparent',
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal: false,
        barHeight: '75%'
      }
    },
    colors: ['#1c81c2', '#ff9900', '#5c6ac0', '#333', '#ddd'],
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: '14px'
        }
      }
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="350px">
        <CircularProgress />
      </Box>
    );
  }

  return (
<> 
    <Card>
      <Grid spacing={0} container>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 3
              }}
              variant="h4"
            >
              Catégories d'école
            </Typography>
            <Chart
              height={400}
              options={{
                chart: {
                  background: 'transparent',
                  toolbar: {
                    show: false
                  }
                },
                labels: paginatedCategories,
                plotOptions: {
                  pie: {
                    donut: {
                      size: '70%'
                    }
                  }
                },
                colors: ['#ff9900', '#1c81c2', '#333', '#5c6ac0', '#ddd'],
                dataLabels: {
                  enabled: true,
                  formatter: function (val, opts) {
                    const totalSchools = chartData.schoolCounts[opts.seriesIndex];
                    return `${totalSchools} écoles`;
                  },
                  style: {
                    fontSize: '14px',
                    colors: [theme.colors.alpha.trueWhite[100]]
                  }
                },
                legend: {
                  show: false
                }
              }}
              series={paginatedCounts}
              type="donut"
            />
            <Box display="flex" justifyContent="center" mt={2}>
              <Button disabled={currentPage === 0} onClick={handlePrevPage}>
                Précédent
              </Button>
              <Button disabled={indexOfLastItem >= chartData.categories.length} onClick={handleNextPage}>
                Suivant
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 3
              }}
              variant="h4"
            >
              Nombre d'écoles enregistrées
            </Typography>
            <ButtonGroup>
              <Button
                onClick={() => handleTimeRangeChange('today')}
                variant={timeRange === 'today' ? 'contained' : 'outlined'}
              >
                Aujourd'hui
              </Button>
              <Button
                onClick={() => handleTimeRangeChange('month')}
                variant={timeRange === 'month' ? 'contained' : 'outlined'}
              >
                Ce mois
              </Button>
              <Button
                onClick={() => handleTimeRangeChange('year')}
                variant={timeRange === 'year' ? 'contained' : 'outlined'}
              >
                Cette année
              </Button>
            </ButtonGroup>
            <Chart
              height={400}
              options={schoolRegistrationChartOptions}
              series={schoolRegistrationSeries}
              type="bar"
            />
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 3
              }}
              variant="h4"
            >
              Nombre de catégories d'établissements
            </Typography>
            <Chart
              height={400}
              options={{
                chart: {
                  background: 'transparent',
                  toolbar: {
                    show: false
                  }
                },
                labels: paginatedCategories,
                plotOptions: {
                  pie: {
                    donut: {
                      size: '70%'
                    }
                  }
                },
                colors: ['#ff9900', '#1c81c2', '#333', '#5c6ac0', '#ddd'],
                dataLabels: {
                  enabled: true,
                  formatter: function (val) {
                    return typeof val === 'number' ? val.toFixed(2) + '%' : val + '%';
                  },
                  style: {
                    fontSize: '14px',
                    colors: [theme.colors.alpha.trueWhite[100]]
                  }
                },
                legend: {
                  show: false
                }
              }}
              series={paginatedCounts}
              type="pie"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box p={4}>
            <Typography
              sx={{
                pb: 2
              }}
              variant="h5"
            >
              Légende des catégories
            </Typography>
            <List>
              {paginatedCategories.map((category, index) => (
                <ListItem key={category}>
                  <ListItemText
                    primary={category}
                    secondary={`${paginatedCounts[index]} écoles`}
                    primaryTypographyProps={{ variant: 'subtitle1' }}
                    secondaryTypographyProps={{ variant: 'subtitle2' }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Card>
      <SnackbarNotification
      open={open}
      message={message}
      severity={severity}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
    />
</>  
  );
}

export default HomeSchoolDiagram;
