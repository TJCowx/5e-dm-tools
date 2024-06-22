import DamageType from './DamageType';

type Damage = {
  id: number;
  defaultDamage: number;
  dice: string;
  typeId: number | null;
  damageType: DamageType;
};

export default Damage;
