import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Typography, styled } from '@mui/material';
import { open } from '@tauri-apps/api/shell';
import { useNavigate } from 'react-router-dom';

import { PageHeader } from '@components/Layout';
import useNewestRelease from '@hooks/useNewestRelease';
import useSetPagePadding from '@hooks/useSetPagePadding';

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
  useSetPagePadding(true);
  const navigate = useNavigate();
  const { loading, currVer, version, isUpdateAvailable, htmlUrl } =
    useNewestRelease();

  const openReleasePage = () => {
    if (htmlUrl) open(htmlUrl);
  };

  return (
    <>
      <PageHeader title="Settings" />
      <Button
        className="mb-16"
        variant="outlined"
        startIcon={<FontAwesomeIcon icon={faBook} />}
        onClick={() => navigate('/sources')}>
        Sources
      </Button>
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
    </>
  );
}

export default SettingsPage;
