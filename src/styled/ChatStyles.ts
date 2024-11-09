import { styled, Divider, Card, Box, ListItemIcon, AccordionSummary,  Drawer, IconButton, InputBase } from '@mui/material';
import { keyframes } from '@mui/system';

export const DividerWrapper = styled(Divider)(
  ({ theme }) => `
  .MuiDivider-wrapper {
    border-radius: ${theme.general.borderRadiusSm};
    text-transform: none;
    background: ${theme.palette.background.default};
    font-size: ${theme.typography.pxToRem(13)};
    color: ${theme.colors.alpha.black[50]};
  }
`
);

export const CardWrapperPrimary = styled(Card)(
  ({ theme }) => `
  background: ${theme.colors.primary.main};
  color: ${theme.palette.primary.contrastText};
  padding: ${theme.spacing(2)};
  border-radius: ${theme.general.borderRadiusXl};
  border-top-right-radius: ${theme.general.borderRadius};
  max-width: 380px;
  display: inline-flex;
`
);

export const CardWrapperSecondary = styled(Card)(
  ({ theme }) => `
  background: ${theme.colors.alpha.black[10]};
  color: ${theme.colors.alpha.black[100]};
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: ${theme.spacing(2)};
  border-radius: ${theme.general.borderRadiusXl};
  border-top-left-radius: ${theme.general.borderRadius};
  max-width: 380px;
`
);

export const FlexContainer = styled(Box)(
  ({ theme }) => `
  display: flex;
`
);

export const RootWrapper = styled(Box)(
  ({ theme }) => `
        @media (min-width: ${theme.breakpoints.values.md}px) {
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
`
);

export const ListItemIconWrapper = styled(ListItemIcon)(
  ({ theme }) => `
        min-width: 36px;
        color: ${theme.colors.primary.light};
`
);

export const AccordionSummaryWrapper = styled(AccordionSummary)(
  ({ theme }) => `
        &.Mui-expanded {
          min-height: 48px;
        }

        .MuiAccordionSummary-content.Mui-expanded {
          margin: 12px 0;
        }

        .MuiSvgIcon-root {
          transition: ${theme.transitions.create(['color'])};
        }

        &.MuiButtonBase-root {

          margin-bottom: ${theme.spacing(0.5)};

          &:last-child {
            margin-bottom: 0;
          }

          &.Mui-expanded,
          &:hover {
            background: ${theme.colors.alpha.black[10]};

            .MuiSvgIcon-root {
              color: ${theme.colors.primary.main};
            }
          }
        }
`
);
export const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

export const IndexRootWrapper = styled(Box)(
  ({ theme }) => `
       height: calc(100vh - ${theme.header.height});
       display: flex;
`
);

export const Sidebar = styled(Box)(
  ({ theme }) => `
        width: 300px;
        background: ${theme.colors.alpha.white[100]};
        border-right: ${theme.colors.alpha.black[10]} solid 1px;
`
);

export const ChatWindow = styled(Box)(
  () => `
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
`
);

export const ChatTopBar = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.white[100]};
        border-bottom: ${theme.colors.alpha.black[10]} solid 1px;
        padding: ${theme.spacing(2)};
        align-items: center;
`
);

export const IconButtonToggle = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(4)};
  height: ${theme.spacing(4)};
  background: ${theme.colors.alpha.white[100]};
`
);

export const DrawerWrapperMobile = styled(Drawer)(
  () => `
    width: 340px;
    flex-shrink: 0;

  & > .MuiPaper-root {
        width: 340px;
        z-index: 3;
  }
`
);

export const MessageInputWrapper = styled(InputBase)(
  ({ theme }) => `
  font-size: ${theme.typography.pxToRem(18)};
  padding: ${theme.spacing(1)};
    width: 100%;
    `
);

export const Input = styled('input')({
  display: 'none'
});