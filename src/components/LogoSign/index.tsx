import {
  Box,
  Tooltip,
  Badge,
  TooltipProps,
  tooltipClasses,
  styled,
  useTheme,
  Avatar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { selectRole } from 'src/store';
import { useSelector } from 'react-redux';
import { getHomePathByRole } from 'src/utils/helpers';
import { logo } from 'src/assets/imagePath';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        width: 53px;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      '0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)'
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100]
  }
}));

function Logo() {
  const theme = useTheme();
  const role = useSelector(selectRole);
  const path = "/dashboard/"+ getHomePathByRole(role);

  return (
    <TooltipWrapper
      title="OSIA Admin Dashboard"
      arrow
    >
      <LogoWrapper to={path}>
        <Badge
          sx={{
            '.MuiBadge-badge': {
              fontSize: theme.typography.pxToRem(11),
              right: -2,
              top: 8
            }
          }}
          overlap="circular"
          color="success"
          badgeContent="2.0"
        >
          <Avatar variant="rounded"  sx={{
            mr: 1,
            width: theme.spacing(25),
            height: theme.spacing(11)
          }} 
          alt="logo Osia" src={logo} />
        </Badge>
      </LogoWrapper>
    </TooltipWrapper>
  );
}

export default Logo;
