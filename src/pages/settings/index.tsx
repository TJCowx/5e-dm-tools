import { Button, Divider, Typography, styled } from '@mui/material';
import { open } from '@tauri-apps/api/shell';

import Layout from '@components/Layout/Layout';
import useNewestRelease from '@hooks/useNewestRelease';

const HeaderDivider = styled(Divider)(() => ({
  marginTop: '8px',
  marginBottom: '16px',
}));

const VersionContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  paddingLeft: '8px',
  '& .version': {
    display: 'flex',
  },
}));

function SettingsPage() {
  const { loading, currVer, version, isUpdateAvailable, htmlUrl } =
    useNewestRelease();

  const openReleasePage = () => {
    if (htmlUrl) open(htmlUrl);
  };

  return (
    <Layout>
      <Typography variant="h5">Settings</Typography>
      <HeaderDivider />
      <VersionContainer>
        <div className="version">
          <Typography variant="subtitle1">Version:&nbsp;</Typography>
          <Typography variant="overline">
            {loading ? 'Loading...' : currVer}
          </Typography>
        </div>
        {isUpdateAvailable && (
          <Button variant="outlined" onClick={openReleasePage}>
            Update avaialable (v{version})
          </Button>
        )}
      </VersionContainer>
    </Layout>
  );
}

export default SettingsPage;
