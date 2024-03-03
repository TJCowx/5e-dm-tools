import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Divider, IconButton, List, Tooltip } from '@mui/material';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import { PageHeader } from '@components/Layout';
import {
  ListItemText,
  ListItemTwoSecondaryActions,
  SkeletonList,
} from '@components/List';
import { AddSourceModal } from '@components/Sources';
import useInvoke from '@hooks/useInvoke';
import useSetPagePadding from '@hooks/useSetPagePadding';
import SourceListItem from '@models/source/SourceListItem';

export default function SourcesPage() {
  useSetPagePadding(true);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // TODO: Get list of sources
  const { isLoading, data, error, invoke } =
    useInvoke<SourceListItem[]>('get_sources_list');

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
      {isLoading ? (
        <SkeletonList />
      ) : (
        <List dense>
          {data?.map(({ abbreviation, name, creatureCount }) => (
            <Fragment key={abbreviation}>
              <ListItemTwoSecondaryActions
                secondaryAction={
                  <>
                    <Link to={`edit/${abbreviation}`}>
                      <IconButton aria-label={`Edit ${name}`}>
                        <FontAwesomeIcon size="xs" icon={faPen} />
                      </IconButton>
                    </Link>
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
      <AddSourceModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </>
  );
}
