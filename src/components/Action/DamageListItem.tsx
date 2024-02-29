import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, ListItem } from '@mui/material';

import {
  BasicNumberField,
  BasicTextField,
  LazySelectField,
} from '@components/Fields/Basic';
import Damage from '@models/creature/Damage';

interface Props {
  damage: Partial<Damage>;
  removeDamageItem: () => void;
  updateDamageItem: (damage: Partial<Damage>) => void;
}

function DamageListItem({ damage, removeDamageItem, updateDamageItem }: Props) {
  return (
    <ListItem
      className="damage-list-item pl-0"
      secondaryAction={
        <IconButton onClick={removeDamageItem} color="warning">
          <FontAwesomeIcon icon={faTrash} />
        </IconButton>
      }>
      <BasicNumberField
        className="damage-field"
        label="Damage"
        value={damage.defaultDamage ?? ''}
        onChange={(newVal) =>
          updateDamageItem({
            ...damage,
            defaultDamage: +(newVal ?? 0),
          })
        }
      />
      <BasicTextField
        className="damage-dice-field"
        label="Damage Dice"
        value={damage.dice ?? ''}
        onChange={(newVal) => updateDamageItem({ ...damage, dice: newVal })}
      />
      <LazySelectField
        className="damage-type-field"
        label="Damage Type"
        queryArgs={{
          queryName: 'get_all_damage_types',
          textKey: 'name',
          valueKey: 'id',
        }}
        value={damage.typeId ? `${damage.typeId}` : null}
        onChange={(newVal) =>
          updateDamageItem({
            ...damage,
            typeId: newVal != null ? +newVal : null,
          })
        }
      />
    </ListItem>
  );
}

export default DamageListItem;
