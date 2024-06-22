import {
  faFileDownload,
  faPen,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  Link as MuiLink,
  Tooltip,
} from '@mui/material';
import { Fragment, useState } from 'react';

import { deleteSource, exportSource } from '@api/sources';
import { PageHeader } from '@components/Layout';
import {
  ListItemText,
  ListItemTwoSecondaryActions,
  SkeletonList,
} from '@components/List';
import { SourceModal } from '@components/Sources';
import useInvoke from '@hooks/useInvoke';
import useSetPagePadding from '@hooks/useSetPagePadding';
import Source from '@models/source/Source';
import SourceListItem from '@models/source/SourceListItem';
import { logMessage } from '@utils/loggingUtils';

export default function SourcesPage() {
  useSetPagePadding(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [edittingSource, setEdittingSource] = useState<Source | null>();
  const [deleteSourceId, setDeleteSourceId] = useState<string | null>(null);

  const { isLoading, data, error, invoke } =
    useInvoke<SourceListItem[]>('get_sources_list');

  const handleSuccessfulUpdate = () => {
    setIsAddOpen(false);
    setEdittingSource(null);
    invoke();
  };

  const openDialog = (abbr: string) => {
    setDeleteSourceId(abbr);
  };

  const handleDelete = (abbr: string) => {
    deleteSource(abbr)
      .then(() => {
        setDeleteSourceId(null);
        invoke();
      })
      .catch((e) => {
        logMessage('error', e);
      });
  };

  const handleSourceExport = (abbr: string) => {
    exportSource(abbr)
      .then(() => {
        console.log('Exported');
      })
      .catch((e) => {
        logMessage('error', e);
      });
  };

  return (
    <>
      <PageHeader
        title="Sources"
        topMarginOnly
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
      {error && (
        <Alert severity="error" className="mb-16">
          There was an error loading sources. Please{' '}
          <MuiLink component="button" onClick={invoke}>
            try again.
          </MuiLink>
        </Alert>
      )}
      {isLoading ? (
        <SkeletonList />
      ) : (
        <List dense>
          {data?.map(({ abbreviation, name, creatureCount }) => (
            <Fragment key={abbreviation}>
              <ListItemTwoSecondaryActions
                secondaryAction={
                  <>
                    <Tooltip title={`Export ${name} source`}>
                      <IconButton
                        aria-label={`Export ${name} source`}
                        onClick={() => handleSourceExport(abbreviation)}
                      >
                        <FontAwesomeIcon icon={faFileDownload} />
                      </IconButton>
                    </Tooltip>
                    <IconButton
                      aria-label={`Edit ${name}`}
                      onClick={() => setEdittingSource({ abbreviation, name })}
                    >
                      <FontAwesomeIcon size="xs" icon={faPen} />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label={`Delete ${name}`}
                      color="warning"
                      onClick={() => openDialog(abbreviation)}
                    >
                      <FontAwesomeIcon size="xs" icon={faTrash} />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={`${name} (${abbreviation})`}
                  secondary={`Creatures: ${creatureCount}`}
                />
              </ListItemTwoSecondaryActions>
              <Divider component="li" />
            </Fragment>
          ))}
        </List>
      )}
      <SourceModal
        isOpen={isAddOpen}
        mode="create"
        onSuccess={handleSuccessfulUpdate}
        onClose={() => setIsAddOpen(false)}
      />
      <SourceModal
        isOpen={edittingSource != null}
        initialValue={edittingSource}
        mode="edit"
        onSuccess={handleSuccessfulUpdate}
        onClose={() => setEdittingSource(null)}
      />
      {deleteSourceId != null && (
        <Dialog open onClose={() => setDeleteSourceId(null)}>
          <DialogTitle>Confirm Delete Source</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This will <strong>permanently</strong> delete the source. It will
              not delete any associated creatures, the will just be changed to
              have no source. Do you want to continue?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteSourceId(null)}>Cancel</Button>
            <Button
              variant="contained"
              color="warning"
              disableElevation
              onClick={() => handleDelete(deleteSourceId)}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
