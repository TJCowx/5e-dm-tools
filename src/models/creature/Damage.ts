import DamageType from './DamageType';

type Damage = {
  id: number;
  defaultDamage: string;
  dice: string;
  typeId: number | null;
  type: DamageType;
};

export default Damage;
