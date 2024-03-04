import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Alert,
  Divider,
  IconButton,
  List,
  Link as MuiLink,
  Tooltip,
} from '@mui/material';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

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

export default function SourcesPage() {
  useSetPagePadding(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [edittingSource, setEdittingSource] = useState<Source | null>();

  const { isLoading, data, error, invoke } =
    useInvoke<SourceListItem[]>('get_sources_list');

  const handleSuccessfulUpdate = () => {
    setIsAddOpen(false);
    setEdittingSource(null);
    invoke();
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
                      // onClick={() => openDialog(id)}>
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
    </>
  );
}
