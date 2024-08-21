import DamageType from '@models/creature/DamageType';

type SpellDamage = {
  id: number;
  default_damage: number;
  dice: string;
  type_id: number;

  damageType?: DamageType;
};

export default SpellDamage;
