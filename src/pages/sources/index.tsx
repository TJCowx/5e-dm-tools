import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';

import { PageHeader } from '@components/Layout';

export default function SourcesPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  // TODO: Get list of sources
  return (
    <>
      <PageHeader
        title="Sources"
        endSlotComponent={
          <Tooltip title="Add new source">
            <IconButton
              className="add-source-btn"
              aria-label="Add new source"
              onClick={() => setIsAddOpen(true)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </IconButton>
          </Tooltip>
        }
      />
      <div>This is where stuff goes</div>
      {isAddOpen && <div>TODO:</div>}
    </>
  );
}
