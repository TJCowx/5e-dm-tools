import DamageType from './DamageType';

type Damage = {
  id: number;
  defaultDamage: number;
  dice: string;
  typeId: number | null;
  type: DamageType;
};

export default Damage;
